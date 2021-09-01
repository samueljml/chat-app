import { SearchLoader } from "components/loader/SearchLoader";
import { MainPageContext } from "contexts/MainPageContext";
import { ConversationSearchProps } from "interfaces/interfaces";
import { FormEvent, useContext } from "react";

export const ConversationSearch = ({
	setSearchInputValue,
}: ConversationSearchProps) => {
	const { isConversationLoading } = useContext(MainPageContext);

	const handleInputOnChange = (event: FormEvent<HTMLInputElement>) =>
		setSearchInputValue(event.currentTarget.value);

	return (
		<div className="search-container">
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
