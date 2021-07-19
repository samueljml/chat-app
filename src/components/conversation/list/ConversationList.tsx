import { useContext, useEffect, useState } from "react";
import { api } from "../../../api";
import {
	containsSubstring,
	executePromise,
	isArraysDifferents,
	reloadInterval,
	showGenericError,
} from "../../../common/Utils";
import { ContactLoader } from "../../content-loader/ContactLoader";
import { MainPageContext } from "../../context/MainPageContext";
import { Conversation, ConversationItem } from "../Conversation";

interface ConversationListProps {
	searchInputValue: string;
}

export const ConversationList = ({
	searchInputValue,
}: ConversationListProps) => {
	const [conversations, setConversations] = useState<Array<Conversation>>([]);
	const { setIsConversationLoading, isConversationLoading, user } =
		useContext(MainPageContext);

	const showConversations = async (uri: string) => {
		const [response, error] = await executePromise(() => api.get(uri));

		if (response && isArraysDifferents(response.data, conversations)) {
			setConversations(response.data);
			setIsConversationLoading(false);
		}

		if (error) {
			showGenericError("Conversations", error as Error)
		}
	};

	const requestData = () => {
		setInterval(() => {
			showConversations(`users/${user.id}/contacts`);
		}, reloadInterval);
	};

	useEffect(requestData, [conversations, user.id]);

	return (
		<div id="conversation-list">
			{isConversationLoading ? (
				<ContactLoader />
			) : (
				conversations
					.filter(({ title }: Conversation) =>
						containsSubstring(title, searchInputValue)
					)
					.map((conversation: Conversation) => {
						return (
							<ConversationItem
								key={conversation.id}
								conversation={conversation}
							/>
						);
					})
			)}
		</div>
	);
};
