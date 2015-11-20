module.exports.castError = function(err, req, res, next) {
	if (err.name === "CastError" && err.kind === "ObjectId") {
		res.status(400).end("CastError");
	}
	next(err);
};

module.exports.validationError = function(err, req, res, next) {
	if (err.name === "ValidationError") {
		res.status(400).end("ValidationError");
	}
	next(err);
};

module.exports.serverError = function(err, req, res, next) {
	res.status(500).end("Internal Server Error");
};
