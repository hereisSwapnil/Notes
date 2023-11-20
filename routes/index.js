const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('../views/navPages/index.ejs')
});

router.get('/about', (req, res) => {
    res.render('../views/navPages/about.ejs')
});

module.exports = router;