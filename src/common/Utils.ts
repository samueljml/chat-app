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

export const setMessageSessionStorage = (
	message: Message,
	conversationId: number
) => {
	sessionStorage.setItem(
		`${conversationId}/messages/${message.id}`,
		JSON.stringify(message)
	);
};

export const getSessionStorage = (path: string) => sessionStorage.getItem(path);

export const getAllMessageSessionStorage = (conversationId: number) => {
	let messages: Array<Message> = [];

	Object.keys(sessionStorage).filter((key) => key.match(`${conversationId}/.*`)).forEach((key) => {
		const value = sessionStorage.getItem(key);
		if (value) {
			messages.push(JSON.parse(value));
		}
	});

	return messages;
};

export const setMessageSessionStorageStatus = (
	message: Message,
	conversationId: number,
	status: string
) => {
	message.status = status;
	setMessageSessionStorage(message, conversationId);
};

export const gererateId = () => Math.random() * 1000000 + 1;

export const reloadInterval = 1500;

export const showGenericError = (title: string, err: Error) =>
	console.error(title, err);
