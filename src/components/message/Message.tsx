import React from "react";
import { ConversationMessageProps } from "../../components/main/MainPage";
import dafaultImage from "../../images/profiles/default.png";
import { setMessageStatus } from "../../common/Utils";

enum MessageStatus {
	SENDING = "sending",
	SENT = "sent",
	FAILED = "failed",
}

const warnToMessage: String = "Not delivered";

export const Message = ({ message, userName }: ConversationMessageProps) => {
	const isMyMessage: boolean = userName === message.name;
	const showMessageTime: boolean = message.status !== MessageStatus.SENDING;

	return (
		<div
			id="message-block"
			onClick={() =>
				message.status === MessageStatus.FAILED &&
				setMessageStatus(message, MessageStatus.SENDING)
			}
			className={`message-row ${
				isMyMessage ? "my-message" : "your-message"
			}`}
		>
			<div className="message-content">
				{!isMyMessage && (
					<img
						src={!message.imageUrl ? dafaultImage : ""}
						alt={message.name}
					/>
				)}

				<div className={`message-text ${message.status}`}>
					{message.text}
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
