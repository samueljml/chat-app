import { useContext, useEffect } from "react";
import { api } from "server/api";
import {
	executePromise,
	getAllMessagesSessionStorage,
	isArraysDifferents,
	showGenericError,
} from "common/Utils";
import { MainPageContext } from "contexts/MainPageContext";
import { MessageContext } from "contexts/MessageContext";
import { MessageLoader } from "components/loader/MessageLoader";
import { Message, MessageItem } from "components/message/Message";

interface MessageListResponse {
	data: Array<Message>;
}

export const MessageList = () => {
	const { selectedConversation, user } = useContext(MainPageContext);
	const { messageContent, setMessageContent, isLoading, setIsLoading } =
		useContext(MessageContext);

	useEffect(() => {
		const showMessages = async () => {
			const uri = `/user/${user.id}/contacts/${selectedConversation?.id}/messages`;
			if (selectedConversation) {
				const [response, error] =
					await executePromise<MessageListResponse>(() =>
						api.get(uri)
					);

				setIsLoading(false);

				if (
					response &&
					isArraysDifferents(response.data, messageContent)
				) {
					return setMessageContent([
						...getAllMessagesSessionStorage(selectedConversation.id)
							.slice()
							.reverse(),
						...response.data,
					]);
				}

				showGenericError("Message List", error as Error);
			}
		};

		if (selectedConversation) {
			showMessages();
			return setIsLoading(true);
		}
		setIsLoading(false);
	}, [
		selectedConversation,
		setMessageContent,
		setIsLoading,
		messageContent,
		user.id,
	]);

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
