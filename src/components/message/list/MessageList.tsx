import { useContext, useEffect } from "react";
import { api } from "../../../api";
import {
	executePromise,
	getAllMessagesSessionStorage,
	isArraysDifferents,
	reloadInterval,
	showGenericError
} from "../../../common/Utils";
import { MessageLoader } from "../../content-loader/MessageLoader";
import { MainPageContext } from "../../context/MainPageContext";
import { MessageContext } from "../../context/MessageContext";
import { Message, MessageItem } from "../Message";

interface MessageListResponse {
	data: Array<Message>;
}

export const MessageList = () => {
	const { selectedConversation, user } = useContext(MainPageContext);
	const { messageContent, setMessageContent, isLoading, setIsLoading } =
		useContext(MessageContext);

	const showMessages = async (uri: string) => {
		if (selectedConversation) {
			const [response, error] = await executePromise<MessageListResponse>(
				() => api.get(uri)
			);

			setIsLoading(false);

			if (response && isArraysDifferents(response.data, messageContent)) {
				
				return setMessageContent([
					...getAllMessagesSessionStorage(selectedConversation.id).slice().reverse(),
					...response.data,
				]);
			}

			showGenericError("Message List", error as Error);
		}
	};

	const requestData = () => {
		setInterval(() => {
			showMessages(
				`/user/${user.id}/contacts/${selectedConversation?.id}/messages`
			);
		}, reloadInterval);
	};

	useEffect(() => {
		setMessageContent([]);
		if (selectedConversation) {
			requestData();
			return setIsLoading(true);
		}
		setIsLoading(false);
	}, [selectedConversation]);

	return (
		<div className="chat-message-list">
			{isLoading ? (
				<MessageLoader />
			) : (
				messageContent.map((msg, index) => (
					<MessageItem
						key={msg ? `${msg.sendTime}-${msg.id}` : index}
						message={msg}
					/>
				))
			)}
		</div>
	);
};
