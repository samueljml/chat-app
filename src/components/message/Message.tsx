import { useContext } from "react";
import { api } from "../../api";
import {
	deleteMessageSessionStorage,
	executePromise,
	gererateId,
	showGenericError,
	updateMessageSessionStorage,
} from "../../common/Utils";
import { TrashIcon } from "../../images/Icons/TrashIcon";
import warnIcon from "../../images/Icons/warn.png";
import defaultImage from "../../images/profiles/default.png";
import { MainPageContext } from "../context/MainPageContext";
import { User } from "../main/MainPage";

export interface Message {
	id: number;
	name: string;
	imageUrl: string;
	sendTime: string;
	text: string;
	status: string;
}

export enum MessageStatus {
	SENDING = "sending",
	SENT = "sent",
	FAILED = "failed",
}

export interface MessageProps {
	message: Message;
}

export const createMessage = (text: string, { name, imageUrl }: User) => ({
	id: gererateId(),
	name,
	imageUrl,
	text,
	sendTime: `${new Date().getHours().toString()}:
	${new Date().getMinutes().toString()}`,
	status: "sending",
});

const warnToMessage: string = "Not delivered";

export const MessageItem = ({ message }: MessageProps) => {
	const { user, selectedConversation } = useContext(MainPageContext);
	const isMyMessage = user.name === message.name;
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
			id="message-block"
			onClick={handleClick}
			className={`message-row ${
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

				<div className={`message-text ${message.status}`}>
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

				{showMessageTime && (
					<div className="message-time">
						{message.status === MessageStatus.SENT
							? message.sendTime
							: warnToMessage}
					</div>
				)}
			</div>
		</div>
	);
};
