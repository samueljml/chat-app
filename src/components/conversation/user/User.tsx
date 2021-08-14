import { useContext, useEffect, useState } from "react";
import { api } from "../../../api";
import {
	deleteUserSessionStorage,
	executePromise,
	getUserSessionStorage,
	saveUserSessionStorage,
} from "../../../common/Utils";
import perfilIcon from "../../../images/profiles/default.png";
import { MainPageContext } from "../../context/MainPageContext";
import { User } from "../../main/MainPage";

enum ButtonState {
	NOT_ADDED = "not-added",
	ADDING = "adding",
	ADDED = "added",
}

export const UserItem = ({ id, name, imageUrl, userName }: User) => {
	const [buttonState, setButtonState] = useState(ButtonState.NOT_ADDED);
	const { user, isAddUserActive, conversations } =
		useContext(MainPageContext);

	const toggleState = () => {
		setButtonState(
			buttonState === ButtonState.NOT_ADDED
				? ButtonState.ADDING
				: ButtonState.NOT_ADDED
		);
	};

	const handleClick = () => {
		if (buttonState !== ButtonState.ADDED) {
			toggleState();
		}
	};

	const updateButtonState = () => {
		if (buttonState === ButtonState.ADDING) {
			saveUserSessionStorage(user.id, id);
		}

		if (buttonState === ButtonState.NOT_ADDED) {
			deleteUserSessionStorage(user.id, id);
		}
	};

	useEffect(updateButtonState, [
		updateButtonState,
		buttonState,
		isAddUserActive,
		id,
		user.id,
	]);

	useEffect(() => {
		const addUserToContacts = async (userToAddId: string) => {
			const [response] = await executePromise(() =>
				api.post(`/user/${user.id}/contact/${userToAddId}`)
			);

			if (response) {
				setButtonState(ButtonState.ADDED);
				deleteUserSessionStorage(user.id, id);
			}
		};

		if (conversations.find((userItem) => userItem.id === id)) {
			return setButtonState(ButtonState.ADDED);
		}

		const userId = getUserSessionStorage(user.id, id);
		if (userId) {
			addUserToContacts(userId);
		}
	}, [conversations, user.id, id, buttonState]);

	return (
		<div className={`user-container ${buttonState}`}>
			<div className="user-info">
				<img src={imageUrl || perfilIcon} alt="user" />
				<div className="text-block">
					<p className="name">{name}</p>
					<p className="username">{userName}</p>
				</div>
			</div>

			<button className={`add-user ${buttonState}`} onClick={handleClick}>
				<span>+</span>
			</button>
		</div>
	);
};
