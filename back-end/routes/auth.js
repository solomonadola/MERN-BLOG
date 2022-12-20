const router = require('express').Router();
const { validate, User } = require('../models/users');
const bcrypt = require('bcrypt');

router.post('/register', async (req, res) => {
	const { error } = validate(req.body);
	if (error) return res.status(400).send(error.message);
	if (await User.findOne({ userName: req.body.userName })) {
		return res.status(400).send('Username "' + req.body.userName + '" is already taken');
	}
	if (await User.findOne({ email: req.body.email })) {
		return res.status(400).send('email "' + req.body.email + '" is already taken');
	}
	const newUser = new User(req.body);
	try {
		const salt = await bcrypt.genSalt(10);
		newUser.password = await bcrypt.hash(newUser.password, salt);

		const result = await newUser.save();
		return res.status(200).send(result);
	} catch (err) {
		return res.status(500).send(`something went wrong ${err})`);
	}
});

router.post('/login', async (req, res) => {
	try {
		let user = await User.findOne().or([
			{ email: req.body.usernameoremail },
			{ userName: req.body.usernameoremail },
		]);

		if (!user) return res.status(403).send('user does not exist');

		const match = await bcrypt.compare(req.body.password, user.password);
		if (!match) return res.status(403).send('username or password not match');
		const { password, ...Other } = user._doc;
		return res.send(Other);
	} catch (error) {
		return res.status(500).send('something went wrong');
	}
});

module.exports = router;
