import React, {useState} from "react";
import { User } from "../user/User";
import "./style.css";

export interface usuarioProps {
	id: number;
	name: string;
	imageUrl: null;
}

const noUsers: usuarioProps[] = []

export const AddUser = () => {
	const [inputValue, setInputValue] = useState("");
	const [users, setUsers] = useState(noUsers)

	// Get/Users
	const getUsersByName = (value:string) => {}

	return (
		<div className="container">
			<h2>Invite a user</h2>
			<div className="row">
				<input onChange={(e) => setInputValue(e.target.value)} id="username" type="text" value={inputValue}/>
				<button onClick={(e) => getUsersByName(inputValue)}>Search</button>
			</div>
			<div className="users-list">
				{users.map(({id, name, imageUrl}:usuarioProps) => (
					<User id={id} imageUrl={imageUrl} name={name} />
				))}
			</div>
		</div>
	);
};
