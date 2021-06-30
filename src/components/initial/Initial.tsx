import React from "react";
import "./style.css";
import perfilIcon from "../../images/profiles/default.png";
import { FormSignin } from "../Form/Signin/FormSignIn";

export const Initial = () => (
	<div className="container">
		<div className="container-title">
			<h1 className="title">CondoChat</h1>
		</div>
		<div className="container-content flex-row">
			<div className="container-about flex-column">
				<h2>About</h2>
				<p>
					Simple chat project in React. CondoChat allows a connection
					and communication between two users in an easy and intuitive
					way! Create an account and start to chat now!
				</p>
				<h2>Contributors</h2>
				<div className="row">
					<div className="contibutor">
						<a href="https://github.com/samueljml">
							<img src={perfilIcon} alt="contributors photo" />
						</a>
						<p className="name">Samuel</p>
					</div>
					<div className="contibutor">
						<a href="https://github.com/FabioUmpierre">
							<img src={perfilIcon} alt="contributors photo" />
						</a>
						<p className="name">Fabio</p>
					</div>
				</div>
			</div>

			<div className="container-acess flex-column">
				<FormSignin />
				<div className="container-sign-up">
					<h2>Don't have an account? Create now!</h2>
					<div className="inputbox">
						<input type="button" id="btn-signup" value="Sign up" />
					</div>
				</div>
			</div>
		</div>
	</div>
);
