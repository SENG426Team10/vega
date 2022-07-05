import express from 'express';
import { fetchAllSecrets, fetchUserSecrets, uploadSecret } from '../services/VaultAPI.js';

let router = express();

router.use(bodyParser.json({ 'limit': '20mb' }));

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

router.post("/uploadsecret", (req, res) => {
	var secretData = req.body;
	console.log("Entered into secret uploader", secretData)
	uploadSecret(`http://${process.env.API_URL}/venus/vault/uploadsecret`, secretData, req.headers)
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