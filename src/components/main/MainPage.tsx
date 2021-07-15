import React, { useState, useEffect } from "react";
import { api } from "../../api";
import "../../App.css";
import { ChatForm } from "../chat/form/ChatForm";
import { Message, MessageStatus } from "../message/Message";
import { ConversationList } from "../conversation/ConversationInput";
import { NewConversation } from "../conversation/new-conversation/NewConversation";
import {
	isArraysDifferents,
	executePromise,
	getAllMessageSessionStorage,
	setMessageSessionStorage,
	gererateId,
} from "../../common/Utils";
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
			setIsConversationLoading(false);
			let contentData = response.data;

			if (uri.includes("message")) {
				contentData = [
					...getAllMessageSessionStorage(selectedConversationId),
					...contentData,
				];
			}

			updateData(contentData);
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

	const updateMessageStatus = (message: Message, status: string) => {
		return messageContent
			.filter((newMessage) => message === newMessage)
			.forEach((msg: Message) => {
				msg.status = status;
				setMessageSessionStorage(msg, selectedConversationId);
				return msg;
			});
	};

	const onPostMessage = async (message: Message) => {
		const messageUri = `/users/${userDataForTests.loggedUserId}/messages/${selectedConversationId}`;
		const [response, errors] = await executePromise(() =>
			api.post(messageUri, message)
		);

		if (response) {
			setMessageContent(updateMessageStatus(message, "sent"));
		}

		if (errors) {
			setMessageContent(updateMessageStatus(message, "failed"));
			console.log(messageUri + " not found");
		}
	};

	const getSelectedConversation = () => {
		return conversations.filter(
			({ id }) => id === selectedConversationId
		)[0];
	};

	const onMessageSubmitted = (text: string) => {
		const currentDate = new Date();
		const message: Message = {
			id: gererateId(),
			name: userDataForTests.name,
			imageUrl: userDataForTests.imageUrl,
			text: text,
			sendTime: `${currentDate.getHours().toString()}:
				${currentDate.getMinutes().toString()}`,
			status: "sending",
		};
		setMessageSessionStorage(message, selectedConversationId);
		setMessageContent([message, ...messageContent]);
		onPostMessage(message);
	};

	const requestData = () => {
		setInterval(() => {
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
		}, reloadInterval);
	};

	const postSendingMessages = () => {
		setInterval(async () => {
			const messages = messageContent.filter(
				({ status }) => status === MessageStatus.SENDING
			);

			for (const message of messages) {
				await onPostMessage(message);
			}
		}, reloadInterval);
	};

	useEffect(postSendingMessages, []);

	useEffect(requestData, [conversations]);

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
				{messageContent.map((msg, index) => (
					<Message
						key={`${msg.sendTime}-${msg.id}`}
						message={msg}
						userName={userDataForTests.name}
					/>
				))}
			</div>

			<ChatForm
				selectedConversation={selectedConversationId}
				onMessageSubmitted={onMessageSubmitted}
			/>
		</div>
	);
};
