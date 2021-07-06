import React, { useState, useEffect } from "react";
import { api } from "../../api";
import "../../App.css";
import { ChatForm } from "../chat/form/ChatForm";
import { Message } from "../message/Message";
import { ConversationList } from "../conversation/ConversationInput";
import { NewConversation } from "../conversation/new-conversation/NewConversation";
import { isArraysDifferents, executePromise } from "../../common/Utils";
import { ChatTitle as ChatTitle } from "../chat/ChatTitle";
import { ConversationSearch } from "../conversation/ConversationSearch";
import { useParams } from "react-router-dom";

export interface ConversationMessageProps {
	imageUrl: string;
	imageAlt: string;
	messageText: string;
	createdAt: string;
	isMyMessage: boolean;
}

export interface Message {
	name: string;
	imageUrl: string;
	sendTime: string;
	text: string;
}

interface ApiProps {
	data: Conversation[] | Message[];
	updateData:
		| React.Dispatch<React.SetStateAction<Conversation[]>>
		| React.Dispatch<React.SetStateAction<Message[]>>;
	uri: string;
}

export interface Conversation {
	id: number;
	imageUrl: string;
	imageAlt: string;
	title: string;
	createdAt: string;
	latestMessageText: Message;
}

export interface User {
	loggedUserId: string;
}

const varConversations: Conversation[] = [];
const varMessages: Message[] = [];
const noSelectedConversation = -1;
const reloadInterval = 1000;

export const hasNoSelectedConversation = (selectedConversationId: number) =>
	selectedConversationId === noSelectedConversation;

const uri = {
	users: "users",
	messages: "messages",
	contacts: "contacts",
};

let tempId = noSelectedConversation;

export type updateSelectedConversationFn = (id: number) => void;

export const MainPage = () => {
	const [conversations, setConversations] = useState(varConversations);
	const [messageContent, setMessageContent] = useState(varMessages);
	const [selectedConversationId, setSelectedConversationId] = useState(
		noSelectedConversation
	);
	const [seachInputValue, setSearchInputValue] = useState("");
	const { loggedUserId }: User = useParams();

	const getRequest = async ({ data, updateData, uri }: ApiProps) => {
		const [response, errors] = await executePromise(() => api.get(uri));

		if (response && isArraysDifferents(response.data, data)) {
			updateData(response.data);
		}

		if (errors) {
			console.log(uri + " not found");
		}
	};

	useEffect(() => {
		setInterval(() => {
			getRequest({
				data: conversations,
				updateData: setConversations,
				uri: `${uri.users}/${loggedUserId}/${uri.contacts}`,
			});
			if (tempId !== noSelectedConversation) {
				getRequest({
					data: messageContent,
					updateData: setMessageContent,
					uri: `${uri.users}/${loggedUserId}/${uri.messages}/${selectedConversationId}`,
				});
			}
		}, reloadInterval);
	}, [conversations]);

	const updateSelectedConversation = (id: number) => {
		tempId = id;
		setSelectedConversationId(id);
		setMessageContent(varMessages);
	};

	const onDeleteUser = (userId: number) => {
		tempId = noSelectedConversation;
		setConversations(
			conversations.filter((conversation) => conversation.id != userId)
		);
		setSelectedConversationId(noSelectedConversation);
		setMessageContent(varMessages);
	};

	const getUserTitle = () =>
		conversations?.filter(
			(conversation) => conversation.id === selectedConversationId
		)[0].title;

	const onMessageSubmitted = (message: ConversationMessageProps) => {};

	return (
		<div id="chat-container">
			<ConversationSearch
				conversations={conversations}
				inputValue={seachInputValue}
				setSearchInputValue={setSearchInputValue}
			/>
			<ConversationList
				setSelectedConversationId={updateSelectedConversation}
				selectedConversationId={selectedConversationId}
				conversations={conversations}
				searchInputValue={seachInputValue}
			/>
			<div id="new-message-container">
				<NewConversation />
			</div>

			<ChatTitle
				title={getUserTitle}
				selectedConversation={selectedConversationId}
				deleteUserData={onDeleteUser}
			/>

			<div id="chat-message-list">
				{messageContent.map((msg) => (
					<Message {...msg} />
				))}
			</div>

			<ChatForm
				selectedConversation={selectedConversationId}
				onMessageSubmitted={onMessageSubmitted}
			/>
		</div>
	);
};
