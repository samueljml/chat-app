import React from "react";
import { hasNoSelectedConversation } from "../main/MainPage";
import { TrashIcon } from "../../images/Icons/TrashIcon";

export const ChatTitle = ({ title, selectedConversation, deleteUserData }: any) => {
	let chatTitleContents = null;

	if (selectedConversation) {
		chatTitleContents = (
			<>
				<span>{hasNoSelectedConversation(selectedConversation) ? "Chat aplication - Select a contact to chat with" : title()}</span>
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
