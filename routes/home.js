const express = require('express'); //include express again for this file
const db = require("../lib/db");
const router = express.Router();

const routeLogin = require("./Bonlogin");
router.use("/Bonlogin", routeLogin);


router.get('/', async (request, response) => {
	if (request.session.userid) {
		console.log("Session found: " + request.session.userid);

		const list = await db.getResources();

		console.log(list);
		response.render("home", {resources: list});
	}else{
		response.redirect('login');
	}
});

router.get('/home', async (request, response) => {
	if (request.session.userid) {
		console.log("Session found: " + request.session.userid);

		const list = await db.getResources();

		console.log(list);
		response.render("index", {resources: list});
	}else{
		response.redirect('login');
	}
});



router.get('/:parent', async (request, response) => {
	

	if (request.session.userid) {
		response.render("home-resource");
		console.log("going to home-resource.ejs");
	}else{
		response.redirect("login");
	}
});







module.exports = router;
