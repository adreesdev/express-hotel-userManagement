const express = require("express");

var router = express.Router();
var { Hotel } = require("../../modals/hotel");
const validateHotel = require("../../middlewares/validateHotel");
const auth = require("../../middlewares/auth");
const admin = require("../../middlewares/admin");

// * get hotels list
router.get("/", auth, admin, async (req, res) => {
	console.log(req.user);
	let hotels = await Hotel.find();
	return res.send(hotels);
});

// * get a single hotel
router.get("/:id", async (req, res) => {
	try {
		let hotel = await Hotel.findById(req.params.id);
		if (!hotel)
			return res.status(400).send("Hotel with given id is not present");
		return res.send(hotel);
	} catch (error) {
		return res.status(400).send("Invalid ID");
	}
});

// ? update a record
router.put("/:id", validateHotel, async (req, res) => {
	let hotel = await Hotel.findById(req.params.id);
	hotel.name = req.body.name;
	hotel.location = req.body.location;
	await hotel.save();
	return res.send(hotel);
});

// ! delete a record
router.delete("/:id", async (req, res) => {
	await Hotel.findByIdAndDelete(req.params.id);
	return res.send({
		response: "Deleted successfully",
	});
});

// ? insert a record
router.post("/", async (req, res) => {
	console.log(req.body);
	let hotel = new Hotel();
	hotel.name = req.body.name;
	hotel.location = req.body.location;
	await hotel.save();
	return res.send(hotel);
});

module.exports = router;
