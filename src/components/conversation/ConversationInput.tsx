import React from "react";
import { ConversationItem } from "./item/ConversationItem";

export const ConversationList = ({
	conversations,
	selectedConversationId,
	setSelectedConversationId,
}: any) => {
	const conversationItems = conversations.map((conversation: any) => {
		const conversationIsActive =
			selectedConversationId &&
			conversation.id === selectedConversationId;

		return (
			<ConversationItem
				key={conversation.id}
				setSelectedConversationId={setSelectedConversationId}
				isActive={conversationIsActive}
				conversation={conversation}
			/>
		);
	});

	return <div id="conversation-list">{conversationItems}</div>;
};
