import { useContext } from "react";
import { api } from "../../api";
import { executePromise, showGenericError } from "../../common/Utils";
import { TrashIcon } from "../../images/Icons/TrashIcon";
import { MainPageContext } from "../context/MainPageContext";

const defaultTitle = "Chat aplication - Select a contact to chat with";

export const ChatTitle = () => {
	const { user, selectedConversation, setSelectedConversation } =
		useContext(MainPageContext);

	const handleClick = async () => {
		const uri = `user/${user.id}/contact/${selectedConversation?.id}`;
		const [response, error] = await executePromise(() => api.delete(uri));

		if (response) {
			return setSelectedConversation(null);
		}

		showGenericError("Conversation", error as Error);
	};

	return (
		<div className="chat-title">
			<span>{selectedConversation?.name || defaultTitle}</span>

			{selectedConversation && (
				<div onClick={handleClick} title="Delete Conversation">
					<TrashIcon />
				</div>
			)}
		</div>
	);
};
