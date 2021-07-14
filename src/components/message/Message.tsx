import React from "react";
import { ConversationMessageProps } from "../../components/main/MainPage";
import defaultImage from "../../images/profiles/default.png";
import warnIcon from "../../images/Icons/warn.png";

enum MessageStatus {
	SENDING = "sending",
	SENT = "sent",
	FAILED = "failed",
}

const warnToMessage: string = "Not delivered";

export const Message = ({ message, userName }: ConversationMessageProps) => {
	const isMyMessage: boolean = userName === message.name;
	const showMessageTime: boolean = message.status !== MessageStatus.SENDING;

	return (
		<div
			id="message-block"
			onClick={() => {
				if (message.status === MessageStatus.FAILED) {
					message.status = MessageStatus.SENDING;
				}
			}}
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
					{message.status === "failed" && (
						<img className="warning-icon" src={warnIcon} />
					)}
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
