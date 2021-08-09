import { useContext } from "react";
import { api } from "../../api";
import { executePromise, firstLetterUpperCase, showGenericError } from "../../common/Utils";
import { TrashIcon } from "../../images/Icons/TrashIcon";
import { MainPageContext } from "../context/MainPageContext";

const defaultTitle = "Chat aplication - Select a contact to chat with";

export const ChatTitle = () => {
	const {
		user,
		selectedConversation,
		setSelectedConversation,
		conversations,
		setConversations,
	} = useContext(MainPageContext);

	const handleClick = async () => {
		const uri = `user/${user?.id}/contact/${selectedConversation?.id}`;
		const [, error] = await executePromise(() => api.delete(uri));

		if (selectedConversation) {
			const conversation = document.getElementById(
				`${selectedConversation.id}`
			);
			conversation?.classList.add("state-disable");
			
			setTimeout(() => {
				setSelectedConversation(null);
				return setConversations(
					[...conversations].filter(
						(conv) => conv.id !== selectedConversation.id
					)
				);
				 
			}, 700);
		}

		showGenericError("Conversation", error as Error);
	};

	return (
		<div className="chat-title">
			<span>{selectedConversation ? firstLetterUpperCase(selectedConversation.name) : defaultTitle}</span>

			{selectedConversation && (
				<div onClick={handleClick} title="Delete Conversation">
					<TrashIcon />
				</div>
			)}
		</div>
	);
};
