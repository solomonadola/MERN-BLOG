const { string } = require('joi');
const mongoose = require('mongoose');
const Joi = require('joi');
const userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			minlength: 4,
		},
		userName: {
			type: String,
			required: true,
			minlength: 4,
			unique: true,
		},
		email: {
			type: String,
			required: true,
			minlength: 3,
			unique: true,
		},

		password: {
			type: String,
			requied: true,
			minlength: 6,
		},
		photo: {
			type: String,
			default: '',
			required: false,
		},
	},
	{ timestamps: true }
);

const User = mongoose.model('User', userSchema);

function validate(input) {
	const schema = Joi.object({
		name: Joi.string().min(4).required(),
		userName: Joi.string().alphanum().min(4).max(30).required(),
		email: Joi.string().email().min(3).required(),
		password: Joi.string().required(),
	});
	return schema.validate(input);
}

exports.User = User;
exports.validate = validate;
