"use strict";

var dao = require("../modules/memdb.js");

describe("memdb", function() {

	var myobject;

	beforeEach(function() {
		dao.clear();
		myobject = {
			name: "My cool object",
		};
	});

	describe(".add()", function() {
		it("should return an id", function() {
			var id = dao.add(myobject);
			expect(id).toEqual(0);
		});
	});

	describe(".update()", function() {
		it("should update the object", function() {
			var id = dao.add(myobject);
			var result = dao.update(id, {
				name: "new name"
			});
			expect(result).toEqual(true);
			expect(dao.get(id)).toEqual({
				name: "new name"
			});
		});
		it("should update the object", function() {
			var id = dao.add(myobject);
			var result = dao.update(42, {
				name: "new name"
			});
			expect(result).toEqual(false);
			expect(dao.get(id)).toEqual(myobject);
		});
	});

	describe(".get()", function() {
		it("should return the correct object", function() {
			var id = dao.add(myobject);
			expect(dao.get(id)).toEqual(myobject);
		});
		it("should return the undefined for an invalid id", function() {
			dao.add(myobject);
			expect(dao.get(42)).toBeUndefined();
		});
	});

	describe(".getAll()", function() {
		it("should return an array of objects having the correct size", function() {
			expect(dao.getAll().length).toEqual(0);
			dao.add(myobject);
			expect(dao.getAll().length).toEqual(1);
			dao.clear();
			expect(dao.getAll().length).toEqual(0);
		});
	});

	describe(".remove()", function() {
		it("should remove the correct object", function() {
			var id = dao.add(myobject);
			dao.remove(id);
			expect(dao.getAll().length).toEqual(0);
		});
		it("should return the removed object", function() {
			var id = dao.add(myobject);
			expect(dao.remove(id)).toEqual(myobject);
		});
		it("should correctly manage the ids of the remaining objects", function() {
			var idA = dao.add({});
			var idB = dao.add({});
			var idC = dao.add({});

			expect(dao.getAll().length).toEqual(3);

			dao.remove(idB);
			expect(dao.getAll().length).toEqual(2);

			dao.remove(idA);;
			expect(dao.getAll().length).toEqual(1);
		});
	});

});
