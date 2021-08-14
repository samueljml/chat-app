import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "server/api";
import "App.css";
import { executePromise } from "common/Utils";
import { ChatTitle } from "components/chat/ChatTitle";
import { ChatForm } from "components/forms/ChatForm";
import { MainPageContext } from "contexts/MainPageContext";
import { AddUser } from "components/user/add-user/AddUser";
import { ConversationSearch } from "components/conversation/ConversationSearch";
import { ConversationList } from "components/conversation/ConversationList";
import { NewConversation } from "components/conversation/NewConversation";
import { MessageList } from "components/message/list/MessageList";
import { MessageProvider } from "contexts/MessageContext";

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

	useEffect(() => {
		const showUser = async () => {
			const uri = `/user/${loggedUserId}`;

			const [response] = await executePromise<UserProps>(() =>
				api.get(uri)
			);

			if (response) {
				setUser(response.data);
			}
		};

		showUser();
	}, [loggedUserId, setUser]);

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
