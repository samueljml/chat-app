import { useContext, useState } from "react";
import "../../App.css";
import { ChatTitle } from "../chat/ChatTitle";
import { ChatForm } from "../chat/form/ChatForm";
import { MainPageContext } from "../context/MainPageContext";
import { MessageProvider } from "../context/MessageContext";
import { AddUser } from "../conversation/add-user/AddUser";
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
	const { isAddUserActive } = useContext(MainPageContext);

	return (
		<div className="chat-container">
			<ConversationSearch setSearchInputValue={setInputSearchValue} />
			<ConversationList searchInputValue={inputSearchValue} />
			<NewConversation />
			{isAddUserActive && <AddUser />}
			<ChatTitle />
			<MessageProvider>
				<MessageList />
				<ChatForm />
			</MessageProvider>
		</div>
	);
};
