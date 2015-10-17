var ObjectID = require("mongodb").ObjectID;
var databaseService = require("./databaseService");

var database = databaseService.getDatabase();
var collection = database.collection("products");

function createId(id) {
	try {
		return ObjectID.createFromHexString(id);
	} catch (e) {
		return undefined;
	}
}

module.exports.insertProduct = function(product) {
	return collection.insert(product);
};

module.exports.findProduct = function(id) {
	var objectID = createId(id);
	if (objectID) {
		return collection.findOne({
			"_id": objectID
		});
	}
	return Promise.reject("Invalid ID");
};

module.exports.findProducts = function() {
	return collection.find().toArray();
};

module.exports.deleteProduct = function(id) {
	var objectID = createId(id);
	if (objectID) {
		return collection.deleteOne({
			"_id": objectID
		});
	}
	return Promise.reject("Invalid ID");
};
