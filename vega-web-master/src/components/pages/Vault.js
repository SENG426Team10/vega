import { useContext } from 'react';
import { Row, Col } from 'react-bootstrap';
import SimplePageLayout from '../templates/SimplePageLayout.js';
import { UserContext } from '../../auth/UserProvider.js';


const Vault = (props) => {
	const { user, setUserInfo, logout } = useContext(UserContext);

	return (
		<SimplePageLayout>
			<Row>
				<Col sm={6}>
					<p>Welcome to your Vega Vault,</p>
					<p>{user.username}</p>
				</Col>
			</Row>
		</SimplePageLayout>
	);
}
export default Vault;