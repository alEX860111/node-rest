var mongoose = require("mongoose");
var Product = mongoose.model("Product", {
	name: {
		type: String,
		required: true
	}
});

module.exports.insertProduct = function(product) {
	return new Product(product).save();
};

module.exports.findProduct = function(id) {
	return Product.findById(id).exec();
};

module.exports.findProducts = function() {
	return Product.find().exec();
};

module.exports.deleteProduct = function(id) {
	return Product.findByIdAndRemove(id).exec();
};
