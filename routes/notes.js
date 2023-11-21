const express = require('express');
const router = express.Router();

router.get('/makenew', (req, res) => {
    res.render('./notePages/index.ejs')
});

router.get('/addnote', (req, res) => {
    res.render('./notePages/addNote.ejs')
});

router.get('/editnote', (req, res) => {
    res.render('./notePages/editNote.ejs')
});

router.get('/search', (req, res) => {
    res.render('./notePages/search.ejs')
});

module.exports = router;