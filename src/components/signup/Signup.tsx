import React from "react";
import "./style.css";
import perfilIcon from "../../images/profiles/default.png";
import backIcon from "../../images/Icons/icon-back-arrow.png";
import { Input } from "../Form/Signin/FormSignIn";

const inputs: Input[] = [
	{ id: "input-name", type: "text", required: true, value: "Name" },
];

export const Signup = () => (
	<div className="container">
		<form className="form">
			<img id="back-arrow" src={backIcon} alt="Icon back arrow" />

			<h1>Create your account</h1>
			<img src={perfilIcon} alt="contributors photo" />

			{inputs.map((input: any) => (
				<div className="inputbox">
					<input
						id={input.id}
						type={input.type}
						required={input.required}
					/>
					<span>{input.value}</span>
				</div>
			))}

			<div className="inputbox">
				<input type="button" value="Continue" />
			</div>

			<a>
				<p>Already have an account?</p>
			</a>
		</form>
	</div>
);
