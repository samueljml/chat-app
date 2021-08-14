export interface InputAttribute {
	id: string;
	type: string;
	required: boolean;
	value: string;
}

const inputAttributes: Array<InputAttribute> = [
	{
		id: "input-name",
		type: "text",
		required: true,
		value: "Name",
	},
];

export const FormSignIn = () => (
	<form className="container-form flex-column">
		<h2>Login and start to chat!</h2>

		{inputAttributes.map(
			({ id, type, required, value }: InputAttribute) => (
				<div className="inputbox">
					<input id={id} type={type} required={required} />
					<span>{value}</span>
				</div>
			)
		)}

		<div className="inputbox flex-column">
			<input type="button" className="btn-signin" value="Sign in" />
		</div>
	</form>
);
