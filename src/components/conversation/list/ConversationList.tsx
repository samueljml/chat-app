import React from "react";
import { ConversationItem } from "../item/ConversationItem";
import "./ConversationList.scss";


export const ConversationList = ({
	conversations,
	selectedConversation,
	conversationContent,
}: any) => {
	const conversationItems = conversations.map((conversation: any) => {
		const conversationIsActive =
			selectedConversation && conversation.id === selectedConversation.id;

		return (
			<ConversationItem
				key={conversation.id}
				setSelectedConversationId={conversation.id}
				isActive={conversationIsActive}
				conversation={conversation}
			/>
		);
		// onConversationItemSelected={ onConversationItemSelected }
	});

	return (
		<div id="conversation-list">
			{conversationContent.map((message:any) => (
				<div></div>
				// <Message
				// 	isMyMessage={message.isMyMessage}
				// 	// message={message.messageText}
				// />
			))}
			{conversationContent}
		</div>
	);
};
// }
// {conversationContent.map((message) => (
//     <Message
//         isMyMessage={message.isMyMessage}
//         message={message.messageText}
//     />
// ))}
