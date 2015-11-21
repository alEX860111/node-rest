module.exports.castError = function(err, req, res, next) {
	if (err.name === "CastError" && err.kind === "ObjectId") {
		res.status(400).end("CastError");
	} else {
		next(err);
	}
};

module.exports.validationError = function(err, req, res, next) {
	if (err.name === "ValidationError") {
		res.status(400).end("ValidationError");
	} else {
		next(err);
	}
};

module.exports.serverError = function(err, req, res, next) {
	res.status(500).end("Internal Server Error");
};
