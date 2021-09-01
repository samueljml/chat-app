import { Conversation, LoaderProviderProps, MainPageContextData } from "interfaces/interfaces";
import {
	createContext, useState
} from "react";
import { optionalConversation, optionalUser } from "types/types";

export const MainPageContext = createContext({} as MainPageContextData);

export const MainPageProvider = ({ children }: LoaderProviderProps) => {
	const [selectedConversation, setSelectedConversation] =
		useState<optionalConversation>(null);
	const [user, setUser] = useState<optionalUser>();
	const [isConversationLoading, setIsConversationLoading] = useState(true);
	const [isAddUserActive, setIsAddUserActive] = useState(false);
	const [conversations, setConversations] = useState<Array<Conversation>>([]);

	return (
		<MainPageContext.Provider
			value={{
				user,
				setUser,
				selectedConversation,
				setSelectedConversation,
				isConversationLoading,
				setIsConversationLoading,
				isAddUserActive,
				setIsAddUserActive,
				conversations,
				setConversations,
			}}
		>
			{children}
		</MainPageContext.Provider>
	);
};
