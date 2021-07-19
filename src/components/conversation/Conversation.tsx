import { useContext } from "react";
import defaultImage from "../../images/profiles/default.png";
import { MainPageContext } from "../context/MainPageContext";
import { Message } from "../message/Message";

export interface Conversation {
	id: number;
	imageUrl: string;
	imageAlt: string;
	title: string;
	createdAt: string;
	latestMessageText: Message;
}

interface ConversationProps {
	conversation: Conversation;
}

export const ConversationItem = ({ conversation }: ConversationProps) => {
	const { id, imageUrl, imageAlt, title, latestMessageText } = conversation;
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
			<img src={imageUrl || defaultImage} alt={imageAlt} />
			<div className="title-text">{title}</div>
			<div className="created-date">{latestMessageText.sendTime}</div>
			<div className="conversation-message">
				{latestMessageText.text || <strong>No messages</strong>}
			</div>
		</div>
	);
};
