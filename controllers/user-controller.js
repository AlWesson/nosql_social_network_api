const {User} = require('../models');

const userController = {

    // get all users
    getAllUsers(req, res) {
        User.find({})
        .then(userData => res.json(userData))
        .catch(err => res.status(500).json(err));
    },

    // get a user by id
    getUserByID(req, res) {
        User.findById(req.params.userId)
        .then(userData => res.json(userData))
        .catch(err => res.status(500).json(err));
    },

    // create a user
    createUser(req, res) {
        User.create(req.body)
        .then(userData => res.json(userData))
        .catch(err => res.status(500).json(err));
    },
    updateUser(req, res) {
        User.findOneAndUpdate(req.params.id, req.body, { new: true})
        .then(userData => {
            if(!userData) {
                return res.status(404).json({message: "User was not found"})
            }
            res.json(userData);
        })
        .catch(err => res.status(500).json(err));
    },



}