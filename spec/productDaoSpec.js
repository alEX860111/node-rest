describe("productDao", function() {

	var ObjectID, mongodb, promise, cursor, collection, database, databaseService, productDaoSUT;

	beforeEach(function() {
		ObjectID = jasmine.createSpyObj("ObjectID", ["createFromHexString"]);
	});

	beforeEach(function() {
		mongodb = jasmine.createSpy("mongodb");
		mongodb.ObjectID = ObjectID;
	});

	beforeEach(function() {
		promise = jasmine.createSpy("promise");
	});

	beforeEach(function() {
		cursor = jasmine.createSpyObj("cursor", ["toArray"]);
		cursor.toArray.and.returnValue(promise);
	});

	beforeEach(function() {
		collection = jasmine.createSpyObj("collection", ["insert", "findOne", "find", "deleteOne"]);
	});

	beforeEach(function() {
		database = jasmine.createSpyObj("database", ["collection"]);
		database.collection.and.returnValue(collection);
	});

	beforeEach(function() {
		databaseService = jasmine.createSpyObj("databaseService", ["getDatabase"]);
		databaseService.getDatabase.and.returnValue(database);
	});

	beforeEach(function() {
		var proxyquire = require("proxyquire");
		productDaoSUT = proxyquire("../modules/productDao.js", {
			"mongodb": mongodb,
			"./databaseService": databaseService
		});
	});

	it("'products' collection is use", function() {
		expect(databaseService.getDatabase.calls.count()).toEqual(1);
		expect(database.collection).toHaveBeenCalledWith("products");
	});

	it("saveProduct", function() {
		collection.insert.and.returnValue(promise);
		var product = {};

		var result = productDaoSUT.insertProduct(product);

		expect(result).toBe(promise);
		expect(collection.insert).toHaveBeenCalledWith(product);
	});

	describe("getProduct", function() {
		it("should find the product if the id is valid", function() {
			ObjectID.createFromHexString.and.returnValue(42);
			collection.findOne.and.returnValue(promise);

			var result = productDaoSUT.findProduct("id");

			expect(result).toBe(promise);
			expect(ObjectID.createFromHexString).toHaveBeenCalledWith("id");
			expect(collection.findOne).toHaveBeenCalledWith({
				"_id": 42
			});
		});
		it("should not find the product if the id is invalid", function(done) {
			ObjectID.createFromHexString.and.throwError();

			var result = productDaoSUT.findProduct("id");

			result.then(null, function(msg) {
				expect(msg).toEqual("Invalid ID");
				done();
			});
			expect(ObjectID.createFromHexString).toHaveBeenCalledWith("id");
			expect(collection.findOne).not.toHaveBeenCalled();
		});
	});

	it("getProducts", function() {
		collection.find.and.returnValue(cursor);

		var result = productDaoSUT.findProducts();

		expect(result).toBe(promise);
		expect(collection.find).toHaveBeenCalled();
		expect(cursor.toArray).toHaveBeenCalled();
	});

	describe("deleteProduct", function() {
		it("should delete the product if the id is valid", function() {
			ObjectID.createFromHexString.and.returnValue(42);
			collection.deleteOne.and.returnValue(promise);

			var result = productDaoSUT.deleteProduct("id");

			expect(result).toBe(promise);
			expect(ObjectID.createFromHexString).toHaveBeenCalledWith("id");
			expect(collection.deleteOne).toHaveBeenCalledWith({
				"_id": 42
			});
		});
		it("should not delete the product if the id is invalid", function(done) {
			ObjectID.createFromHexString.and.throwError();

			var result = productDaoSUT.deleteProduct("id");

			result.then(null, function(msg) {
				expect(msg).toEqual("Invalid ID");
				done();
			});
			expect(ObjectID.createFromHexString).toHaveBeenCalledWith("id");
			expect(collection.deleteOne).not.toHaveBeenCalled();
		});
	});

});
