const {Post, validate} = require('../models/post');
const auth = require('../middleware/auth');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const _ = require("lodash");


router.get('/', auth, async (req, res) => {
    const posts = await Post.find();
    console.log(posts)
    res.send(posts);
})

router.get('/:category', auth, async (req, res) => {
    const category = req.params.category;
    const posts = await Post.find({cat : category });
    res.send(posts);
})


router.post('/', auth, async (req, res) => {
    console.log(req.body);
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const post = new Post(_.pick(req.body, ['title', 'desc', 'img', 'userImg', 'date', 'cat', 'username']))
    await post.save();

    res.send('Post upload successful.');

})

module.exports = router;