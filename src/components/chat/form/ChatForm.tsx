import React, { useState } from "react";
import { AttachmentIcon } from "../../../images/Icons/AttachmentIcon";

const isMessageEmpty = (textMessage: any) => {
	return adjustTextMessage(textMessage).length === 0;
};

const adjustTextMessage = (textMessage: any) => {
	return textMessage.trim();
};

export const ChatForm = ({ selectedConversation, onMessageSubmitted }: any) => {
	const [textMessage, setTextMessage] = useState("");
	const disableButton: any = isMessageEmpty(textMessage);
	let formContents: any = null;
	let handleFormSubmit: any = null;

	if (selectedConversation) {
		formContents = (
			<>
				<AttachmentIcon />
				<input
					type="text"
					placeholder="type a message"
					value={textMessage}
					onChange={(e) => {
						setTextMessage(e.target.value);
					}}
				/>
				<button
					type="submit"
					className="primary-button"
					disabled={disableButton}
				>
					Send
				</button>
			</>
		);

		handleFormSubmit = (e: any) => {
			e.preventDefault();

			if (!isMessageEmpty(textMessage)) {
				onMessageSubmitted(textMessage);
				setTextMessage("");
			}
		};
	}

	return (
		<form id="chat-form" onSubmit={handleFormSubmit}>
			{formContents}
		</form>
	);
};
