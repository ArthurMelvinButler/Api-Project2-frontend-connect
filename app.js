const bodyParser = require('body-parser');
const express = require('express');
const session = require('express-session');
const app = express();

app.use(session({
	secret: 'Arigato22',
	resave: false,
	saveUninitialized: true 
}))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');

const routeHome = require("./routes/Bzhome");
const routeLogin = require("./routes/login");

app.use("/home", routeBzHome);
app.use("/login", routeLogin);

app.get('/', function (request, response) {
	if (request.session.userid) {
		console.log("Session found: " + request.session.userid);
		response.redirect("home");
	} else {
		console.log("Session NOT found");
		response.redirect("login");
	}
});

app.get('/logout', (request, response) => {
	request.session.destroy();
	response.redirect("login");
});

app.get('/basic-table', function (request, response) {
	console.log("showing tables");
	response.redirect("basic-table");
});

app.get('*', function (request, response) {

	response.render("home-resource");
});


var server = app.listen(8040, function () {
	console.log("app running and listening on port %s", server.address().port);
});


