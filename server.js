var greet = require("./modules/greet");
var productService = require("./modules/productService");
var express = require("express");
var app = express();

app.get("/products", function(req, res) {
	var products = productService.getProducts();
	res.setHeader("Content-Type", "application/json");
	res.end(JSON.stringify(products));
});

var server = app.listen(3000, function() {
	console.log('Listening on port %d', server.address().port);
});
