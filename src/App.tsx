import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { MainPageProvider } from "./components/context/MainPageContext";
import { Initial } from "./components/initial/Initial";
import { MainPage } from "./components/main/MainPage";
import { SignUp } from "./components/signup/Signup";

export const App = () => {
	return (
		<Router>
			<Switch>
				<Route exact path="/" component={Initial} />
				<Route exact path="/signUp" component={SignUp} />
				<MainPageProvider>
					<Route
						exact
						path="/users/:loggedUserId"
						component={MainPage}
					/>
				</MainPageProvider>
			</Switch>
		</Router>
	);
};
