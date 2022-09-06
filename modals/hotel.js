var mongoose = require("mongoose");
const Joi = require("joi");

var hotelSchema = mongoose.Schema({
	name: String,
	location: String,
});

var Hotel = mongoose.model("Hotel", hotelSchema);

function validateHotel(data) {
	const schema = Joi.object({
		name: Joi.string().min(3).max(20).required(),
		location: Joi.string().min(3).max(30),
	});
	return schema.validate(data, { abortEarly: false });
}

module.exports.Hotel = Hotel;
module.exports.validate = validateHotel;
