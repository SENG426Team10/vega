import { useContext, useState, useEffect } from 'react';
import { Row, Col, Table, Button, Form, Modal } from 'react-bootstrap';
import SimplePageLayout from '../templates/SimplePageLayout.js';
import { UserContext } from '../../auth/UserProvider.js';
import { fetchAllSecrets, uploadSecret } from '../../service/Vault/Vault.js';

const Vault = (props) => {
	const { user, setUserInfo, logout } = useContext(UserContext);
	const [show, setShow] = useState(false);
	const [name, setName] = useState('');
	const [secret, setSecret] = useState(null);
	const [listOfSecrets, setSecrets] = useState([]);
	useEffect(() => {
		console.log("Inside useEffect")
		fetchAllSecrets(user.jwt)
			.then(resp => {
				setSecrets(resp)
			});


	}, [user]);

	const addSecret = (name_, secret_) => {
		const secretInfo = {
			"username": user.username,
			"secretname": name_,
			"createddate": new Date().toLocaleDateString(),
			"secretdata": secret_
		};
		uploadSecret(secretInfo, user.jwt);

		console.log("Added " + name_ + ":" + secret_);
	}

	const addSecretForm = () => {		

		const nameChangeHandler = (event) => {
			setName(event.target.value);
        }

		const secretChangeHandler = (event) => {
			setSecret(event.target.value);
		}

		const submitHandler = (event) => {
			event.preventDefault();

			addSecret(name, secret);
			setShow(false)
        }

		return (
			<Form onSubmit={submitHandler}>
				<Form.Group>
					<Form.Label>Secret Name</Form.Label>
					<Form.Control type="text" onChange={nameChangeHandler} placeholder="Enter a name for your secret" />
				</Form.Group>
				<Form.Group>
					<Form.Label>Secret</Form.Label>
					<Form.Control type="text" onChange={secretChangeHandler}/>
				</Form.Group>
				<Button variant="primary" type="submit">
					Submit
				</Button>
			</Form>
		);
    }
		
	const addButton = () => {
		const handleClose = () => setShow(false);
		const handleShow = () => setShow(true);

		return (
			<>
				<Button onClick={handleShow}>
					Add Secret
				</Button>

				<Modal show={show} onHide={handleClose}>
					<Modal.Header closeButton>
						<Modal.Title>Add New Secret</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						{addSecretForm()}
					</Modal.Body>
				</Modal>
			</>
		);
	}

	const shareSecret = () => {
		console.log("Shared");
	}

	const updateSecret = () => {
		console.log("Updated");
	}

	const deleteSecret = () => {
		console.log("Deleted");
	}

	const shareButton = <Button onClick={shareSecret} size="sm">Share</Button>;
	const updateButton = <Button onClick={updateSecret} size="sm">Update</Button>;
	const deleteButton = <Button onClick={deleteSecret} size="sm">Delete</Button>;

	const listOfSecretsHTML = () => {
		if (listOfSecrets.length) {
			return listOfSecrets.map((record) => <tr><td>{record.username}</td><td>{record.secretName}</td><td>{record.createdDate}</td><td>{record.secretData}</td><td>{shareButton}</td><td>{updateButton}</td><td>{deleteButton}</td></tr>);
		}
    }

	return (
		<SimplePageLayout>
			<Row>
				<div className="text-center">
					<p>Welcome to your Vega Vault, {user.username}</p>
				</div>
			</Row>
			<Row>
				<Table>
					<thead>
						<tr>
							<td>Owner</td>
							<td>Name</td>
							<td>Created</td>
							<td>Secret</td>
							<td></td>
							<td></td>
							<td></td>
						</tr>
					</thead>
					<tbody>
						{listOfSecretsHTML()}
					</tbody>
				</Table>
			</Row>
			<Row>
				<div className="text-center">
					{addButton()}
				</div>
			</Row>
		</SimplePageLayout>
	);
}
export default Vault;