import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { MainPageProvider } from "./contexts/MainPageContext";
import { Initial } from "./pages/initial/Initial";
import { MainPage } from "./pages/main/MainPage";
import { SignUp } from "./pages/signup/Signup";

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
