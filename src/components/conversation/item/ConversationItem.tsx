import React from "react";
import { Conversation } from "../../../components/main/MainPage";
import dafaultImage from "../../../images/profiles/default.png";

export interface ConversationItemProps {
	key: number;
	conversation: Conversation;
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
				{conversation.latestMessageText ? (
					conversation.latestMessageText
				) : (
					<strong>No messages</strong>
				)}
			</div>
		</div>
	);
};
