const User = require('../models/user-model.js');


// Create and Save a new user
exports.create = (req, res) => {
    // Validate request
    if (!req.body.content) {
        return res.status(400).send({
            message: "User details can not be empty"
        });
    }

    // Create a Note
    const user = new User({
        userName: req.body.userName || "Untitled User",
        password: req.body.password,
        loggedIn: req.body.loggedIn || false,
        favourites: req.body.favourites || []
    });

    // Save Note in the database
    user.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the new user."
            });
        });
};

// Retrieve and return all users from the database.
exports.findAll = (req, res) => {

};

// Find a single user with a userId
exports.findOne = (req, res) => {

};

// Update a user identified by the userId in the request
exports.update = (req, res) => {

};

// Delete a user with the specified userId in the request
exports.delete = (req, res) => {

};