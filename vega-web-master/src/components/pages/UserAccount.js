import {useState, useContext} from 'react';
import {useHistory} from "react-router-dom";
import {Button, Row, Col} from 'react-bootstrap';
import SimplePageLayout from '../templates/SimplePageLayout.js';
import ListRoundedImages from '../UI/molecules/ListRoundImages.js';
import {UserContext} from '../../auth/UserProvider.js';


const UserAccount = (props) => {
	const {user, setUserInfo,logout} = useContext(UserContext);
	const history = useHistory();
	
	const logoutAndRouteChange = () => {
		logout();
		history.push("/");
	}	

	return (
		<SimplePageLayout>
			<Row>
				<Col sm={6}>
					<p>Hello, {user.username}</p>
					<p>Press the button below to Logout.</p>
					<Button onClick={logoutAndRouteChange} size="sm">Logout</Button>
				</Col>
			</Row>
		</SimplePageLayout>
		);
}
export default UserAccount;