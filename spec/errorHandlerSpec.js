describe("errorHandler", function() {

	var errorHandlerSUT;

	var result;

	var next;

	beforeEach(function() {
		errorHandlerSUT = require("../modules/errorHandler");
	});

	beforeEach(function() {
		result = jasmine.createSpyObj("result", ["status", "end"]);
		result.status.and.returnValue(result);
	});

	beforeEach(function() {
		next = jasmine.createSpy("next");
	});

	describe("castError", function() {
		it("should be a function", function() {
			expect(typeof errorHandlerSUT.castError).toEqual("function");
		});

		it("should handle the error", function() {
			var error = {
				name: "CastError",
				kind: "ObjectId"
			};
			errorHandlerSUT.castError(error, null, result, next);
			expect(result.status).toHaveBeenCalledWith(400);
			expect(result.end).toHaveBeenCalledWith("CastError");
			expect(next).not.toHaveBeenCalled();
		});

		it("should call next", function() {
			var error = {};
			errorHandlerSUT.castError(error, null, result, next);
			expect(result.status).not.toHaveBeenCalled();
			expect(result.end).not.toHaveBeenCalled();
			expect(next).toHaveBeenCalledWith(error);
		});
	});

	describe("validationError", function() {
		it("should be a function", function() {
			expect(typeof errorHandlerSUT.validationError).toEqual("function");
		});

		it("should handle the error", function() {
			var error = {
				name: "ValidationError"
			};
			errorHandlerSUT.validationError(error, null, result, next);
			expect(result.status).toHaveBeenCalledWith(400);
			expect(result.end).toHaveBeenCalledWith("ValidationError");
			expect(next).not.toHaveBeenCalled();
		});

		it("should call next", function() {
			var error = {};
			errorHandlerSUT.validationError(error, null, result, next);
			expect(result.status).not.toHaveBeenCalled();
			expect(result.end).not.toHaveBeenCalled();
			expect(next).toHaveBeenCalledWith(error);
		});
	});

	describe("serverError", function() {
		it("should be a function", function() {
			expect(typeof errorHandlerSUT.serverError).toEqual("function");
		});

		it("should call next", function() {
			var error = {};
			errorHandlerSUT.serverError(error, null, result, next);
			expect(result.status).toHaveBeenCalledWith(500);
			expect(result.end).toHaveBeenCalledWith("Internal Server Error");
			expect(next).not.toHaveBeenCalled();
		});
	});

});
