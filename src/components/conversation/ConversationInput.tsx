import React from "react";
import { ConversationItem } from "./item/ConversationItem";
import { Conversation, updateSelectedConversationFn } from "../main/MainPage";
import { containsSubstring } from "../../common/Utils";

interface ConversationListProps {
	conversations: Conversation[];
	selectedConversationId: number;
	setSelectedConversationId: updateSelectedConversationFn;
	searchInputValue: string;
}

export const ConversationList = ({
	conversations,
	selectedConversationId,
	setSelectedConversationId,
	searchInputValue,
}: ConversationListProps) => {
	const conversationItems = conversations
		.filter(({ title }: Conversation) =>
			containsSubstring(title, searchInputValue)
		)
		.map((conversation: Conversation) => {
			const conversationIsActive =
				selectedConversationId &&
				conversation.id !== selectedConversationId;

			return (
				<ConversationItem
					key={conversation.id}
					setSelectedConversationId={setSelectedConversationId}
					isActive={!!!conversationIsActive}
					conversation={conversation}
				/>
			);
		});

	return <div id="conversation-list">{conversationItems}</div>;
};
