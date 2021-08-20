import { useContext } from "react";
import { api } from "server/api";
import {
	deleteMessageSessionStorage,
	executePromise,
	gererateId,
	showGenericError,
	updateMessageSessionStorage,
} from "common/Utils";
import { TrashIcon } from "assets/TrashIcon";
import warnIcon from "assets/warn.png";
import defaultImage from "assets/default.png";
import { MainPageContext } from "contexts/MainPageContext";
import { User } from "pages/main/MainPage";
import { messageItem } from "common/strings.json";

export interface Message {
	id: number;
	name: string;
	imageUrl: string;
	sendTime: string;
	text: string;
	status: string;
	sentByUserId?: number;
}

export enum MessageStatus {
	SENDING = "sending",
	SENT = "sent",
	FAILED = "failed",
}

export interface MessageProps {
	message: Message;
}

export const createMessage = (text: string, { name, imageUrl, id }: User) => ({
	id: gererateId(),
	name,
	imageUrl,
	text,
	sendTime: `${new Date().getHours().toString()}:
	${new Date().getMinutes().toString()}`,
	status: "sending",
	sentByUserId: id,
});

export const MessageItem = ({ message }: MessageProps) => {
	const { user, selectedConversation } = useContext(MainPageContext);
	const isMyMessage = message.sentByUserId === user.id;
	const showMessageTime = message.status !== MessageStatus.SENDING;
	const hasMessageFailed = message.status === MessageStatus.FAILED;

	const isMessageInDataBase = (status: string) =>
		status === MessageStatus.SENT;

	const handleClick = () => {
		if (selectedConversation) {
			updateMessageSessionStorage(
				{
					...message,
					status: hasMessageFailed
						? MessageStatus.SENDING
						: message.status,
				},
				selectedConversation.id
			);
		}
	};

	const deleteMessage = async () => {
		const uri = `users/${user.id}/contacts/${selectedConversation?.id}/messages/${message.id}`;
		const [, error] = await executePromise(() => api.delete(uri));

		if (error) {
			showGenericError("Delete Message", error);
		}
	};

	const handleClickTrash = () => {
		if (isMessageInDataBase(message.status) && isMyMessage) {
			return deleteMessage();
		}

		if (selectedConversation) {
			deleteMessageSessionStorage(message, selectedConversation.id);
		}
	};

	return (
		<div
			onClick={handleClick}
			className={`"message-block" message-row ${
				isMyMessage ? "my-message" : "your-message"
			}`}
		>
			<div className="message-content">
				{!isMyMessage && (
					<img
						src={message.imageUrl || defaultImage}
						alt={message.name}
					/>
				)}

				<div
					className={`message-text ${
						message.status || MessageStatus.SENT
					}`}
				>
					{message.text}
					{message.status === MessageStatus.FAILED && (
						<img
							className="warning-icon"
							src={warnIcon}
							alt="warning icon"
						/>
					)}

					<div onClick={handleClickTrash}>
						<TrashIcon />
					</div>
				</div>

				{message.status ? (
					showMessageTime && (
						<div className="message-time">
							{message.status === MessageStatus.SENT
								? message.sendTime
								: messageItem.warning}
						</div>
					)
				) : (
					<div className="message-time">{message.sendTime}</div>
				)}
			</div>
		</div>
	);
};
