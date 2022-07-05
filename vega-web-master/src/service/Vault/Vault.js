import { doPost, doGet } from '../BaseAPI.js';

export function fetchAllSecrets(token) {
	console.log("In vaultJS");
	return doGet("http://localhost:8000/api/venus/vault/getallsecrets", token)
}

export function fetchUserSecrets(username, token) {
	return doGet("http://localhost:8000/api/venus/vault/getusersecrets?username=" + username, token)
}

export function uploadSecret(secretInfo, token) {
	return doPost("http://localhost:8000/api/venus/vault/uploadsecret", secretInfo, token)
}