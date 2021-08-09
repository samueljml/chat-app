import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../api";
import "../../App.css";
import { executePromise } from "../../common/Utils";
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

interface UserProps {
	data: User;
}

interface UserId {
	loggedUserId: string;
}

export const MainPage = () => {
	const [inputSearchValue, setInputSearchValue] = useState("");
	const { isAddUserActive, setUser, selectedConversation } =
		useContext(MainPageContext);
	let { loggedUserId } = useParams<UserId>();

	const showUser = async () => {
		const uri = `/user/${loggedUserId}`;

		const [response] = await executePromise<UserProps>(() => api.get(uri));

		if (response) {
			setUser(response.data);
		}
	};

	const handle = () => {
		showUser();
	};

	useEffect(handle, []);

	return (
		<div className="chat-container">
			<ConversationSearch setSearchInputValue={setInputSearchValue} />
			<ConversationList searchInputValue={inputSearchValue} />
			<NewConversation />
			{isAddUserActive && <AddUser />}
			<ChatTitle />
			<MessageProvider>
				{selectedConversation && <MessageList />}
				<ChatForm />
			</MessageProvider>
		</div>
	);
};
