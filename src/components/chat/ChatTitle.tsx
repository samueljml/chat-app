import React from "react";
import { hasNoSelectedConversation } from "../../App";
import { TrashIcon } from "../../images/Icons/TrashIcon";

export const ChatTitle = ({ chatTitle, selectedConversation, deleteUserData }: any) => {
	let chatTitleContents = null;

	if (selectedConversation) {
		chatTitleContents = (
			<>
				<span>{hasNoSelectedConversation(selectedConversation) ? "Chat aplication - Select a contact to chat with" : chatTitle()}</span>
				{!hasNoSelectedConversation(selectedConversation) && <TrashIcon />}
				<div
					onClick={() => {
						deleteUserData(selectedConversation);
					}}
					title="Delete Conversation"
				>
				</div>
			</>
		);
	}

	return <div id="chat-title">{chatTitleContents}</div>;
};
