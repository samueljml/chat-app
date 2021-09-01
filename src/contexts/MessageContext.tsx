import { Message, MessageContextData, MessageProviderProps } from "interfaces/interfaces";
import {
	createContext, useState
} from "react";

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
