import express from 'express';
import { fetchAllSecrets, fetchUserSecrets } from '../services/VaultAPI.js';

let router = express();

router.get("/getallsecrets", (req, res) => {
	console.log("Entered get all secrets");
	fetchAllSecrets(`http://${process.env.API_URL}/venus/vault/getallsecrets`, req.headers)
		.then(response => {
			console.log("Response", response);
			res.send(response);
		})
		.catch(error => {
			console.log("ERROR:", error);
			res.send(error);
		})
})

router.get("/getusersecrets", (req, res) => {
	console.log("Request: Get Users Secrets");
	const { username } = req.query;
	fetchUserSecrets(`http://${process.env.API_URL}/venus/vault/getusersecrets?username=${username}`, req.headers)
		.then(response => {
			console.log("Response", response);
			res.send(response);
		})
		.catch(error => {
			console.log("ERROR:", error);
			res.send(error);
		})
})

export default router;