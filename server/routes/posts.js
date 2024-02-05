const {Post, validate} = require('../models/post');
const auth = require('../middleware/auth');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const validateObjectId = require('../middleware/validateObjectId');
const _ = require("lodash");


router.get('/', auth, async (req, res) => {
    const posts = await Post.find();
    const selected = _.sampleSize(posts,5);
    res.send(selected);
})

router.get('/all', auth, async (req, res) => {
    const posts = await Post.find();
    res.send(posts);
})

router.get('/:category', auth, async (req, res) => {
    const category = req.params.category;
    const posts = await Post.find({cat : category });
    res.send(posts);
})


router.post('/', auth, async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const bodyData = _.pick(req.body, ['title', 'desc', 'img', 'userImg', 'date', 'cat', 'username']);
    const post = new Post(bodyData);
    await post.save();
    res.send('Post upload successful.');

})

router.put('/:id', [auth, validateObjectId], async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    console.log(req.params.id);
    Post.findByIdAndUpdate(
        req.params.id,
        _.pick(req.body, ['title', 'desc', 'img', 'userImg', 'date', 'cat', 'username']),
        {new: true}
    ).then(data => {
        res.send('Post updated successfully. ');
    })
})

router.delete('/:id', [auth, validateObjectId], async (req, res) => {
    console.log('here');
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) {
        return res.status(404).send("The post with the given ID was not found.");
    }
    res.send("Post is deleted");
})

module.exports = router;