import profileIcon from "assets/default.png";
import { initial } from "common/strings.json";
import { FormSignIn } from "components/forms/FormSignIn";
import "./style.css";
interface Contribuitor {
	name: string;
	gitHubUrl: string;
}

export const Initial = () => (
	<div className="container">
		<div className="container-title">
			<h1 className="title">{initial.title}</h1>
		</div>
		<div className="container-content flex-row">
			<div className="container-about flex-column">
				<h2>{initial.about.title}</h2>
				<h3>{initial.about.content}</h3>
				<h2>{initial.about.contributors}</h2>
				<div className="row">
					{initial.contribuitors.map(
						({ name, gitHubUrl }: Contribuitor) => (
							<div className="contibutor">
								<a href={gitHubUrl}>
									<img src={profileIcon} alt="contributors" />
								</a>
								<p className="name">{name}</p>
							</div>
						)
					)}
				</div>
			</div>

			<div className="container-acess flex-column">
				<FormSignIn />
				<div className="container-sign-up">
					<h2>{initial.signup}</h2>
					<div className="inputbox">
						<input
							type="button"
							className="btn-signup"
							value="Sign up"
						/>
					</div>
				</div>
			</div>
		</div>
	</div>
);
