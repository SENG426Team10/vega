import { useState, useContext } from "react";
import UserRegistrationPageLayout from "../templates/UserRegistrationPageLayout.js";
import LoginUser from "../UI/organisms/LoginUser.js";
import { login, signup } from "../../service/auth/AuthenticationManager.js";

import { UserContext } from "../../auth/UserProvider.js";
import { Redirect } from "react-router-dom";

const Login = (props) => {
	const { context } = props;
	const { user, setUserInfo, logout } = useContext(UserContext);
	const [auth, setAuth] = useState(false);
	const [mode, setMode] = useState("login");
	const [feedbackMessage, setFeedbackMessage] = useState("");
	var [failedAttempts, setFailedAttempts] = useState(0);
	console.log("Userinfo", user);

	function giveFeedback(msg) {
		setFeedbackMessage(msg);
		setTimeout(() => setFeedbackMessage(""), 3000);
	}

	function onSubmit(userInfo) {
		if (mode == "login") {
			login(userInfo).then((res) => {
				console.log("Response", res);
				if (res.jwt) {
					console.log(res.jwt);
					var role = res.authorities[0].authority;
					setUserInfo(userInfo.username, res.jwt, role);
					setAuth(true);
					setFailedAttempts(0);
				} else {
					setFailedAttempts((failedAttempts += 1));
					giveFeedback("Invalid login: " + failedAttempts + " of 3 attempts.");
					console.log(failedAttempts);
				}
			});
		} else {
			signup(userInfo).then((res) => {
				console.log("Response", res);
				giveFeedback(res && res.code ? "Username Already In Use" : res);
			});
		}
	}

	function switchMode() {
		if (mode == "login") {
			setMode("signup");
		} else {
			setMode("login");
		}
	}

	if (!auth) {
		return (
			<UserRegistrationPageLayout>
				<p className="feedback-msg">{feedbackMessage}</p>
				<h1>{mode == "login" ? "Login" : "Sign Up"}</h1>
				<LoginUser onSubmit={onSubmit} mode={mode} switchMode={switchMode} failedAttempts={failedAttempts} />
			</UserRegistrationPageLayout>
		);
	} else {
		return <Redirect to="/" />;
	}
};

export default Login;
