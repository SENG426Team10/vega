import { useContext } from 'react';
import { Row, Col } from 'react-bootstrap';
import { Row, Col, Table, Button } from 'react-bootstrap';
import SimplePageLayout from '../templates/SimplePageLayout.js';
import { UserContext } from '../../auth/UserProvider.js';


const Vault = (props) => {
	const { user, setUserInfo, logout } = useContext(UserContext);

	const addSecret = () => {
		console.log("Added");
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

	const addButton = <Button onClick={addSecret} size="sm">Add Secret</Button>
	const shareButton = <Button onClick={shareSecret} size="sm">Share</Button>;
	const updateButton = <Button onClick={updateSecret} size="sm">Update</Button>;
	const deleteButton = <Button onClick={deleteSecret} size="sm">Delete</Button>;

	const listOfSecretsHTML = () => {
		return (
			<tr>
				<td>Birth Certificate</td><td>07/10/1999</td><td>Dummy Data</td><td>{shareButton}</td><td>{updateButton}</td><td>{deleteButton}</td>
			</tr>
		);
    }

	return (
		<SimplePageLayout>
			<Row>
				<Col sm={6}>
					<p>Welcome to your Vega Vault,</p>
					<p>{user.username}</p>
				</Col>
				<div className="text-center">
					<p>Welcome to your Vega Vault, {user.username}</p>
				</div>
			</Row>
			<Row>
				<Table>
					<thead>
						<tr>
							<td>Name</td>
							<td>Created</td>
							<td>Data</td>
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
					{addButton}
				</div>
			</Row>
		</SimplePageLayout>
	);
}
export default Vault;