import ContentLoader from "react-content-loader";

export const ContactLoader = () => (
	<ContentLoader
		speed={2}
		width={400}
		height={160}
		viewBox="0 0 400 160"
		backgroundColor="#f3f3f3"
		foregroundColor="#c2c2c2"
	>
		<rect x="78" y="23" rx="3" ry="3" width="61" height="13" />
		<rect x="220" y="23" rx="3" ry="3" width="37" height="13" />
		<rect x="78" y="53" rx="3" ry="3" width="140" height="13" />
		<circle cx="40" cy="45" r="23" />

		<rect x="78" y="113" rx="3" ry="3" width="61" height="13" />
		<rect x="220" y="113" rx="3" ry="3" width="37" height="13" />
		<rect x="78" y="144" rx="3" ry="3" width="118" height="13" />
		<circle cx="40" cy="135" r="23" />
	</ContentLoader>
);
