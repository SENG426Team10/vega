import {doPost} from '../BaseAPI.js';

export function login(userInfo){
	console.log("In Auth", userInfo);
	return doPost("http://localhost:8000/api/login", userInfo);
}

export function signup(userInfo){
	console.log("Sign Up", userInfo);
	return doPost("http://localhost:8000/api/signup", userInfo);
}