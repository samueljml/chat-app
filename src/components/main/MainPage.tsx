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
	message: Message;
	userName: string;
}

export interface Message {
	id: number;
	name: string;
	imageUrl: string;
	sendTime: string;
	text: string;
	status: string;
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
	name: string;
	userName: string;
	email: string;
	imageUrl: string;
}

let userDataForTests: User = {
	loggedUserId: "1",
	name: "Samuel",
	imageUrl: "",
	userName: "samueljml",
	email: "",
};

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
	userDataForTests.loggedUserId = useParams();
	const [isConversationLoading, setIsConversationLoading] = useState(true);

	const showData = async ({ data, updateData, uri }: ApiProps) => {
		const [response, errors] = await executePromise(() => api.get(uri));

		if (response && isArraysDifferents(response.data, data)) {
			updateData(response.data);
			setIsConversationLoading(false);
		}

		if (errors) {
			console.log(uri + " not found");
		}
	};

	const onDeleteConversation = async () => {
		const uri = `/users/${userDataForTests.loggedUserId}/contacts/${selectedConversationId}`;
		const [response, errors] = await executePromise(() => api.delete(uri));

		if (response) {
			setSelectedConversationId(noSelectedConversation);
			setMessageContent([]);
		}

		if (errors) {
			console.log(uri + " not found");
		}
	};

	const getSelectedConversation = () => {
		return conversations.filter(
			({ id }) => id === selectedConversationId
		)[0];
	};

	const onMessageSubmitted = (message: ConversationMessageProps) => {};

	const requestData = () => {
		showData({
			data: conversations,
			updateData: setConversations,
			uri: `${uri.users}/${userDataForTests.loggedUserId}/${uri.contacts}`,
		});
		if (selectedConversationId !== noSelectedConversation) {
			showData({
				data: messageContent,
				updateData: setMessageContent,
				uri: `${uri.users}/${userDataForTests.loggedUserId}/${uri.messages}/${selectedConversationId}`,
			});
		}
	};
	useEffect(() => {
		setInterval(requestData, reloadInterval);
	}, [conversations]);

	return (
		<div id="chat-container">
			<ConversationSearch
				inputValue={seachInputValue}
				setSearchInputValue={setSearchInputValue}
				isConversationLoading={isConversationLoading}
			/>
			<ConversationList
				setSelectedConversationId={setSelectedConversationId}
				selectedConversationId={selectedConversationId}
				conversations={conversations}
				searchInputValue={seachInputValue}
				isConversationLoading={isConversationLoading}
			/>
			<div id="new-message-container">
				<NewConversation />
			</div>

			<ChatTitle
				conversation={getSelectedConversation()}
				onDelete={onDeleteConversation}
			/>

			<div id="chat-message-list">
				{messageContent.map((msg) => (
					<Message message={msg} userName={userDataForTests.name} />
				))}
			</div>

			<ChatForm
				selectedConversation={selectedConversationId}
				onMessageSubmitted={onMessageSubmitted}
			/>
		</div>
	);
};
