var productServiceMongo = require("./productServiceMongo");

var express = require("express");
var app = express();
const port = require("./conf").port;

var bodyParser = require("body-parser");
app.use(bodyParser.json());

app.post("/products", function(req, res) {
	var product = req.body;
	productServiceMongo.saveProduct(req.body).then(function() {
		res.setHeader("Location", req.protocol + "://" + req.hostname + ":" + port + req.originalUrl + "/" + product._id);
		res.status(201).end();
	});
});

app.get("/products/:id", function(req, res) {
	productServiceMongo.getProduct(req.params.id).then(function(product) {
		if (!product) {
			res.status(404).end();
		}
		res.setHeader("Content-Type", "application/json");
		res.end(JSON.stringify(product));
	}, function(errorMessage) {
		res.status(400).end(errorMessage);
	});
});

app.get("/products", function(req, res) {
	productServiceMongo.getProducts().then(function(products) {
		res.setHeader("Content-Type", "application/json");
		res.end(JSON.stringify(products));
	});
})

module.exports = app;
