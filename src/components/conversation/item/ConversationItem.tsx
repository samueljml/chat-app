import React from "react";
import { MessageProps, ConversationProps } from "../../../App";
import dafaultImage from "../../../images/profiles/default.png";

export interface ConversationItemProps {
	key: number;
	conversation: ConversationProps;
	isActive: boolean;
	setSelectedConversationId: React.Dispatch<React.SetStateAction<number>>;
}

export const ConversationItem = ({
	conversation,
	isActive,
	setSelectedConversationId,
}: ConversationItemProps) => {
	return (
		<div
			className={`conversation ${isActive ? "active" : ""}`}
			onClick={() => setSelectedConversationId(conversation.id)}
		>
			<img
				src={!conversation.imageUrl ? dafaultImage : ""}
				alt={conversation.imageAlt}
			/>
			<div className="title-text">{conversation.title}</div>
			<div className="created-date">{conversation.createdAt}</div>
			<div className="conversation-message">
				{(conversation.latestMessageText) ? conversation.latestMessageText : (<b>No messages</b>)}
			</div>
		</div>
	);
};
