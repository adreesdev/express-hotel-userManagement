const express = require("express");
var bcrypt = require("bcryptjs");
var router = express.Router();
let { User } = require("../../modals/user");

const _ = require("lodash");
const jwt = require("jsonwebtoken");
const config = require("config");

router.post("/signup", async (req, res) => {
	let user = await User.findOne({ email: req.body.email });
	if (user) return res.status(400).send("User with given email already exist");
	user = new User();
	user.name = req.body.name;
	user.email = req.body.email;
	user.password = req.body.password;
	await user.generateHashedPassword();
	await user.save();
	return res.send(_.pick(user, ["name", "email"]));
});

router.post("/login", async (req, res) => {
	let user = await User.findOne({ email: req.body.email });
	if (!user) return res.status(400).send("User with given email doesn't exist");
	let isValid = await bcrypt.compare(req.body.password, user.password);
	if (!isValid) return res.status(401).send("Invalid Password");
	let token = jwt.sign(
		{ _id: user._id, name: user.name },
		config.get("jwtPrivateKey")
	);
	res.send(token);
});

module.exports = router;