import { useContext } from "react";
import { gererateId, updateMessageSessionStorage } from "../../common/Utils";
import warnIcon from "../../images/Icons/warn.png";
import defaultImage from "../../images/profiles/default.png";
import { TrashIcon } from "../../images/Icons/TrashIcon";
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

					<TrashIcon />
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
