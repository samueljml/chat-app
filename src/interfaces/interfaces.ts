import { Dispatch, ReactNode, SetStateAction } from "react";
import { optionalConversation, optionalUser } from "types/types";

export interface User {
	id: number;
	name: string;
	userName: string;
	email: string;
	imageUrl: string;
}

export interface InputAttribute {
	id: string;
	type: string;
	required: boolean;
	value: string;
}

export interface UserProps {
	data: User;
}

export interface UserId {
	loggedUserId: string;
}

export interface Contribuitor {
	name: string;
	gitHubUrl: string;
}

export interface Conversation {
	id: number;
	name: string;
	imageUrl: string;
}

export interface ConversationProps {
	conversation: Conversation;
}

export interface ConversationListProps {
	searchInputValue: string;
}

export interface ConversationSearchProps {
	setSearchInputValue: Dispatch<SetStateAction<string>>;
}

export interface MessageListResponse {
	data: Array<Message>;
}

export interface GenericObject {
	[key: string]: any;
}

export interface Message {
	id: number;
	name: string;
	imageUrl: string;
	sendTime: string;
	text: string;
	status: string;
	sentByUserId?: number;
}

export enum MessageStatus {
	SENDING = "sending",
	SENT = "sent",
	FAILED = "failed",
}

export interface MessageProps {
	message: Message;
}

export interface MainPageContextData {
	user: optionalUser;
	setUser: Dispatch<SetStateAction<optionalUser>>;
	selectedConversation: optionalConversation;
	setSelectedConversation: Dispatch<SetStateAction<optionalConversation>>;
	isConversationLoading: boolean;
	setIsConversationLoading: Dispatch<SetStateAction<boolean>>;
	isAddUserActive: boolean;
	setIsAddUserActive: Dispatch<SetStateAction<boolean>>;
	conversations: Array<Conversation>;
	setConversations: Dispatch<Array<Conversation>>;
}

export interface LoaderProviderProps {
	children: ReactNode;
}

export interface MessageContextData {
	messageContent: Array<Message>;
	setMessageContent: Dispatch<SetStateAction<Array<Message>>>;
	isLoading: boolean;
	setIsLoading: Dispatch<SetStateAction<boolean>>;
}

export interface MessageProviderProps {
	children: ReactNode;
}
