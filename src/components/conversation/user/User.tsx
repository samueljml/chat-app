import { useContext, useEffect, useState } from "react";
import { api } from "../../../api";
import {
	deleteUserSessionStorage,
	executePromise,
	getAllUsersSessionStorage,
	saveUsersSessionStorage
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
	const { user } = useContext(MainPageContext);

	const addUserToContacts = async () => {
		const [response] = await executePromise(() =>
			api.post(`/user/${user.id}/contact/${id}`)
		);

		if (response) {
			return setButtonState(ButtonState.ADDED);
		}

		deleteUserSessionStorage(user.id);
	};

	const updateButtonState = () => {
		setButtonState(
			buttonState === ButtonState.NOT_ADDED
				? ButtonState.ADDING
				: ButtonState.NOT_ADDED
		);

		saveUsersSessionStorage(user);
	};

	const handleClick = () => {
		if (buttonState !== ButtonState.ADDED) {
			updateButtonState();

			if (buttonState === ButtonState.ADDING) {
				return addUserToContacts();
			}
			deleteUserSessionStorage(user.id);
		}
	};

	useEffect(() => {
		const users = getAllUsersSessionStorage(user.id);
		if (users.find((userItem) => userItem.id === user.id)) {
			setButtonState(ButtonState.ADDING);
		}
	}, [buttonState]);

	return (
		<div className={`user-container ${buttonState}`}>
			<div className="user-info">
				<img src={imageUrl || perfilIcon} alt="user photo" />
				<div className="text-block">
					<p id="name">{name}</p>
					<p id="username">{userName}</p>
				</div>
			</div>

			<button
				className={`add-user ${buttonState}`}
				onClick={handleClick}
			><span>x</span></button>
		</div>
	);
};
