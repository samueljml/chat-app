import {
	createContext,
	Dispatch,
	ReactNode,
	SetStateAction,
	useState,
} from "react";
import { Message } from "../message/Message";

interface MessageContextData {
	messageContent: Array<Message>;
	setMessageContent: Dispatch<SetStateAction<Array<Message>>>;

	isLoading: boolean;
	setIsLoading: Dispatch<SetStateAction<boolean>>;
}

interface MessageProviderProps {
	children: ReactNode;
}

export const MessageContext = createContext({} as MessageContextData);

export const MessageProvider = ({ children }: MessageProviderProps) => {
	const [messageContent, setMessageContent] = useState<Array<Message>>([]);
	const [isLoading, setIsLoading] = useState(false);

	return (
		<MessageContext.Provider
			value={{
				messageContent: messageContent,
				setMessageContent: setMessageContent,
				isLoading: isLoading,
				setIsLoading: setIsLoading,
			}}
		>
			{children}
		</MessageContext.Provider>
	);
};
