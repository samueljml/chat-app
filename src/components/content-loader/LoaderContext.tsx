import {
	useState,
	createContext,
	Dispatch,
	SetStateAction,
	ReactNode,
} from "react";

interface LoaderContextData {
	isConversationLoading: Boolean;
	setConversationLoading: Dispatch<SetStateAction<Boolean>>;
}

interface LoaderProviderProps {
	children: ReactNode;
}

export const defaultValue: Boolean = true;

export const LoaderContext = createContext({} as LoaderContextData);

export const LoaderProvider = ({ children }: LoaderProviderProps) => {
	const [isLoading, setIsLoading] = useState(defaultValue);

	return (
		<LoaderContext.Provider
			value={{
				isConversationLoading: isLoading,
				setConversationLoading: setIsLoading,
			}}
		>
			{children}
		</LoaderContext.Provider>
	);
};
