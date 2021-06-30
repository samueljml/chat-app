import React from "react";
import perfilIcon from "../../../images/profiles/default.png";
import { userProps } from "../add-user/AddUser";

export const User = ({ name }: userProps) => (
	<div className="user-container">
		<img src={perfilIcon} alt="user photo" />
		<p id="username">{name}</p>
		<button>Invite</button>
	</div>
);
