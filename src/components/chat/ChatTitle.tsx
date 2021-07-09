import React from "react";
import { Conversation, hasNoSelectedConversation } from "../main/MainPage";
import { TrashIcon } from "../../images/Icons/TrashIcon";

type onDeleteFn = () => void;

interface ChatTitleProps {
	conversation: Conversation;
	onDelete: onDeleteFn;
}

export const ChatTitle = ({ conversation, onDelete }: ChatTitleProps) => {
	const defaultTitle = "Chat aplication - Select a contact to chat with";

	return (
		<div id="chat-title">
			{conversation && (
				<>
					<span>
						{conversation ? conversation.title : defaultTitle}
					</span>
					{conversation && (
						<div onClick={onDelete} title="Delete Conversation">
							<TrashIcon />
						</div>
					)}
				</>
			)}
		</div>
	);
};
