const router = require('express').Router();
const { User } = require('../models/users');
const bcrypt = require('bcrypt');
const Post = require('../models/posts');
const { isValidObjectId } = require('mongoose');



router.get('/:id', async(req, res) => {
    if (!isValidObjectId(req.params.id)) return res.status(400).send(" invalid id");

    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(400).send('can not find any user with this id');
        const { password, ...Other } = user._doc;
        return res.status(200).send(Other);
    } catch (error) {
        res.status(500).send('something went wrong');
    }
});


router.put('/:id', async(req, res) => {
    if (!isValidObjectId(req.params.id)) return res.status(400).send(" invalid id");

    try {
        const user = await User.findById(req.params.id);
        const match = await bcrypt.compare(req.body.password, user.password);
        if (!user) return res.status(400).send("user with this id does not exist");
        if (!match) return res.status(403).send("wrong password");
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
        const updateUser = await User.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        return res.status(200).send(updateUser);

    } catch (error) {
        return res.status(500).send(error);
    }


});

router.delete('/:id', async(req, res) => {
    const isUser = await User.findById(req.params.id);
    if (!isUser) return res.status(401).send('user not found');
    if (!(await bcrypt.compare(req.body.password, isUser.password))) return res.send(401).send('wrong password');
    try {
        await Post.deleteMany({ author: req.params.id });
        await User.findByIdAndDelete(req.params.id);
        return res.status(200).send("deleted");

    } catch (error) {
        return res.status(500).send(error);
    }
});

module.exports = router;