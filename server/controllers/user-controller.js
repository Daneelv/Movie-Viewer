const User = require('../models/user-model.js');
const jwt = require('jsonwebtoken');

exports.login = (req, res) => {
  // Validate request
  if (!req.body.userName || !req.body.password) {
    return res.status(400).send({
      err: true,
      message: 'Username and password required',
    });
  }

  User.findOne(
    { userName: req.body.userName, password: req.body.password },
    (err, user) => {
      if (err) {
        return res.status(400).send({
          err: true,
          message: 'Error: With Find User: Something went wrong',
        });
      }
      //Check if UserName already exists
      if (!user) {
        return res.status(400).send({
          err: true,
          message: 'Username and password combination incorrect',
        });
      }

      //user Token Auth
      jwt.sign({ user }, 'MySecretKey', (err, token) => {
        return res.json({ Id: user._id, userName: user.userName, token });
      });
    }
  );
};

// Create and Save a new user
exports.create = (req, res) => {
  // Validate request
  if (!req.body.userName) {
    return res.status(400).send({
      err: true,
      message: 'User details can not be empty',
    });
  }

  User.find({ userName: req.body.userName }, (err, userData) => {
    if (err) {
      return res.status(400).send({
        err: true,
        message: 'Error: With Find User: Something went wrong',
      });
    }

    //Check if UserName already exists
    if (userData.length) {
      return res.status(400).send({
        err: true,
        message: 'Sorry, That username has already been taken',
      });
    }

    // Create a user
    const user = new User({
      userName: req.body.userName,
      password: req.body.password,
      favourites: req.body.favourites || [],
    });

    // Save User in the database
    user
      .save()
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          err: true,
          message:
            err.message || 'Some error occurred while creating the new user.',
        });
      });
  });
};

// Retrieve and return all users from the database.
exports.findAll = (req, res) => {
  User.find()
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      res.status(500).send({
        err: true,
        message: err.message || 'Some error occurred while retrieving users.',
      });
    });
};

// Find a single user with a userId
exports.findOne = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        return res.status(400).send({
          err: true,
          message: 'User with id ' + req.params.userid + ' Not Found',
        });
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        return res.status(400).send({
          err: true,
          message: 'User with id ' + req.params.userid + ' Not Found',
        });
      }
      return res.status(500).send({
        err: true,
        message: 'Error: retrieving User with id ' + req.params.userid,
      });
    });
};

// Update favourites user identified by the userId in the request
exports.updateFavourite = (req, res) => {
  // Validate Request
  if (!req.body.movie_id) {
    return res.status(400).send({
      err: true,
      message: 'content can not be empty',
    });
  }

  //Check if movie is not already added as a favourite
  User.find({ favourites: req.body.movie_id }, (err, locations) => {
    if (err) {
      return res.status(400).send({
        err: true,
        message: 'Error: Something went wrong',
      });
    }

    if (locations.length > 0) {
      return res.status(400).send({
        err: true,
        message: 'Movie Already in Favourites',
      });
    }

    // Find User and update it with the request body
    User.findByIdAndUpdate(
      req.params.userId,
      { $push: { favourites: req.body.movie_id } },
      {
        safe: true,
        upsert: true,
        new: true,
      }
    )
      .then((user) => {
        if (!user) {
          return res.status(400).send({
            err: true,
            message: 'User not found with id ' + req.params.userId,
          });
        }
        res.send(user.favourites);
      })
      .catch((err) => {
        if (err.kind === 'ObjectId') {
          return res.status(400).send({
            err: true,
            message: 'User not found with id ' + req.params.userId,
          });
        }
        return res.status(500).send({
          err: true,
          message: 'Error: updating user with id ' + req.params.userId,
        });
      });
  });
};

// Delete a user with the specified userId in the request
exports.deleteFavourite = (req, res) => {
  // Validate Request
  if (!req.params.userId) {
    return res.status(400).send({
      err: true,
      message: 'Please pass the userId as parameter',
    });
  }

  // Find User and update it with the request body
  User.findByIdAndUpdate(
    req.params.userId,
    { $pull: { favourites: req.body.movie_id } },
    {
      safe: true,
      upsert: true,
      new: true,
    }
  )
    .then((movieId) => {
      const favourites = movieId.favourites;

      // Check to see if the movie still exists in DB, Stupid check, but it doesn't hurt 😊
      const found = favourites.find((movie_id) => {
        movie_id === req.body.movie_id;
      });

      if (typeof found !== 'undefined') {
        return res.status(400).send({
          err: true,
          message: 'Error: Could not delete movie ' + req.body.movie_id,
        });
      } else {
        res.send(JSON.stringify(req.body.movie_id));
      }
    })
    .catch((err) => {
      console.log(err);

      if (err.kind === 'ObjectId') {
        return res.status(400).send({
          err: true,
          message: 'User not found with id ' + req.params.userId,
        });
      }
      return res.status(500).send({
        err: true,
        message:
          'Error: Could not delete movie out of database, please investigate',
      });
    });
};
