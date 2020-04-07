const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    userName: String,
    password: String,
    favourites: []
}, {
    timestamps: true
});

module.exports = mongoose.model('User', UserSchema);