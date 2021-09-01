import { useContext, useEffect, useState } from "react";
import { api } from "server/api";
import { executePromise } from "common/Utils";
import { MainPageContext } from "contexts/MainPageContext";
import "./style.css";
import { UsersLoader } from "components/loader/UsersLoader";
import { UserItem } from "components/user/User";
import { addUser } from "common/strings.json";
import { User } from "interfaces/interfaces";

export const AddUser = () => {
	const [inputValue, setInputValue] = useState("");
	const { isAddUserActive, setIsAddUserActive } = useContext(MainPageContext);
	const [state, setState] = useState("");
	const [users, setUsers] = useState<Array<User>>([]);
	const [isLoading, setIsLoading] = useState(false);

	const showUsers = async (name: string) => {
		const [response] = await executePromise(() =>
			api.get(`user/search/${name}`)
		);

		setIsLoading(false);

		if (response) {
			return setUsers([response.data]);
		}

		setUsers([]);
	};

	const handleKeyDown = ({
		key,
		currentTarget,
	}: React.KeyboardEvent<HTMLInputElement>) => {
		const textValue = currentTarget.value.trim();
		if (key === "Enter" && textValue) {
			setIsLoading(true);
			showUsers(textValue);
		}
	};

	const handleClick = () => {
		setState("");
		setTimeout(() => {
			setIsAddUserActive(false);
		}, 700);
	};

	useEffect(() => {
		if (isAddUserActive) {
			setState("active");
		}
	}, [isAddUserActive]);

	return (
		<div className={`container-add-user ${state}`}>
			<div className="search-container">
				<h2>{addUser.title}</h2>
				<button onClick={handleClick}>{addUser.button}</button>

				<input
					onChange={(e) => setInputValue(e.target.value)}
					id="username"
					type="text"
					value={inputValue}
					onKeyPress={handleKeyDown}
					placeholder="Search a user"
					autoComplete="off"
				/>
			</div>
			<div className="users-list">
				{isLoading ? (
					<UsersLoader />
				) : (
					users.map((user: User) => <UserItem {...user} />)
				)}
			</div>
		</div>
	);
};
