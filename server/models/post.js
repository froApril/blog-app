const Joi = require('joi');
const mongoose = require('mongoose');

const Post = mongoose.model('Post', new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 255,
    },
    desc: {
        type: String,
        trim: true,
        minlength: 5,
        maxlength: 255,
    },
    img: {
        type: String,
        minlength: 5,
        maxlength: 255,
    },
    userImg: {
        type: String,
        minlength: 5,
        maxlength: 255,
    },
    username: {
        type: String,
        minlength: 5,
        maxlength: 255,
    },
    date: {
        type: Date
    },
    cat: {
        type: String,
        enum: ['art', 'science', 'technology', 'cinema', 'design', 'food'],
        default: 'art',
        required: true
    }
}));

const validatePost = (post) => {
    const schema = Joi.object({
        title: Joi.string()
                  .min(5)
                  .max(255)
                  .required(),
        desc: Joi.string()
                 .min(5)
                 .max(255),
        img: Joi.string()
                .min(5)
                .max(255),
        userImg: Joi.string()
                    .min(5)
                    .max(255),
        username: Joi.string()
                     .min(5)
                     .max(255),
        date: Joi.date(),
        cat: Joi.string()
    })
    return schema.validate(post);
}

exports.Post = Post;
exports.validate = validatePost;