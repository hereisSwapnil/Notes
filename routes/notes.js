const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../middleware.js')
const User = require('../models/user.js');
const Note = require('../models/note.js');

router.get('/dashboard', isLoggedIn, async (req, res) => {
    let user = await User.findById(req.user._id).populate("notesCreated");
    res.render('./notePages/dashboard.ejs', { notesCreated: user.notesCreated })
});

router.get('/note', isLoggedIn, (req, res) => {
    res.render('./notePages/addNote.ejs')
});

router.get('/note/:id', isLoggedIn, async (req, res) => {
    const id = req.params.id;
    let note = await Note.findById(id)
    res.render('./notePages/editNote.ejs', { note: note })
});

router.post('/search', isLoggedIn, async (req, res) => {
    const { search } = req.body;

    try {
        const user = req.user;
        const notesCreated = user.notesCreated;
        const result = await Note.find({
            $and: [
                { _id: { $in: notesCreated } },
                {
                    $or: [
                        { title: { $regex: search, $options: 'i' } },
                        { body: { $regex: search, $options: 'i' } },
                    ],
                },
            ],
        });
        res.render('./notePages/searchNote.ejs', { result: result });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/note', isLoggedIn, async (req, res) => {
    const { title, body } = req.body;
    const newNote = new Note({ title, body });
    newNote.user = req.user;
    await newNote.save().then(async () => {
        let user = await User.findById(req.user);
        user.notesCreated.push(newNote);
        await user.save();
        res.redirect('/dashboard');
    }).catch(err => { console.log(err); })
})

router.put('/note/:id', isLoggedIn, async (req, res) => {
    const { title, body } = req.body;
    await Note.findByIdAndUpdate(req.params.id, { title, body }).then(async () => {
        res.redirect('/dashboard');
    }).catch(err => { console.log(err); })
})

router.delete('/note/:id', isLoggedIn, async (req, res) => {
    await Note.findByIdAndDelete(req.params.id).then(async () => {
        res.redirect('/dashboard');
    }).catch(err => { console.log(err); })
})

module.exports = router;