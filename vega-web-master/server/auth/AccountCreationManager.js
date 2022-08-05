import {signup} from '../services/LoginRequestAPI.js';

function signupModule(req, res) {
	if (req.method == 'POST') {
    	const userInfo = req.body;
    	signup(`http://${process.env.API_URL}/venus/register`, userInfo)
    		.then(response => {
    			res.send(response);
    		})
    		.catch(error => {
    			console.log("ERROR:", error);
    			res.send(error);
    		})
    }
}

export default signupModule;