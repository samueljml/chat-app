import { Conversation } from "../components/conversation/Conversation";
import { Message } from "../components/message/Message";

import { differenceWith, isEqual } from "lodash";

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

	saveSessionStorage(`${conversationId}/messages`, messages);
};

const saveSessionStorage = (key: string, value: Array<Message>) => {
	sessionStorage.setItem(key, JSON.stringify(value));
};

export const getAllMessagesSessionStorage = (
	conversationId: number
): Array<Message> => {
	const storagedConversationMessages = sessionStorage.getItem(
		`${conversationId}/messages`
	);

	return storagedConversationMessages
		? JSON.parse(storagedConversationMessages)
		: [];
};

export const updateMessageSessionStorage = (
	newMessage: Message,
	conversationId: number
) => {
	const messagesUpdated = getAllMessagesSessionStorage(conversationId).map(
		(message) => {
			if (message.id === newMessage.id) {
				return newMessage;
			}
			return message;
		}
	);

	saveSessionStorage(`${conversationId}/messages`, messagesUpdated);
};

export const gererateId = () => Math.random() * 1000000 + 1;

export const reloadInterval = 1500;

export const showGenericError = (title: string, err: Error) =>
	console.error(title, err);
