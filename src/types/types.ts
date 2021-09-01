import { Conversation, GenericObject, User } from "interfaces/interfaces";

export type optionalConversation = Conversation | null;
export type optionalUser = User | undefined;

export type ExecutedPromiseResponse<R> = [
	data: R | null,
	error: GenericObject | null
];