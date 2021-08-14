import { useContext } from "react";
import { MainPageContext } from "contexts/MainPageContext";
import defaultImage from "assets/default.png";

export const NewConversation = () => {
	const { setIsAddUserActive, user } = useContext(MainPageContext);

	const handleClick = () => setIsAddUserActive(true);

	return (
		<div className="new-message-container">
			<img src={user ? user.imageUrl : defaultImage} alt="" />
			<button onClick={handleClick}>+</button>
		</div>
	);
};
