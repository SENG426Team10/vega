import {Button, Container, Row} from 'react-bootstrap';
import Header from '../UI/organisms/Header.js';
import Footer from '../UI/organisms/Footer.js';
import ListNewsDetails from '../UI/organisms/ListNewsDetails.js'
import { useContext } from 'react';
import { UserContext } from '../../auth/UserProvider.js';

const BlogPageLayout = ({listOfNews}) => {
	const { user } = useContext(UserContext);
	const addPostButton = (user.role == "ROLE_ADMIN") ? <Button onClick={() => console.log("Add Post")}>New Post</Button> : <div></div>;
	
	return(
		<Container className="d-flex flex-column min-vh-100 justify-content-between">
			<Row>
				<Header />
				{addPostButton}
				<ListNewsDetails listOfNews={listOfNews}/>
			</Row>
			<Footer />
		</Container>
		);
}
export default BlogPageLayout;