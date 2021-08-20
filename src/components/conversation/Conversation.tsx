import defaultImage from "assets/default.png";
import { firstLetterUpperCase } from "common/Utils";
import { MainPageContext } from "contexts/MainPageContext";
import { useContext } from "react";
import { conversationItem } from "common/strings.json";

export interface Conversation {
	id: number;
	name: string;
	imageUrl: string;
}

interface ConversationProps {
	conversation: Conversation;
}

export const ConversationItem = ({ conversation }: ConversationProps) => {
	const { id, imageUrl, name } = conversation;
	const { selectedConversation, setSelectedConversation } =
		useContext(MainPageContext);
	const isActive: boolean = id === selectedConversation?.id;

	const handleClick = () => {
		if (!isActive) {
			setSelectedConversation(conversation);
		}
	};

	return (
		<div
			id={`${id}`}
			className={`conversation ${isActive && "active"}`}
			onClick={handleClick}
		>
			<img src={imageUrl || defaultImage} alt={name} />
			<div className="title-text">{firstLetterUpperCase(name)}</div>
			<div className="created-date"></div>
			<div className="conversation-message">
				<strong>{conversationItem.message.default}</strong>
			</div>
		</div>
	);
};
