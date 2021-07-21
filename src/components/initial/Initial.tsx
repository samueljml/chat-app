import "./style.css";
import profileIcon from "../../images/profiles/default.png";
import { FormSignIn } from "../Form/Signin/FormSignIn";

interface Contribuitor {
	name: string;
	gitHubUrl: string;
}

const contribuitors: Array<Contribuitor> = [
	{
		name: "Samuel",
		gitHubUrl: "https://github.com/samueljml",
	},
	{
		name: "Fabio",
		gitHubUrl: "https://github.com/FabioUmpierre",
	},
];

export const Initial = () => (
	<div className="container">
		<div className="container-title">
			<h1 className="title">CondoChat</h1>
		</div>
		<div className="container-content flex-row">
			<div className="container-about flex-column">
				<h2>About</h2>
				<h3>
					Simple chat project in React. CondoChat allows a connection
					and communication between two users in an easy and intuitive
					way! Create an account and start to chat now!
				</h3>
				<h2>Contributors</h2>
				<div className="row">
					{contribuitors.map(({ name, gitHubUrl }: Contribuitor) => (
						<div className="contibutor">
							<a href={gitHubUrl}>
								<img
									src={profileIcon}
									alt="contributors"
								/>
							</a>
							<p className="name">{name}</p>
						</div>
					))}
				</div>
			</div>

			<div className="container-acess flex-column">
				<FormSignIn />
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
