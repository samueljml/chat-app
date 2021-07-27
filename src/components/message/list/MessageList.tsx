import { useContext, useEffect } from "react";
import { api } from "../../../api";
import {
	executePromise,
	getAllMessagesSessionStorage,
	isArraysDifferents,
	reloadInterval,
	showGenericError,
} from "../../../common/Utils";
import { MessageLoader } from "../../content-loader/MessageLoader";
import { MainPageContext } from "../../context/MainPageContext";
import { MessageContext } from "../../context/MessageContext";
import { Conversation } from "../../conversation/Conversation";
import { Message, MessageItem } from "../Message";

interface MessageListResponse {
	data: Array<Message>;
}

export const MessageList = () => {
	const { selectedConversation } = useContext(MainPageContext);
	const { messageContent, setMessageContent, isLoading, setIsLoading } =
		useContext(MessageContext);

	const showMessages = async (
		uri: string,
		conversation: Conversation | null
	) => {
		if (conversation) {
			setIsLoading(true);
			const [response, error] = await executePromise<MessageListResponse>(
				() => api.get(uri)
			);

			setIsLoading(false);
			
			if (response && isArraysDifferents(response.data, messageContent)) {
				return setMessageContent([
					...getAllMessagesSessionStorage(conversation.id),
					...response.data,
				]);
			}

			showGenericError("Message List", error as Error);
		}
	};

	const requestData = () => {
		setInterval(() => {
			showMessages("messages/", selectedConversation);
		}, reloadInterval);
	};

	useEffect(requestData, [selectedConversation?.id, JSON.stringify(messageContent)]);

	return (
		<div id="chat-message-list">
			{isLoading ? (
				<MessageLoader />
			) : (
				messageContent.map((msg) => (
					<MessageItem
						key={`${msg.sendTime}-${msg.id}`}
						message={msg}
					/>
				))
			)}
		</div>
	);
};
