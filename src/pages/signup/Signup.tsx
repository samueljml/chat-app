import perfilIcon from "assets/default.png";
import backIcon from "assets/icon-back-arrow.png";
import { signup } from "common/strings.json";
import { InputAttribute } from "components/forms/FormSignIn";
import "./style.css";

export const SignUp = () => (
	<div className="container">
		<form className="form">
			<img className="back-arrow" src={backIcon} alt="Icon back arrow" />

			<h1>{signup.title}</h1>
			<img src={perfilIcon} alt="contributors" />

			{signup.inputs.map(
				({ id, type, required, value }: InputAttribute) => (
					<div className="inputbox">
						<input id={id} type={type} required={required} />
						<span>{value}</span>
					</div>
				)
			)}

			<div className="inputbox">
				<input type="button" value="Continue" />
			</div>

			<p>{signup.signIn}</p>
		</form>
	</div>
);
