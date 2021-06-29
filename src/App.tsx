import React, { useState, useEffect } from "react";
import api from "./api";
import "./App.css";
import { isArraysDifferents, executePromise } from "./common/Utils";
import { ChatTitle } from "./components/chat/ChatTitle";
import { ChatForm } from "./components/chat/form/ChatForm";
import { ConversationList } from "./components/conversation/ConversationInput";
import ConversationSearch from "./components/conversation/ConversationSearch";
import { NewConversation } from "./components/conversation/new-conversation/NewConversation";
import { Message } from "./components/message/Message";
import { Friends } from "./components/friends/Friends";

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

const varConversations: ConversationProps[] = [];
const varMessages: MessageProps[] = [];
const noSelectedConversation = -1;
const reloadInterval = 1000;

export const hasNoSelectedConversation = (selectedConversationId: number) => selectedConversationId === noSelectedConversation;

const uri = {
	conversations: "conversations",
	messages: "messages",
};

let tempId = noSelectedConversation;

export const App = () => {
	const [conversations, setConversations] = useState(varConversations);
	const [messageContent, setMessageContent] = useState(varMessages);
	const [selectedConversationId, setSelectedConversationId] = useState(
		noSelectedConversation
	);
	const resources = [conversations, messageContent];

	const get = async (data: any, setUpdate: any, uri: string) => {
		const [response, errors] = await executePromise(() => api.get(uri));

		// TEMPORÁRIO
		if (uri.match("messages")) {
			if (response && isArraysDifferents(response.data.all, data)) {
				if (response.data) {
					setUpdate(response.data.all);
				}
			}
		} else {
			if (response && isArraysDifferents(response.data, data)) {
				if (data) {
					setUpdate(response.data);
				}
			}
		}

		if (errors) {
			console.log(uri + " not found");
		}
	};

	useEffect(() => {
		setInterval(() => {
			get(conversations, setConversations, uri.conversations);
			if (tempId !== noSelectedConversation) {
				get(
					messageContent,
					setMessageContent,
					`/${uri.messages}/${tempId}`
				);
			}
		}, reloadInterval);
	}, conversations);

	const updateSelectedConversation = (id: number) => {
		tempId = id;
		setSelectedConversationId(id);
		setMessageContent(varMessages);
	};

	const deleteUserData = (userId: number) => {
		tempId = noSelectedConversation;
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
			<div id="new-message-container">
				<NewConversation />
				<Friends />
			</div>

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
