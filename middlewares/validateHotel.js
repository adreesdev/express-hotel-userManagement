const { validate } = require("../modals/hotel");

function validateHotel(req, res, next) {
	console.log(req.body);
	let { error } = validate(req.body);
	if (error) return res.status(400).send(error.details[0].message);
	next();
}

module.exports = validateHotel;
