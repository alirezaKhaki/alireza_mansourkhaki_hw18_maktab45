const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;
const validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};
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
        trim: true,
        lowercase: true,
        required: 'Email address is required',
        validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
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

users.pre('findOneAndUpdate', async function(next) {
    if (this._update.password) {

        this._update.password = await bcrypt.hash(this._update.password, 10)
    } else {
        return next();
    }
})


module.exports = mongoose.model('User', users);