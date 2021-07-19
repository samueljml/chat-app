import { useState } from "react";
import { User } from "../user/User";
import "./style.css";

export interface UserProps {
	id: number;
	name: string;
	imageUrl: null;
}

const noUsers: Array<UserProps> = [];

export const AddUser = () => {
	const [inputValue, setInputValue] = useState("");
	const [users] = useState(noUsers);

	return (
		<div className="container">
			<h2>Invite a user</h2>
			<div className="row">
				<input
					onChange={(e) => setInputValue(e.target.value)}
					id="username"
					type="text"
					value={inputValue}
				/>
				<button>
					Search
				</button>
			</div>
			<div className="users-list">
				{users.map(({ id, name, imageUrl }: UserProps) => (
					<User id={id} imageUrl={imageUrl} name={name} />
				))}
			</div>
		</div>
	);
};
