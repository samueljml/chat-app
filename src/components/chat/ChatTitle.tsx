import React from "react";
import {
	deleteDataFn,
	deleteRequestFn,
	getUserTitleFn,
	hasNoSelectedConversation,
} from "../main/MainPage";
import { TrashIcon } from "../../images/Icons/TrashIcon";

interface ChatTitleProps {
	title: getUserTitleFn;
	loggedUserId: string;
	selectedConversation: number;
	onDeleteContact: deleteDataFn;
	deleteRequest: deleteRequestFn;
}

export const ChatTitle = ({
	title,
	loggedUserId,
	selectedConversation,
	deleteRequest,
	onDeleteContact,
}: ChatTitleProps) => {
	let chatTitleContents = null;

	if (selectedConversation) {
		chatTitleContents = (
			<>
				<span>
					{hasNoSelectedConversation(selectedConversation)
						? "Chat aplication - Select a contact to chat with"
						: title()}
				</span>
				{!hasNoSelectedConversation(selectedConversation) && (
					<div
						onClick={() => {
							deleteRequest(
								`/users/${loggedUserId}/contacts/${selectedConversation}`,
								onDeleteContact
							);
						}}
						title="Delete Conversation"
					>
						<TrashIcon />
					</div>
				)}
			</>
		);
	}

	return <div id="chat-title">{chatTitleContents}</div>;
};
