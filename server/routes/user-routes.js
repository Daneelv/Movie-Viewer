module.exports = (app) => {
    const users = require('../controllers/user-controller.js');

    // default route
    app.get('/', (req, res) => {
        res.json({ message: 'Welcome to The movie DB Database' });
    });

    // login to DB 
    app.post('/login', users.login);

    // Create a new user
    app.post('/users', users.create);

    // Retrieve all users
    app.get('/users', verifyToken, users.findAll);

    // Retrieve a single Note with noteId
    app.get('/users/:userId', verifyToken, users.findOne);

    // Update a user with userId
    app.put('/users/:userId', verifyToken, users.updateFavourite);

    // Delete a user with userId
    app.delete('/users/:userId', verifyToken, users.deleteFavourite);
}


//middleware 
//JSON WEB TOKEN
function verifyToken(req, res, next) {

    // Get Auth header val
    const bearerHeader = req.headers['authorization'];

    //Check if bearer is undifined
    if (typeof bearerHeader !== 'undefined') {

        //split at the space into array
        const bearer = bearerHeader.split(' ');

        //get token from array
        req.token = bearer[1];
        next();
    } else {
        res.status(403).send({
            message: 'Error, Access Denied'
        })
    }
};