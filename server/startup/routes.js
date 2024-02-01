const express = require('express')
const auth = require('../routes/auth');
const user = require('../routes/user');
const post = require('../routes/posts');

module.exports = function(app) {
    app.use(express.json({limit: '50mb'}));
    app.use(express.urlencoded({limit: '50mb'}));
    app.use('/api/auth', auth);
    app.use('/api/user', user);
    app.use('/api/post', post)
}