var express = require("express");
var app = express();
const port = 3000;

var bodyParser = require("body-parser");
app.use(bodyParser.json());

var productService = require("./modules/productService");

app.post("/products", function(req, res) {
	console.log(req.body);
	var id = productService.saveProduct(req.body);
	res.setHeader("Location", req.protocol + "://" + req.hostname + ":" + port + req.originalUrl + "/" + id);
	res.status(201).end();
});

app.get("/products/:id", function(req, res) {
	var product = productService.getProduct(req.params.id);
	res.setHeader("Content-Type", "application/json");
	res.end(JSON.stringify(product));
});

app.get("/products", function(req, res) {
	var products = productService.getProducts();
	res.setHeader("Content-Type", "application/json");
	res.end(JSON.stringify(products));
});

var server = app.listen(port, function() {
	console.log("Listening on port %d", server.address().port);
});
