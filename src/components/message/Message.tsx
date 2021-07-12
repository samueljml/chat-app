import React from "react";
import { ConversationMessageProps } from "../../components/main/MainPage";
import dafaultImage from "../../images/profiles/default.png";

export const Message = ({message, userName}: ConversationMessageProps) => {
	const isMyMessage: boolean = userName === message.name;

	const imageThumbnail = isMyMessage ? null : (
		<img
			src={!message.imageUrl ? dafaultImage : ""}
			alt={message.name}
		/>
	);

	return (
		<div
		id="message-block"
		onClick={()=> console.log("ok")}
			className={`message-row ${
				isMyMessage ? "my-message" : "your-message"
			}`}
		>
			<div className="message-content">
				{imageThumbnail}
				<div className="message-text">{message.text}</div>
				<div className="message-time">{message.sendTime}</div>
			</div>
		</div>
	);
};
