import React from "react";
import { Conversation, updateSelectedConversationFn } from "../../../components/main/MainPage";
import dafaultImage from "../../../images/profiles/default.png";

export interface ConversationItemProps {
	key: number;
	conversation: Conversation;
	isActive: boolean;
	setSelectedConversationId: updateSelectedConversationFn;
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
			<div className="created-date">{conversation.latestMessageText.sendTime}</div>
			<div className="conversation-message">
				{conversation.latestMessageText ? (
					conversation.latestMessageText.text
				) : (
					<strong>No messages</strong>
				)}
			</div>
		</div>
	);
};
