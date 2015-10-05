var proxyquire = require("proxyquire");

var message = function() {
	return "test";
};
var greet = proxyquire("../modules/greet", {
	"./message": message
});

describe("", function() {
	beforeEach(function() {});

	it("", function() {
		expect(greet()).toEqual("TEST");
	});
});
