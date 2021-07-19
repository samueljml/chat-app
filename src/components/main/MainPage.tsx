import { useState } from "react";
import "../../App.css";
import { ChatTitle } from "../chat/ChatTitle";
import { ChatForm } from "../chat/form/ChatForm";
import { MessageProvider } from "../context/MessageContext";
import { ConversationSearch } from "../conversation/ConversationSearch";
import { ConversationList } from "../conversation/list/ConversationList";
import { NewConversation } from "../conversation/new-conversation/NewConversation";
import { MessageList } from "../message/list/MessageList";

export interface User {
	id: number;
	name: string;
	userName: string;
	email: string;
	imageUrl: string;
}

export const MainPage = () => {
	const [inputSearchValue, setInputSearchValue] = useState("");

	return (
		<div id="chat-container">
			<ConversationSearch setSearchInputValue={setInputSearchValue} />
			<ConversationList searchInputValue={inputSearchValue} />
			<NewConversation />
			<ChatTitle />
			<MessageProvider>
				<MessageList />
				<ChatForm />
			</MessageProvider>
		</div>
	);
};
