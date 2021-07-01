import React from "react";
import { MessageProps } from "../../components/main/MainPage";
import dafaultImage from "../../images/profiles/default.png";

export const Message = ({ message }:any) => {

	const imageThumbnail = message.isMyMessage ? null : (
		<img
			src={!message.imageUrl ? dafaultImage : ""}
			alt={message.imageAlt}
		/>
	);

	return (
		<div
		id="message-block"
		onClick={()=> console.log("ok")}
			className={`message-row ${
				message.isMyMessage ? "you-message" : "other-message"
			}`}
		>
			<div className="message-content">
				{imageThumbnail}
				<div className="message-text">{message.messageText}</div>
				<div className="message-time">{message.createdAt}</div>
			</div>
		</div>
	);
};
