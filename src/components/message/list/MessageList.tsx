import { useContext, useEffect } from "react";
import { api } from "../../../api";
import {
	executePromise,
	getAllMessageSessionStorage,
	isArraysDifferents,
	reloadInterval,
	showGenericError,
} from "../../../common/Utils";
import { MainPageContext } from "../../context/MainPageContext";
import { MessageContext } from "../../context/MessageContext";
import { Conversation } from "../../conversation/Conversation";
import { Message, MessageItem } from "../Message";

interface MessageListResponse {
	data: Array<Message>;
}

export const MessageList = () => {
	const { selectedConversation } = useContext(MainPageContext);
	const { messageContent, setMessageContent, setIsLoading } =
		useContext(MessageContext);

	const showMessages = async (
		uri: string,
		conversation: Conversation | null
	) => {
		if (conversation) {
			const [response, error] = await executePromise<MessageListResponse>(
				() => api.get(uri)
			);

			setIsLoading(false);

			if (response && isArraysDifferents(response.data, messageContent)) {
				return setMessageContent([
					...getAllMessageSessionStorage(conversation.id),
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

	useEffect(requestData, [selectedConversation, messageContent]);

	return (
		<div id="chat-message-list">
			{messageContent.map((msg) => (
				<MessageItem key={`${msg.sendTime}-${msg.id}`} message={msg} />
			))}
		</div>
	);
};