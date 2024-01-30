const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');
const config = require('config');
const Joi = require('joi');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50,
        unique: true
    },
    email: {
        type: String, 
        required: true,
        minlength: 5,
        maxlength: 255,
    },
    password: {
        type: String,
        required:true,
        minlength: 5,
        maxlength: 255,
    }
});

userSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({
            _id : this.id,
            username : this.username,
            email: this.email,
        },
        config.get('jwtPrivateKey')
    );
    return token;
}

const User = mongoose.model('User', userSchema);

const validateUser = (user) => {
    const schema = Joi.object({
        username: Joi.string()
                     .min(3)
                     .max(50)
                     .required(),
        email: Joi.string()
                  .min(5)
                  .max(255)
                  .required(),
        password: Joi.string()
                     .min(5)
                     .max(255)
                     .required()
    })
    return schema.validate(user);
}

exports.User = User;
exports.validate = validateUser;