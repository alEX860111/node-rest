describe("app", function() {
	var request, productDao, appSUT;

	beforeEach(function() {
		request = require("supertest");
	});

	beforeEach(function() {
		productDao = jasmine.createSpyObj("productDao", ["insertProduct", "findProduct", "findProducts", "deleteProduct"]);
	});

	beforeEach(function() {
		var proxyquire = require("proxyquire").noCallThru();
		var product = proxyquire("../modules/routes/product", {
			"../productDao": productDao
		});
		appSUT = proxyquire("../modules/app", {
			"./routes/product": product
		});
	});

	describe("GET '/products/:id'", function() {
		it("OK", function(done) {
			var product = {
				name: "iphone"
			};
			productDao.findProduct.and.returnValue(Promise.resolve(product));

			request(appSUT)
				.get("/products/1")
				.end(function(err, res) {
					expect(err).toEqual(null);
					expect(res.status).toEqual(200);
					expect(res.headers["content-type"]).toEqual("application/json");
					expect(res.body).toEqual(product);
					expect(productDao.findProduct).toHaveBeenCalledWith("1");
					done();
				});
		});
		it("NOT FOUND", function(done) {
			productDao.findProduct.and.returnValue(Promise.resolve(null));

			request(appSUT)
				.get("/products/1")
				.end(function(err, res) {
					expect(err).toEqual(null);
					expect(res.status).toEqual(404);
					expect(res.headers["content-type"]).toBeUndefined();
					expect(res.body).toEqual({});
					expect(productDao.findProduct).toHaveBeenCalledWith("1");
					done();
				});
		});
		it("BAD REQUEST", function(done) {
			productDao.findProduct.and.returnValue(Promise.reject("my error"));

			request(appSUT)
				.get("/products/1")
				.end(function(err, res) {
					expect(err).toEqual(null);
					expect(res.status).toEqual(400);
					expect(res.headers["content-type"]).toBeUndefined();
					expect(res.body).toEqual({});
					expect(res.text).toEqual("my error");
					expect(productDao.findProduct).toHaveBeenCalledWith("1");
					done();
				});
		});
	});

	describe("GET '/products'", function() {
		it("OK", function(done) {
			var products = [{}];
			productDao.findProducts.and.returnValue(Promise.resolve(products));

			request(appSUT)
				.get("/products")
				.end(function(err, res) {
					expect(err).toEqual(null);
					expect(res.status).toEqual(200);
					expect(res.headers["content-type"]).toEqual("application/json");
					expect(res.body).toEqual(products);
					expect(productDao.findProducts).toHaveBeenCalled();
					done();
				});
		});
	});

});
