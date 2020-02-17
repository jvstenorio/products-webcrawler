const router = require('express').Router();
const { searchProducts } = require('../services/crawler');
router.post('/', async (req, res) => {
    if (!req.body || !req.body.search || !req.body.limit) {
        return res.status(400).send("Invalid request parameters");
    }
    try {
        var products = await searchProducts(req.body.search, req.body.limit);
        res.json(products);
    } catch (err) {
        Console.error(err);
        return res.status(500).send(JSON.stringify(err));
    }
});

module.exports = router;