const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
		},
		detail: {
			type: String,
			required: true,
		},
		photo: {
			type: String,
			required: false,
		},
		author: {
			type: String,
			required: true,
		},
		category: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
);
function validate(input) {
	const schema = Joi.object({
		title: Joi.string().min(4).required(),
		detail: Joi.string().min(10).required(),
		author: Joi.string().required(),
		category: Joi.string().required(),
	});
	return schema.validate(input);
}
const Post = mongoose.model('Post', postSchema);

module.exports = Post;
