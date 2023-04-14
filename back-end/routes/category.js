const router = require('express').Router();
const Category = require('../models/category');

router.post('/', async(req, res) => {
    const newCategory = new Category(req.body);

    try {
        const saveCat = await newCategory.save()
        return res.status(200).json(saveCat)
    } catch (error) {
        return res.status(500).send(error);
    }
});
router.get('/', async(req, res) => {
    try {
        const categories = await Category.find();
        return res.status(200).json(categories)
    } catch (error) {
        return res.status(500).send(error);

    }

})

module.exports = router;