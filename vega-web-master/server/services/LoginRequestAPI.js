import {doPost} from './HTTPRequestAPI.js';

export function login(url, data){
	return doPost(url, data);
}

export function signup(url, data){
	return doPost(url, data);
}