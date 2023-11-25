const axios = require('axios');
const express = require('express'); 
const router = express.Router();


router.get('/', function (request, response) {
	if (request.session.userid) {
		console.log("Session found: " + request.session.userid);
		response.redirect("home");
	} else {
		console.log("Session NOT found");
		response.render("index");
	}
	
});

router.post('/', async (request, response) => {

	
	console.log(request.body);
	

	let params = JSON.stringify(request.body);

	let config = {
		method: 'get',
		maxBodyLength: Infinity,
		url: "http://127.0.0.1:8032/ProjectAdvanceweb/Bonlogin",
		headers: {
			"Content-Type": "application/json",
			"API-KEY": "awt_[SGH<TzEer34534SGSGS468d8155a47f1ec2b38f9f129aaadb9a668dd956dae443540"
		},
		data: params
	}

	


	//----------------------
	let userID = -1;
	let username = "";
	let jsonString = "";

	try {
		const axiosResponse = await axios.request(config);
		console.log("axios response message: "+ axiosResponse.data.message);
		console.log("axios response code: "+ axiosResponse.data.rc);
		userID = axiosResponse.data.data.userid;
		username = axiosResponse.data.data.user;
		
		jsonString = JSON.stringify(axiosResponse.data);
		console.log(jsonString);
	} catch (error) {
		console.log(error);
	}
	
	request.session.userid = userID;
	request.session.username = username;
	console.log("userID: " + userID);
	console.log("user: " + username);
	console.log("session end: " + request.session.userid);
	response.send(jsonString);
});


module.exports = router;
