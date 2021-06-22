import React, { useState } from "react";
import "./App.css";
import { ChatTitle } from "./components/chat/ChatTitle";
import { ConversationList } from "./components/conversation/ConversationInput";
import ConversationSearch from "./components/conversation/ConversationSearch";
import { NewConversation } from "./components/conversation/new-conversation/NewConversation";
import { ChatForm } from "./components/chat/form/ChatForm";
import { Message } from "./components/message/Message";
import { getAllConversations, getUserById } from "./common/Utils"

export interface MessageProps {
	imageUrl: string;
	imageAlt: string;
	messageText: string;
	createdAt: string;
	isMyMessage: boolean;
}

export interface ConversationProps {
	id: number;
	imageUrl: string;
	imageAlt: string;
	title: string;
	createdAt: string;
	latestMessageText: string;
	messages: MessageProps[];
}

const varConversations: ConversationProps[] = getAllConversations();
const varMessages: MessageProps[] = [];
const noSelectedConversation = -1;

export const App = () => {
	const [conversations, setConversations] = useState(varConversations);
	const [messageContent, setMessageContent] = useState(varMessages);
	const [selectedConversationId, setSelectedConversationId] = useState(
		noSelectedConversation
	);

	const updateSelectedConversation = (id: number) => {
		setSelectedConversationId(id);
		setMessageContent(getUserById(id).messages);
		console.log(messageContent);
	};

	const deleteUserData = (userId: number) => {
		setConversations(
			conversations.filter((conversation) => conversation.id != userId)
		);
		setSelectedConversationId(noSelectedConversation);
		setMessageContent(varMessages);
	};

	const getUserTitle = () =>
		conversations.filter(
			(conversation) => conversation.id === selectedConversationId
		)[0].title;

	const onMessageSubmitted = (message: MessageProps) => {
		// setMessageContent([message, ...messageContent]);
	};

	return (
		<div id="chat-container">
			<ConversationSearch conversations={conversations} />
			<ConversationList
				setSelectedConversationId={updateSelectedConversation}
				selectedConversationId={selectedConversationId}
				conversations={conversations}
			/>
			<NewConversation />
			<ChatTitle
				chatTitle={getUserTitle}
				selectedConversation={selectedConversationId}
				deleteUserData={deleteUserData}
			/>

			<div id="chat-message-list">
				{messageContent.map((message) => (
					<Message message={message} />
				))}
			</div>

			<ChatForm
				selectedConversation={selectedConversationId}
				onMessageSubmitted={onMessageSubmitted}
			/>
		</div>
	);
};

export default App;
