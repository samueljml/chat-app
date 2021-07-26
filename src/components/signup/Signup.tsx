import "./style.css";
import perfilIcon from "../../images/profiles/default.png";
import backIcon from "../../images/Icons/icon-back-arrow.png";
import { InputAttribute } from "../Form/Signin/FormSignIn";

const inputAttributes: Array<InputAttribute> = [
	{
		id: "input-name",
		type: "text",
		required: true,
		value: "Name",
	},
];

export const SignUp = () => (
	<div className="container">
		<form className="form">
			<img className="back-arrow" src={backIcon} alt="Icon back arrow" />

			<h1>Create your account</h1>
			<img src={perfilIcon} alt="contributors" />

			{inputAttributes.map(
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

			<p>Already have an account?</p>
		</form>
	</div>
);
