const router = require('express').Router();
const { isValidObjectId } = require('mongoose');
const { validate, Post } = require('../models/posts');
const { User } = require('../models/users');

router.post('/', async(req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.message);
    if (!isValidObjectId(req.body.author))
        return res.status(400).send('can not find author with this id');
    if (!(await User.findById(req.body.author)))
        return res.status(400).send('author does not exist');
    const newPost = new Post(req.body);
    try {
        return res.status(200).send(await newPost.save());
    } catch (error) {
        return res.status(500).send(error);
    }
});
router.get('/', async(req, res) => {
    if (req.query.category && req.query.author)
        return res.status(200).send(
            await Post.find({
                category: req.query.category,
                author: req.query.author,
            })
        );
    if (req.query.author)
        return res.status(200).send(await Post.find({ author: req.query.author }));
    if (req.query.category)
        return res
            .status(200)
            .send(await Post.find({ category: req.query.category }));
    try {
        const post = await Post.find();
        return res.status(200).send(post);
    } catch (error) {
        return res.status(500).send(error);
    }
});
router.get('/:id', async(req, res) => {
    if (!isValidObjectId(req.params.id))
        return res.status(400).send(' invalid id');
    try {
        const post = await Post.findById(req.params.id);
        return res.status(200).send(post);
    } catch (error) {
        return res.status(500).send(error);
    }
});
router.put('/:id', async(req, res) => {
    if (!isValidObjectId(req.params.id))
        return res.status(400).send(' invalid id');
    try {
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(400).send(' this post does not exist');
        if (post.author !== req.body.author)
            return res.status(403).send(' you are not allowed to edit');
        const newpost = await Post.findByIdAndUpdate(
            req.params.id, {
                $set: req.body,
            }, { new: true }
        );
        return res.status(200).send(newpost);
    } catch (error) {
        return res.status(500).send(error);
    }
});
router.delete('/:id', async(req, res) => {
    if (!isValidObjectId(req.params.id))
        return res.status(400).send(' invalid id');
    const post = await Post.findById(req.params.id);
    if (post.author !== req.body.author)
        return res
            .status(401)
            .send('you are not allowed to execute this operation');
    try {
        await post.delete();

        return res.status(200).send('post has been deleted');
    } catch (error) {
        return res.status(500).send(error);
    }
});

module.exports = router;