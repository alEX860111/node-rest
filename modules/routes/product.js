var productDao = require("../productDao");

module.exports.insert = function(req, res, next) {
	productDao.insertProduct(req.body).then(function(product) {
		res.setHeader("Location", req.protocol + "://" + req.headers.host + req.originalUrl + "/" + product._id);
		res.sendStatus(201);
	}, function(error) {
		next(error);
	});
};

module.exports.find = function(req, res, next) {
	productDao.findProduct(req.params.id).then(function(product) {
		if (!product) {
			res.sendStatus(404);
		}
		res.json(product);
	}, function(error) {
		next(error);
	});
};

module.exports.findAll = function(req, res, next) {
	productDao.findProducts(req.query.page, req.query.perpage).then(function(products) {
		res.json(products);
	}, function(error) {
		next(error);
	});
};

module.exports.delete = function(req, res, next) {
	productDao.deleteProduct(req.params.id).then(function(product) {
		if (product) {
			res.sendStatus(200);
		}
		res.sendStatus(404);
	}, function(error) {
		next(error);
	});
};
