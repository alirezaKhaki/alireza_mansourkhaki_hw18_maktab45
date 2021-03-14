const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const users = new Schema({
    username: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 20,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minLength: 3
    },
    email: {
        type: String,
        required: true,
        minLength: 3
    },
    phone: {
        type: Number,

    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

users.pre('save', function(next) {
    const user = this;
    if (this.isNew || this.isModifed('password')) {
        bcrypt.genSalt(10, function(err, salt) {
            if (err) return next(err);
            bcrypt.hash(user.password, salt, function(err, hash) {
                if (err) return next(err);

                user.password = hash;
                return next();
            });
        });
    } else {
        return next();
    };
})



module.exports = mongoose.model('User', users);