import React from "react";
import { SearchLoader } from "../content-loader/SearchLoader";
import { Conversation } from "../main/MainPage";

interface ConversationSearchProps {
	inputValue: string;
	setSearchInputValue: React.Dispatch<React.SetStateAction<string>>;
	isConversationLoading:Boolean;
}

export const ConversationSearch = ({
	inputValue,
	setSearchInputValue,
	isConversationLoading,
}: ConversationSearchProps) => {
	return (
		<div id="search-container">
			{isConversationLoading ? (
					<SearchLoader />
				) : (
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