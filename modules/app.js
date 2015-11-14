var express = require("express");
var app = express();

var bodyParser = require("body-parser");
app.use(bodyParser.json());

var product = require("./routes/product");

app.post("/products", product.insert);

app.get("/products/:id", product.find);

app.get("/products", product.findAll);

app.delete("/products/:id", product.delete);

module.exports = app;
