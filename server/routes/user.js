const express = require('express');
const router = express.Router();
const {User, validate} = require('../models/user');
const _ = require("lodash");
const bcrypt = require('bcrypt')


// register function
router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ username: req.body.username });
    if (user) return res.status(400).send("User already registered.");

    user = new User(_.pick(req.body, ['username', 'email', 'password']))
    const salt = await bcrypt.genSalt(process.env.SALT);
    console.log('salt : '+ salt);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();

    const token = user.generateAuthToken();
    res.header('x-auth-token', token)
       .send(_.pick(user, ['_id', "username", "email"]));

})

router.get('/', (req, res) => {
    // const { error } = validate(req.body);
    // if (error) return res.status(400).send(error.details[0].message);
    res.send("test")
})

module.exports = router;