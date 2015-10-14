var MongoClient = require("mongodb").MongoClient;

const url = "mongodb://localhost:27017/test";

var database;

module.exports.connect = function() {
	if (database) {
		throw new Error("already connected to database");
	}
	return MongoClient.connect(url).then(function(db) {
		database = db;
		console.log("connected to " + url);
	});
};

module.exports.getDatabase = function() {
	if (!database) {
		throw new Error("not connected to database");
	}
	return database;
};
