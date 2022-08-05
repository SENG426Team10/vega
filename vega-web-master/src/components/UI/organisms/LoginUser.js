import { Form, Button, Row, Col } from "react-bootstrap";
import React, { useState } from "react";

const LoginUser = ({ onSubmit, mode, switchMode, failedAttempts }) => {
	const [username, setUsername] = useState("");
	const [firstname, setFirstname] = useState("");
	const [lastname, setLastname] = useState("");
	const [password, setPassword] = useState("");
	const [isValid, setIsValid] = useState(true);

	const submitForm = (evt) => {
		evt.preventDefault();

		const validPassword = new RegExp(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/);

		if (!validPassword.test(password) && mode !== "login") {
			setIsValid(false);
			console.log(validPassword);
			return;
		}

		setIsValid(true);

		mode === "login"
			? onSubmit({
					username: username,
					password: password,
			  })
			: onSubmit({
					username: username,
					firstname: firstname,
					lastname: lastname,
					password: password,
			  });
	};

	return (
		<Row>
			<Col className="mx-auto" xs={6}>
				<Form onSubmit={submitForm}>
					<Form.Group className="mb-3">
						<Form.Label>USERNAME</Form.Label>
						<Form.Control type="text" onChange={(e) => setUsername(e.target.value)} />
					</Form.Group>
					{mode == "login" ? null : (
						<>
							<Form.Group className="mb-3">
								<Form.Label>FIRST NAME</Form.Label>
								<Form.Control type="text" onChange={(e) => setFirstname(e.target.value)} />
							</Form.Group>
							<Form.Group className="mb-3">
								<Form.Label>LAST NAME</Form.Label>
								<Form.Control type="text" onChange={(e) => setLastname(e.target.value)} />
							</Form.Group>
						</>
					)}
					<Form.Group className="mb-3">
						<Form.Label>PASSWORD</Form.Label>
						<Form.Control type="PASSWORD" onChange={(e) => setPassword(e.target.value)} isInvalid={!isValid} />
						<Form.Control.Feedback type="invalid">
							Password must contain 8 characters or more, an upper case letter, a lower case letter and a number.
						</Form.Control.Feedback>
					</Form.Group>

					<Button variant="primary" type="submit" onClick={submitForm} disabled={failedAttempts >= 3 ? true : false}>
						Submit
					</Button>
					<Button variant="link" type="button" onClick={switchMode}>
						{mode == "login" ? "Apply for a new account." : "Log in to an existing account."}
					</Button>
				</Form>
			</Col>
		</Row>
	);
};
export default LoginUser;
