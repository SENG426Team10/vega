import { useContext, useState, useEffect } from 'react';
import { Row, Col, Table, Button, Form, Modal } from 'react-bootstrap';
import SimplePageLayout from '../templates/SimplePageLayout.js';
import { UserContext } from '../../auth/UserProvider.js';
import { fetchAllSecrets, fetchUserSecrets, uploadSecret, deleteSecret } from '../../service/Vault/Vault.js';
import FormModalButton from '../UI/molecules/FormModalButton.js';

const Vault = (props) => {
	const { user } = useContext(UserContext);
	const [username, setUsername] = useState('');
	const [name, setName] = useState('');
	const [secret, setSecret] = useState(null);
	const [listOfSecrets, setSecrets] = useState([]);

	const loadSecrets = () => {
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
	};

	useEffect(() => {
		console.log("Inside useEffect")
		loadSecrets();

	}, [user]);

	const addSecret = (name_, secret_) => {
		const secretInfo = {
			id: null,
			username: user.username,
			secretName: name_,
			createdDate: new Date().toLocaleDateString(),
			secretData: secret_
		};

		uploadSecret(secretInfo, user.jwt)
			.then(() => {loadSecrets()});

		console.log("Added " + name_ + ":" + secret_);
	}

	const shareSecretForm = () => {
		return (
			<>
				<Form.Group>
					<Form.Label>Transfer to:</Form.Label>
					<Form.Control type="text" onChange={(event) => {setUsername(event.target.value)}} placeholder="Username" />
				</Form.Group>
				<br/>
				<Button variant="primary" type="submit">
					Submit
				</Button>
			</>
		);
    }

	const shareSecret = (oldSecret, username_) => {
		console.log("Sharing secret");
		const secretInfo = {
			id: null,
			username: username_,
			secretName: oldSecret.secretName,
			createdDate: oldSecret.createdDate,
			secretData: oldSecret.secretData
		};

		deleteSecret(oldSecret, user.jwt)
			.then(() => {uploadSecret(secretInfo, user.jwt)
			.then(() => {loadSecrets();
			})});

		console.log("Shared");
	}

	const updateSecret = (oldSecret, name_, secret_) => {
		console.log("Updating secret");
		const secretInfo = {
			id: null,
			username: oldSecret.username,
			secretName: name_,
			createdDate: oldSecret.createdDate,
			secretData: secret_
		};

		deleteSecret(oldSecret, user.jwt)
			.then(() => {uploadSecret(secretInfo, user.jwt)
			.then(() => {loadSecrets();
			})});

		
		console.log("Updated");
	}

	const handleDeleteSecret = (record) => {
		console.log("Deleting secret");
		console.log(record);
		deleteSecret(record, user.jwt)
			.then(() => { loadSecrets() });
		console.log("Deleted");
	}

	const shareButton = (record) => {
		return <FormModalButton 
			buttonLabel="Transfer" 
			modalTitle="Transfer Secret Ownership"
			formBody={shareSecretForm()} 
			submitEvent={() => {
				shareSecret(record, username);
				setUsername("");
			}}
			size="sm"/>;
	};
	const updateButton = (record) => {
		return <FormModalButton 
			buttonLabel="Update" 
			modalTitle="Update Secret"
			formBody={addSecretForm()} 
			submitEvent={() => {
				updateSecret(record, name, secret);
				setName("");
				setSecret("");
			}}
			size="sm"/>;
	};
	const deleteButton = (record) => {return <Button onClick={() => handleDeleteSecret(record)} size="sm">Delete</Button>};

	const listOfSecretsHTML = () => {
		if (listOfSecrets.length) {
			return listOfSecrets.map((record) => <tr>
				<td>{record.username}</td>
				<td>{record.secretName}</td>
				<td>{record.createdDate}</td>
				<td>{record.secretData}</td>
				<td>{shareButton(record)}</td>
				<td>{updateButton(record)}</td>
				<td>{deleteButton(record)}</td></tr>);
		}
    }

	const addSecretForm = () => {
		return (
			<>
				<Form.Group>
					<Form.Label>Secret Name</Form.Label>
					<Form.Control type="text" onChange={(event) => {setName(event.target.value)}} placeholder="Enter a name for your secret" />
				</Form.Group>
				<Form.Group>
					<Form.Label>Secret</Form.Label>
					<Form.Control type="text" onChange={(event) => {setSecret(event.target.value)}}/>
				</Form.Group>
				<br/>
				<Button variant="primary" type="submit">
					Submit
				</Button>
			</>
		);
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
					<FormModalButton 
						buttonLabel="Add Secret" 
						modalTitle="Add New Secret"
						formBody={addSecretForm()} 
						submitEvent={() => {
							addSecret(name, secret);
							setName("");
							setSecret("");
        				}}/>
				</div>
			</Row>
		</SimplePageLayout>
	);
}
export default Vault;