import { doPost, doGet } from './HTTPRequestAPI.js';

export function fetchAllSecrets(url, headers) {
	console.log("in VaultAPI");
	console.log(headers);
	return doGet(url, headers['authorization'])
}

export function fetchUserSecrets(url, headers) {
	console.log(headers);
	console.log(url);
	return doGet(url, headers['authorization'])
}

export function uploadSecret(url, data, headers) {
	console.log("Nowadays");
	console.log(headers);
	return doPost(url, data, headers['authorization'])
}