"use strict";

var dao = require("../modules/objectStore.js");

describe("objectStore", function() {

	var myobject;

	beforeEach(function() {
		dao.clear();
		myobject = {
			name: "My cool object",
		};
	});

	describe("save", function() {
		it("should save an object", function() {
			var id = dao.save(myobject);
			expect(id).toEqual(0);
		});
	});

	describe("update", function() {
		it("should sucessfully update an object", function() {
			var id = dao.save(myobject);
			var updateResult = dao.update(id, {
				name: "new name"
			});
			expect(updateResult).toEqual(true);
			expect(dao.get(id)).toEqual({
				name: "new name"
			});
		});
		it("should return false if object not found", function() {
			var id = dao.save(myobject);
			var updateResult = dao.update(42, {
				name: "new name"
			});
			expect(updateResult).toEqual(false);
			expect(dao.get(id)).toEqual(myobject);
		});
	});

	describe("get", function() {
		it("should return an object", function() {
			var id = dao.save(myobject);
			expect(dao.get(id)).toEqual(myobject);
		});
		it("should return undefined for an unknown id", function() {
			dao.save(myobject);
			expect(dao.get(42)).toBeUndefined();
		});
	});

	describe("getAll", function() {
		it("should return an array of objects", function() {
			expect(dao.getAll().length).toEqual(0);
			dao.save(myobject);
			var objects = dao.getAll();
			expect(objects[0]).toEqual(myobject);
			expect(objects.length).toEqual(1);
		});
	});

	describe("remove", function() {
		it("should remove the correct object", function() {
			var id = dao.save(myobject);
			var removed = dao.remove(id);
			expect(removed).toEqual(true);
			expect(dao.getAll().length).toEqual(0);
		});
	});

});
