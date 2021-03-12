const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const users = new schema({
    username: {
        type: string,
        required: true,
        minLength: 3,
        maxLength: 20,
        trim: true
    },
    password: {
        type: string,
        required: true,
        minLength: 3
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



module.exports = mongoose.model('User', Users);