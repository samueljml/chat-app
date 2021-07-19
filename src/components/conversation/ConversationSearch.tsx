import { Dispatch, FormEvent, SetStateAction, useContext } from "react";
import { SearchLoader } from "../content-loader/SearchLoader";
import { MainPageContext } from "../context/MainPageContext";

interface ConversationSearchProps {
	setSearchInputValue: Dispatch<SetStateAction<string>>;
}

export const ConversationSearch = ({
	setSearchInputValue,
}: ConversationSearchProps) => {
	const { isConversationLoading } = useContext(MainPageContext);

	const handleInputOnChange = (event: FormEvent<HTMLInputElement>) =>
		setSearchInputValue(event.currentTarget.value);

	return (
		<div id="search-container">
			{isConversationLoading ? (
				<SearchLoader />
			) : (
				<input
					onChange={handleInputOnChange}
					type="text"
					placeholder="Search"
				/>
			)}
		</div>
	);
};
