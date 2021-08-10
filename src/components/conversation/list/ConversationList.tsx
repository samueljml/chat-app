import { useContext, useEffect } from "react";
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
	const {
		conversations,
		setConversations,
		setIsConversationLoading,
		isConversationLoading,
		user,
	} = useContext(MainPageContext);

	const showConversations = async (uri: string) => {
		const [response, error] = await executePromise(() => api.get(uri));

		setIsConversationLoading(false);

		if (response && isArraysDifferents(response.data, conversations)) {
			setConversations(response.data);
		}

		if (error) {
			showGenericError("Conversations", error as Error);
		}
	};

	const requestData = () => {
		setInterval(() => {
			showConversations(`user/${user?.id}/contacts`);
		}, reloadInterval);
	};

	useEffect(requestData, [user, requestData, showConversations]);

	return (
		<div className="conversation-list">
			{isConversationLoading ? (
				<ContactLoader />
			) : (
				conversations
					.filter(({ name }: Conversation) =>
						containsSubstring(name, searchInputValue)
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
