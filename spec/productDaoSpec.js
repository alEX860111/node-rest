describe("productDao", function() {

	var Product, productProtoype, mongoose, productDaoSUT;

	beforeEach(function() {
		Product = jasmine.createSpy("Product");
		productProtoype = jasmine.createSpyObj("productProtoype", ["save"]);
		Product.prototype = productProtoype;
	});

	beforeEach(function() {
		mongoose = jasmine.createSpyObj("mongoose", ["model"]);
		mongoose.model.and.returnValue(Product);
	});

	beforeEach(function() {
		var proxyquire = require("proxyquire").noCallThru();
		productDaoSUT = proxyquire("../modules/productDao.js", {
			"mongoose": mongoose
		});
	});

	describe("construction of the module", function() {
		it("should create a mongoose model", function() {
			expect(mongoose.model).toHaveBeenCalledWith("Product", {
				name: {
					type: String,
					required: true
				}
			});
		});
	});

	describe("inserProduct", function() {
		it("should call save", function() {
			var product = {};
			productDaoSUT.insertProduct(product);
			expect(Product).toHaveBeenCalledWith(product);
			expect(productProtoype.save).toHaveBeenCalled();
		});
	});

});
