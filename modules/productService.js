var store = require("./objectStore");

module.exports.saveProduct = function(product) {
	return store.save(product);
};

module.exports.getProduct = function(id) {
	return store.get(id);
};

module.exports.getProducts = function() {
	return store.getAll();
};

module.exports.updateProduct = function(id, product) {
	return store.update(id, product);
};

module.exports.removeProducts = function() {
	return store.clear();
};

module.exports.removeProduct = function(id) {
	return store.remove(id);
};
