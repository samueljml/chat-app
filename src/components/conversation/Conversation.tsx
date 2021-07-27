import { useContext } from "react";
import defaultImage from "../../images/profiles/default.png";
import { MainPageContext } from "../context/MainPageContext";
import { Message } from "../message/Message";

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
			className={`conversation ${isActive && "active"}`}
			onClick={handleClick}
		>
			<img src={imageUrl || defaultImage} alt={name} />
			<div className="title-text">{name}</div>
			<div className="created-date"></div>
			<div className="conversation-message">
				<strong>No messages</strong>
			</div>
		</div>
	);
};
