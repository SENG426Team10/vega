import { doPostFile, doGet } from './HTTPRequestAPI.js';

export function fetchAllSecrets(url, headers) {
	console.log(headers);
	return doGet(url, headers['authorization'])
}

export function fetchUserSecrets(url, headers) {
	console.log(headers);
	console.log(url);
	return doGet(url, headers['authorization'])
}