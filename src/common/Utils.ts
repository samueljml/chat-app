import { Conversation, Message } from "../components/main/MainPage";
const _ = require("lodash");

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
	array1: Conversation[] | Message[],
	array2: Conversation[] | Message[]
) => {
	if (_.differenceWith(array1, array2, _.isEqual).length === 0) {
		return false;
	}

	return true;
};

/**
 * Returns true if value contains the characters of the subValue. otherwise, returns false.
 * @param value
 * @param subValue
 */
export const containsSubstring = (value: string, subValue: string) => {
	return value.toLowerCase().includes(subValue.toLowerCase());
};
