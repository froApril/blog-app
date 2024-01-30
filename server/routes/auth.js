const express = require('express')
const mongoose = require('mongoose');
const { User } = require('../models/user');
const router = express.Router();
const bcrypt = require('bcrypt');
const Joi = require('joi');

// login function
router.post('/', async (req, res) => {
    const {error} = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    let user = await User.findOne({ username: req.body.username });
    if (!user) return res.status(400).send('Invalid username or password.')

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send('Invalid username or password.')

    const token = user.generateAuthToken();
    return res.send(token);
});

function validate(req) {
    const schema = Joi.object({
        username: Joi.string().min(3).max(50).required(),
        password: Joi.string().min(5).max(255).required(),
    })
    return schema.validate(req);
 }

 module.exports = router;