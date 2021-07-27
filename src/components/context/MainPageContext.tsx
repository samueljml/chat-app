import {
	createContext,
	Dispatch,
	ReactNode,
	SetStateAction,
	useState,
} from "react";
import { Conversation } from "../conversation/Conversation";
import { User } from "../main/MainPage";

type optionalConversation = Conversation | null;

interface MainPageContextData {
	user: User;
	setUser: Dispatch<SetStateAction<User>>;
	selectedConversation: optionalConversation;
	setSelectedConversation: Dispatch<SetStateAction<optionalConversation>>;
	isConversationLoading: boolean;
	setIsConversationLoading: Dispatch<SetStateAction<boolean>>;
	isAddUserActive: boolean;
	setIsAddUserActive: Dispatch<SetStateAction<boolean>>;
	conversations: Array<Conversation>;
	setConversations: Dispatch<Array<Conversation>>;
}

interface LoaderProviderProps {
	children: ReactNode;
}

const defaultUserForTests = {
	id: 1,
	name: "Samuel",
	imageUrl: "",
	userName: "samueljml",
	email: "",
};

export const MainPageContext = createContext({} as MainPageContextData);

export const MainPageProvider = ({ children }: LoaderProviderProps) => {
	const [selectedConversation, setSelectedConversation] =
		useState<optionalConversation>(null);
	const [user, setUser] = useState<User>(defaultUserForTests);
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
