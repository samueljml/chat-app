import perfilIcon from "../../../images/profiles/default.png";
import { UserProps } from "../add-user/AddUser";

export const User = ({ name }: UserProps) => (
	<div className="user-container">
		<img src={perfilIcon} alt="user photo" />
		<p id="username">{name}</p>
		<button>Invite</button>
	</div>
);
