describe("productService", function() {

	var product;

	var objectStore;

	var productServiceSUT;

	beforeEach(function() {
		product = {};
		objectStore = jasmine.createSpyObj("objectStore", ["save", "get", "getAll"]);
	});

	beforeEach(function() {
		var proxyquire = require("proxyquire");
		productServiceSUT = proxyquire("../modules/productService.js", {
			"./objectStore": objectStore
		});
	});

	it("saveProduct", function() {
		objectStore.save.and.returnValue(0);
		var id = productServiceSUT.saveProduct(product);
		expect(id).toEqual(0);
		expect(objectStore.save).toHaveBeenCalledWith(product);
		expect(objectStore.save.calls.count()).toEqual(1);
	});

	it("getProduct", function() {
		objectStore.get.and.returnValue(product);
		var product = productServiceSUT.getProduct(0);
		expect(product).toEqual(product);
		expect(objectStore.get).toHaveBeenCalledWith(0);
		expect(objectStore.get.calls.count()).toEqual(1);
	});

	it("getProducts", function() {
		objectStore.getAll.and.returnValue([]);
		var products = productServiceSUT.getProducts();
		expect(products).toEqual([]);
		expect(objectStore.getAll).toHaveBeenCalledWith();
		expect(objectStore.getAll.calls.count()).toEqual(1);
	});

});
