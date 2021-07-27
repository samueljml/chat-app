import { Conversation } from "../components/conversation/Conversation";
import { Message } from "../components/message/Message";

import { differenceWith, isEqual } from "lodash";
import { AxiosResponse } from "axios";
import { User } from "../components/main/MainPage";

export interface GenericObject {
	[key: string]: any;
}

export const isAFunction = (v: unknown) => typeof v === "function";

export type ExecutedPromiseResponse<R> = [
	data: R | null,
	error: GenericObject | null
];

export const executePromise = async <R>(
	promiseFn: () => Promise<R>,
	finallyFn?: () => void
): Promise<ExecutedPromiseResponse<R>> => {
	try {
		const data = await promiseFn();
		return [data, null];
	} catch (error) {
		return [null, error];
	} finally {
		if (finallyFn && isAFunction(finallyFn)) {
			finallyFn();
		}
	}
};

export const isArraysDifferents = (
	array1: Array<Conversation | Message>,
	array2: Array<Conversation | Message>
) => differenceWith(array1, array2, isEqual).length > 0;

export const containsSubstring = (value: string, subValue: string) =>
	value.toLowerCase().includes(subValue.toLowerCase());

export const saveMessageSessionStorage = async (
	message: Message,
	conversationId: number
) => {
	const messages: Array<Message> = [
		message,
		...getAllMessagesSessionStorage(conversationId),
	];

	saveSessionStorage(`messages-${conversationId}`, messages);
};

const saveSessionStorage = (key: string, value: Array<Message> | string) =>
	sessionStorage.setItem(key, JSON.stringify(value));

export const getAllMessagesSessionStorage = (
	conversationId: number
): Array<Message> => {
	const storagedConversationMessages = sessionStorage.getItem(
		`messages-${conversationId}`
	);

	return storagedConversationMessages
		? JSON.parse(storagedConversationMessages)
		: [];
};

export const updateMessageSessionStorage = (
	newMessage: Message,
	conversationId: number
) => {
	const messages = getAllMessagesSessionStorage(conversationId);
	const messageIndex = messages.findIndex(({ id }) => id === newMessage.id);
	messages[messageIndex] = newMessage;
	saveSessionStorage(`messages-${conversationId}`, messages);
};

export const deleteMessageSessionStorage = (
	message: Message,
	conversationId: number
) => {
	const messages = getAllMessagesSessionStorage(conversationId);
	messages.splice(messages.findIndex(({ id }) => id === message.id));
	saveSessionStorage(`messages-${conversationId}`, messages);
};

export const gererateId = () => Math.random() * 1000000 + 1;

export const reloadInterval = 1500;

export const showGenericError = (
	title: string,
	err: Error | AxiosResponse | GenericObject
) => console.error(title, err);

export const saveUserSessionStorage = async (
	myUserId: number,
	userId: number
) => {
	saveSessionStorage(`user-${myUserId}-adding-${userId}`, `${userId}`);
};

export const getUserSessionStorage = (myUserId: number, userId: number) => {
	const addingUserId = sessionStorage.getItem(
		`user-${myUserId}-adding-${userId}`
	);

	return addingUserId || "";
};

export const deleteUserSessionStorage = (myUserId: number, userId: number) => {
	sessionStorage.removeItem(`user-${myUserId}-adding-${userId}`);
};
