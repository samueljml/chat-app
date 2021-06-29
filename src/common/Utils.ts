import { ConversationProps } from "../App";
let _ = require("lodash");

// export const getAllConversations = () => [
// 	{
// 		id: 1,
// 		imageUrl: "",
// 		imageAlt: "",
// 		title: "Desconhecido",
// 		createdAt: "Apr 16",
// 		latestMessageText: "",
// 		messages: [],
// 	},
// 	{
// 		id: 2,
// 		imageUrl: "",
// 		imageAlt: "Samuel",
// 		title: "Samuel",
// 		createdAt: "Oct 20",
// 		latestMessageText: "Eu também!",
// 		messages: [
// 			{
// 				imageUrl: "",
// 				imageAlt: "",
// 				messageText: "Eu também!",
// 				createdAt: "June 22",
// 				isMyMessage: true,
// 			},
// 			{
// 				imageUrl: "",
// 				imageAlt: "Daryl Duckmanton",
// 				messageText: "Tudo e você?",
// 				createdAt: "June 22",
// 				isMyMessage: false,
// 			},
// 			{
// 				imageUrl: "",
// 				imageAlt: "",
// 				messageText: "Olá, tudo bem?",
// 				createdAt: "June 22",
// 				isMyMessage: true,
// 			},
// 			{
// 				imageUrl: "",
// 				imageAlt: "",
// 				messageText: "Olá",
// 				createdAt: "June 22",
// 				isMyMessage: false,
// 			},
// 		],
// 	},
// ];

// export const getUserById = (conversationId: number) =>
// 	getAllConversations().filter(
// 		(conversation) => conversation.id === conversationId
// 	)[0];

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
	array1: any[],
	array2: any[]
) => {
	if (_.differenceWith(array1, array2, _.isEqual).length > 0) {
		return true;
	}

	return false;
};
