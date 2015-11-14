var productDao = require("../productDao");

module.exports.insert = function(req, res) {
	productDao.insertProduct(req.body).then(function(product) {
		res.setHeader("Location", req.protocol + "://" + req.headers.host + req.originalUrl + "/" + product._id);
		res.status(201).end();
	}, function(error) {
		console.log(error);
		res.status(400);
		res.end(error.message);
	});
};

module.exports.find = function(req, res) {
	productDao.findProduct(req.params.id).then(function(product) {
		if (!product) {
			res.status(404).end();
		}
		res.setHeader("Content-Type", "application/json");
		res.end(JSON.stringify(product));
	}, function(errorMessage) {
		res.status(400).end(errorMessage);
	});
};

module.exports.findAll = function(req, res) {
	productDao.findProducts().then(function(products) {
		res.setHeader("Content-Type", "application/json");
		res.end(JSON.stringify(products));
	});
};

module.exports.delete = function(req, res) {
	productDao.deleteProduct(req.params.id).then(function(result) {
		if (result.deletedCount === 0) {
			res.status(404).end();
		}
		res.status(200).end();
	}, function(errorMessage) {
		res.status(400).end(errorMessage);
	});
};
