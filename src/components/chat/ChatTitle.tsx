import React from "react";
import { TrashIcon } from "../../images/Icons/TrashIcon";

export const ChatTitle = ({ chatTitle, selectedConversation, deleteUserData }: any) => {
	let chatTitleContents = null;

	if (selectedConversation) {
		chatTitleContents = (
			<>
				<span>{(selectedConversation !== -1) ? chatTitle() : "Chat aplication - Select a contact to chat with"}</span>
				<div
					onClick={() => {
						deleteUserData(selectedConversation);
					}}
					title="Delete Conversation"
				>
					<TrashIcon />
				</div>
			</>
		);
	}

	return <div id="chat-title">{chatTitleContents}</div>;
};
