const url = "mongodb://localhost:27017/test";

var mongoose = require("mongoose");

var connection = mongoose.connect(url).connection;

connection.on("error", function(e) {
	console.log(e);
});

connection.once("open", function() {
	var app = require("./modules/app");

	var server = app.listen(3000, function() {
		console.log("Listening on port %d", server.address().port);
	});
});
