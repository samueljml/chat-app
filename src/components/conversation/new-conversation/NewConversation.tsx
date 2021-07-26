import { useContext } from "react";
import { MainPageContext } from "../../context/MainPageContext";

export const NewConversation = () => {
	const { setIsAddUserActive } = useContext(MainPageContext);

	const handleClick = () => setIsAddUserActive(true);

	return (
		<div id="new-message-container">
			<button onClick={handleClick}>+</button>
		</div>
	);
};
