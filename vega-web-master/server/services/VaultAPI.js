import { doPost, doGet } from './HTTPRequestAPI.js';

export function fetchAllSecrets(url, headers) {
	console.log("fetching all the goods");
	console.log(headers);
	return doGet(url, headers['authorization'])
}

export function fetchUserSecrets(url, headers) {
	console.log("fetching my secrets");
	console.log(headers);
	console.log(url);
	return doGet(url, headers['authorization'])
}

export function uploadSecret(url, data, headers) {
	console.log("Spawning a secret");
	console.log(headers);
	return doPost(url, data, headers['authorization'])
}

export function deleteSecret(url, data, headers) {
	console.log("Killing a secret");
	console.log(headers);
	return doPost(url, data, headers['authorization'])
}