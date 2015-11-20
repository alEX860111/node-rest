var productDao = require("../productDao");

module.exports.insert = function(req, res, next) {
	productDao.insertProduct(req.body).then(function(product) {
		res.setHeader("Location", req.protocol + "://" + req.headers.host + req.originalUrl + "/" + product._id);
		res.status(201).end();
	}, function(error) {
		next(error);
	});
};

module.exports.find = function(req, res, next) {
	productDao.findProduct(req.params.id).then(function(product) {
		if (!product) {
			res.status(404).end();
		}
		res.setHeader("Content-Type", "application/json");
		res.end(JSON.stringify(product));
	}, function(error) {
		next(error);
	});
};

module.exports.findAll = function(req, res, next) {
	productDao.findProducts().then(function(products) {
		res.setHeader("Content-Type", "application/json");
		res.end(JSON.stringify(products));
	}, function(error) {
		next(error);
	});
};

module.exports.delete = function(req, res, next) {
	productDao.deleteProduct(req.params.id).then(function(product) {
		if (product) {
			res.status(200).end();
		}
		res.status(404).end();
	}, function(error) {
		next(error);
	});
};
