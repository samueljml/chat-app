import { useContext } from "react";
import { MainPageContext } from "../../context/MainPageContext";
import defaultImage from "../../../images/profiles/default.png";

export const NewConversation = () => {
	const { setIsAddUserActive, user } = useContext(MainPageContext);

	const handleClick = () => setIsAddUserActive(true);

	return (
		<div id="new-message-container">
			<img src={user ? user.imageUrl : defaultImage} alt="" />
			<button onClick={handleClick}>+</button>
		</div>
	);
};
