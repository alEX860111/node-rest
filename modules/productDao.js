var ObjectID = require("mongodb").ObjectID;
var databaseService = require("./databaseService");

var database = databaseService.getDatabase();
var collection = database.collection("products");

module.exports.saveProduct = function(product) {
	return collection.insert(product);
};

module.exports.getProduct = function(id) {
	var objectID;
	try {
		objectID = ObjectID.createFromHexString(id);
	} catch (e) {
		return Promise.reject(e.message);
	}
	return collection.findOne({
		"_id": objectID
	});
};

module.exports.getProducts = function() {
	return collection.find().toArray();
};
