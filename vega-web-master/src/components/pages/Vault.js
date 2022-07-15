import { useContext, useState, useEffect } from 'react';
import { Row, Col, Table, Button, Form, Modal } from 'react-bootstrap';
import SimplePageLayout from '../templates/SimplePageLayout.js';
import { UserContext } from '../../auth/UserProvider.js';
import { fetchAllSecrets, fetchUserSecrets, uploadSecret } from '../../service/Vault/Vault.js';

const Vault = (props) => {
	const { user } = useContext(UserContext);
	const [show, setShow] = useState(false);
	const [name, setName] = useState('');
	const [secret, setSecret] = useState(null);
	const [listOfSecrets, setSecrets] = useState([]);
	const [isNewData, setNewDataFlag] = useState(false);

	// For now-defunct database integration
	useEffect(() => {
		console.log("Inside useEffect")
		if(user.role == "ROLE_ADMIN"){
			fetchAllSecrets(user.jwt)
				.then(resp => {
					setSecrets(resp)
				});
		}else{
			fetchUserSecrets(user.username, user.jwt)
				.then(resp => {
					setSecrets(resp)
				});
		} 

	}, [user]);

	// useEffect(() => {
	// 	if (isNewData) {
	// 		const json = JSON.stringify(listOfSecrets);
	// 		window.localStorage.setItem("listofSecrets", json);
	// 		setNewDataFlag(false);
    //     }
		
	// }, [isNewData]);

	// useEffect(() => {
	// 	const json = window.localStorage.getItem("listofSecrets");
	// 	const savedSecrets = JSON.parse(json);
	// 	if (savedSecrets) {
	// 		setSecrets(savedSecrets);
	// 	}
	// }, []);

	const addSecret = (name_, secret_) => {
		const secretInfo = {
			username: user.username,
			secretName: name_,
			createdDate: new Date().toLocaleDateString(),
			secretData: secret_
		};

		// For now-defunct database integration
		uploadSecret(secretInfo, user.jwt);

		setSecrets(prevList => {
			return [...prevList, secretInfo]
		});

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
			setNewDataFlag(true);
			setName("");
			setSecret("");
			setShow(false);
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
				<br/>
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

	const shareSecret = (name) => {
		console.log("Shared");
	}

	const updateSecret = (name) => {
		console.log("Updated");
	}

	const deleteSecret = (name) => {
		console.log("Deleted");
	}

	const shareButton = (name) => {return <Button onClick={() => shareSecret(name)} size="sm">Share</Button>};
	const updateButton = (name) => {return <Button onClick={() => updateSecret(name)} size="sm">Update</Button>};
	const deleteButton = (name) => {return <Button onClick={() => deleteSecret(name)} size="sm">Delete</Button>};

	const listOfSecretsHTML = () => {
		if (listOfSecrets.length) {
			return listOfSecrets.map((record) => <tr>
				<td>{record.username}</td>
				<td>{record.secretName}</td>
				<td>{record.createdDate}</td>
				<td>{record.secretData}</td>
				<td>{shareButton(record.secretName)}</td>
				<td>{updateButton(record.secretName)}</td>
				<td>{deleteButton(record.secretName)}</td></tr>);
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