import { useContext, useState } from "react";
import { api } from "../../../api";
import { executePromise } from "../../../common/Utils";
import { MainPageContext } from "../../context/MainPageContext";
import { User } from "../../main/MainPage";
import { UserItem } from "../user/User";
import "./style.css";

export const AddUser = () => {
	const [inputValue, setInputValue] = useState("");
	const { isAddUserActive, setIsAddUserActive } = useContext(MainPageContext);
	const [users, setUsers] = useState<Array<User>>([]);

	const showUsers = async (name: string) => {
		const [response] = await executePromise(() =>
			api.get(`user/search/${name}`)
		);

		if (response) {
			setUsers(response.data);
		}
	};

	const handleKeyDown = ({
		key,
		currentTarget,
	}: React.KeyboardEvent<HTMLInputElement>) => {
		const textValue = currentTarget.value.trim();
		if (key === "Enter" && textValue) {
			showUsers(textValue);
		}
	};

	const handleClick = () => setIsAddUserActive(false);

	return (
		<div className={`container-add-user ${isAddUserActive && "active"}`}>
			<div className="search-container">
				<h2>Adding new user</h2>
				<button onClick={handleClick}>x</button>

				<input
					onChange={(e) => setInputValue(e.target.value)}
					id="username"
					type="text"
					value={inputValue}
					onKeyPress={handleKeyDown}
					placeholder="Search a user"
				/>
			</div>
			<div className="users-list">
				{users.map((user: User) => (
					<UserItem {...user} />
				))}
			</div>
		</div>
	);
};
