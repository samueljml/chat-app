import { ChangeEvent, useContext, useEffect, useState } from "react";
import { api } from "../../../api";
import {
	deleteMessageSessionStorage,
	executePromise, getAllMessagesSessionStorage, saveMessageSessionStorage,
	showGenericError,
	updateMessageSessionStorage
} from "../../../common/Utils";
import { MainPageContext } from "../../context/MainPageContext";
import { MessageContext } from "../../context/MessageContext";
import { createMessage, Message, MessageStatus } from "../../message/Message";

export const ChatForm = () => {
	const [inputValue, setInputValue] = useState("");
	const { messageContent, setMessageContent } = useContext(MessageContext);
	const { selectedConversation, user } = useContext(MainPageContext);

	const updateMessageStatus = (message: Message, status: string) => {
		let updatedMessage;
		if (selectedConversation) {
			updatedMessage = getAllMessagesSessionStorage(
				selectedConversation.id
			)
				.filter((messageItem) => messageItem.id === message.id)
				.map((messageItem) => ({
					...messageItem,
					status,
				}))[0];
		}

		if (selectedConversation && updatedMessage) {
			updateMessageSessionStorage(
				updatedMessage,
				selectedConversation.id
			);
		}
	};

	const onPostMessage = async (message: Message) => {
		const messageUri = `/user/${user.id}/contacts/${selectedConversation?.id}/messages`;
		const [response, error] = await executePromise(() =>
			api.post(messageUri, message)
		);

		if (response) {
			return deleteMessageSessionStorage(message, selectedConversation.id);
		}

		updateMessageStatus(message, "failed");
		return showGenericError("Message", error as Error);
	};

	const postUnsentMessages = () => {
		const messages = messageContent.filter(
			({ status }) => status === MessageStatus.SENDING
		);

		for (const message of messages) {
			onPostMessage(message);
		}
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

	useEffect(postUnsentMessages, []);

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
					>
						Send
					</button>
				</>
			)}
		</form>
	);
};
