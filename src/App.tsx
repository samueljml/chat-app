import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { LoaderProvider } from "./components/content-loader/LoaderContext";
import { Initial } from "./components/initial/Initial";
import { MainPage } from "./components/main/MainPage";
import { SignUp } from "./components/signup/Signup";

export const App = () => {
	return (
		<Router>
			<Switch>
				<Route exact path="/initial" component={Initial} />
				<Route exact path="/signUp" component={SignUp} />
				<LoaderProvider>
					<Route
						exact
						path="/users/:loggedUserId/contacts"
						component={MainPage}
					/>
				</LoaderProvider>
			</Switch>
		</Router>
	);
};
