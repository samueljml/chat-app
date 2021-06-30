import React from "react";
import perfilIcon from "../../images/profiles/default.png";
import backIcon from "../../images/Icons/icon-back-arrow.png";

export interface InputProps {
	id: string;
	type: string;
	required: boolean;
	value: string;
}

const inputs: InputProps[] = [
	{ id: "input-name", type: "text", required: true, value: "Name" },
];

export const FormSignin = () => (
	<form className="container-form flex-column">
		<h2>Login and start to chat!</h2>

		{inputs.map(({ id, type, required, value }: InputProps) => (
			<div className="inputbox">
				<input id={id} type={type} required={required} />
				<span>{value}</span>
			</div>
		))}

		<div className="inputbox flex-column">
			<input type="button" id="btn-signin" value="Sign in" />
		</div>
	</form>
);
