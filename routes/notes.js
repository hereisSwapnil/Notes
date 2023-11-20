const express = require('express');
const router = express.Router();

router.get('/notes', (req, res) => {
    res.send('This is will get notes');
});

module.exports = router;