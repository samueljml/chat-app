import ContentLoader from "react-content-loader";

export const MessageLoader = () => (
	<ContentLoader
		speed={2}
		width={685}
		height={300}
		viewBox="0 0 685 300"
		style={{overflow:"scroll", cursor:"wait"}}
		backgroundColor="#f3f3f3"
		foregroundColor="#c2c2c2"
	>
		<rect x="55" y="182" rx="3" ry="3" width="46" height="13" />
		<rect x="55" y="143" rx="3" ry="3" width="361" height="34" />
		<circle cx="21" cy="164" r="21" />
		<rect x="570" y="71" rx="3" ry="3" width="119" height="38" />
		<rect x="636" y="257" rx="3" ry="3" width="53" height="13" />
		<rect x="570" y="215" rx="3" ry="3" width="119" height="34" />
		<rect x="636" y="113" rx="3" ry="3" width="53" height="13" />
		<circle cx="21" cy="21" r="21" />
		<rect x="54" y="1" rx="3" ry="3" width="361" height="33" />
		<rect x="54" y="40" rx="3" ry="3" width="48" height="13" />
	</ContentLoader>
);
