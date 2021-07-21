import { ChangeEvent, useContext, useEffect, useState } from "react";
import { api } from "../../../api";
import {
	executePromise,
	reloadInterval,
	saveMessageSessionStorage,
	showGenericError,
	updateMessageSessionStorage,
} from "../../../common/Utils";
import { MainPageContext } from "../../context/MainPageContext";
import { MessageContext } from "../../context/MessageContext";
import { createMessage, Message, MessageStatus } from "../../message/Message";

export const ChatForm = () => {
	const [inputValue, setInputValue] = useState("");
	const { messageContent, setMessageContent } = useContext(MessageContext);
	const { selectedConversation, user } = useContext(MainPageContext);

	const updateMessageStatus = (message: Message, status: string) => {
		const updatedMessage = messageContent
			.filter((messageItem) => messageItem === message)
			.map((messageItem) => ({
				...messageItem,
				status,
			}))[0];

		if (selectedConversation && updatedMessage) {
			updateMessageSessionStorage(
				updatedMessage,
				selectedConversation.id
			);
		}
	};

	const onPostMessage = async (message: Message) => {
		const messageUri = `/users/${user.id}/messages/${selectedConversation?.id}`;
		const [response, error] = await executePromise(() =>
			api.post(messageUri, message)
		);

		if (response) {
			return updateMessageStatus(message, "sent");
		}

		updateMessageStatus(message, "failed");
		return showGenericError("Message", error as Error);
	};

	const postUnsentMessages = () => {
		setInterval(async () => {
			const messages = messageContent.filter(
				({ status }) => status === MessageStatus.SENDING
			);

			for (const message of messages) {
				await onPostMessage(message);
			}
		}, reloadInterval);
	};

	const onMessageSubmitted = (text: string, id: number) => {
		const message = createMessage(text, user);
		saveMessageSessionStorage(message, id);
		setMessageContent([message, ...messageContent]);
		onPostMessage(message);
	};

	const handleButtonClick = () => {
		if (selectedConversation) {
			onMessageSubmitted(inputValue, selectedConversation.id);
			setInputValue("");
		}
	};

	const handleInputClick = (event: ChangeEvent<HTMLInputElement>) => {
		setInputValue(event.target.value);
	};

	const handleButtonDisabled = inputValue.trim().length === 0;

	useEffect(postUnsentMessages, [messageContent]);

	return (
		<form className="chat-form">
			{selectedConversation && (
				<>
					<input
						type="text"
						placeholder="type a message"
						value={inputValue}
						onChange={handleInputClick}
					/>
					<button
						type="submit"
						className="primary-button"
						disabled={handleButtonDisabled}
						onClick={handleButtonClick}
					>Send</button>
				</>
			)}
		</form>
	);
};
