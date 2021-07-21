import { useContext, useState } from "react";
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
	const isMyMessage: boolean = user.name === message.name;
	const showMessageTime: boolean = message.status !== MessageStatus.SENDING;
	const [isOptionsEnable, setIsOptionsEnable] = useState(false);

	const handleClick = () => {
		if (selectedConversation) {
			if (message.status === MessageStatus.FAILED) {
				message.status = MessageStatus.SENDING;
			}
			updateMessageSessionStorage(message, selectedConversation.id);
		}
	};

	const handleOnFocus = () => {
		setIsOptionsEnable(true);
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

				<div
					className={`message-text ${message.status}`}
					onFocus={handleOnFocus}
				>
					{message.text}
					{message.status === MessageStatus.FAILED && (
						<img
							className="warning-icon"
							src={warnIcon}
							alt="warning icon"
						/>
					)}
					<TrashIcon isVisible={isOptionsEnable}/>
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
