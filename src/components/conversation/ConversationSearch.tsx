import React from "react";
import { Conversation } from "../main/MainPage";

interface ConversationSearchProps {
	conversations: Conversation[];
	inputValue: string;
	setSearchInputValue: React.Dispatch<React.SetStateAction<string>>;
}

export const ConversationSearch = ({
	conversations,
	inputValue,
	setSearchInputValue,
}: ConversationSearchProps) => {
	return (
		<div id="search-container">
			{conversations && conversations.length > 0 && (
				<input
					onChange={(e) => setSearchInputValue(e.target.value)}
					type="text"
					placeholder="Search"
					value={inputValue}
				/>
			)}
		</div>
	);
};

export default ConversationSearch;
