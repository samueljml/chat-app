import React from "react";
import ContentLoader from "react-content-loader";

export const SearchLoader = () => (
	<ContentLoader
		speed={2}
		width={400}
		height={160}
		viewBox="0 0 400 160"
		backgroundColor="#f3f3f3"
		foregroundColor="#c2c2c2"
	>
		<rect x="0" y="55" rx="3" ry="3" width="400" height="50" />
	</ContentLoader>
);
