var databaseService = require("./modules/databaseService");

databaseService.connect().then(function() {
	var conf = require("./modules/conf");
	var app = require("./modules/app");

	var server = app.listen(conf.port, function() {
		console.log("Listening on port %d", server.address().port);
	});

});
