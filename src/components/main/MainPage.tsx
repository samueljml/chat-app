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

const noSelectedConversation = -1;
const reloadInterval = 1000;

export const hasNoSelectedConversation = (selectedConversationId: number) =>
	selectedConversationId === noSelectedConversation;

const uri = {
	users: "users",
	messages: "messages",
	contacts: "contacts",
};

export type updateSelectedConversationFn = (id: number) => void;

export const MainPage = () => {
	const [conversations, setConversations] = useState<Conversation[]>([]);
	const [messageContent, setMessageContent] = useState<Message[]>([]);
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

	const onDeleteContact = async () => {
		const uri = `/users/${loggedUserId}/contacts/${selectedConversationId}`;
		const [response, errors] = await executePromise(() => api.delete(uri));

		if (response) {
			setConversations(getNotSelectedConversations);
			setSelectedConversationId(noSelectedConversation);
			setMessageContent([]);
		}

		if (errors) {
			console.log(uri + " not found");
		}
	};

	const updateSelectedConversation = (id: number) => {
		setSelectedConversationId(id);
		setMessageContent([]);
	};

	const getNotSelectedConversations = () =>
		conversations.filter(
			(conversation) => conversation !== getSelectedConversation()
		);

	const getSelectedConversation = () =>
		conversations.filter(({ id }) => id === selectedConversationId)[0];

	const onMessageSubmitted = (message: ConversationMessageProps) => {};

	const requestData = () => {
		getRequest({
			data: conversations,
			updateData: setConversations,
			uri: `${uri.users}/${loggedUserId}/${uri.contacts}`,
		});
		if (selectedConversationId !== noSelectedConversation) {
			getRequest({
				data: messageContent,
				updateData: setMessageContent,
				uri: `${uri.messages}`,
			});
		}
	};

	useEffect(() => {
		setInterval(requestData, reloadInterval);
	}, [conversations]);

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
				conversation={getSelectedConversation()}
				onDelete={onDeleteContact}
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
