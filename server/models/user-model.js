const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    userName: String,
    password: String,
    loggedIn: Boolean,
    favourites: []
}, {
    timestamps: true
});

module.exports = mongoose.model('User', UserSchema);