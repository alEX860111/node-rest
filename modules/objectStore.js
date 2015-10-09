var _ = require("lodash");

var objects = {};

var id = 0;

function createKey(id) {
	return "id" + id;
}

exports.save = function(object) {
	var key = createKey(id);
	objects[key] = object;
	return id++;
};

exports.get = function(id) {
	return objects[createKey(id)];
};

exports.getAll = function() {
	var result = [];
	for (key in objects) {
		result.push(objects[key]);
	}
	return result;
};

exports.update = function(id, object) {
	var key = createKey(id);
	if (objects.hasOwnProperty(key)) {
		objects[key] = object;
		return true;
	}
	return false;
};

exports.clear = function() {
	objects = {};
	return objects;
};

exports.remove = function(id) {
	var key = createKey(id);
	var returnObject = objects[key];
	delete objects[key];
	return !_.isUndefined(returnObject);
};
