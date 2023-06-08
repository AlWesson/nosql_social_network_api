const {User} = require('../models');

module.exports = {

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

    // update a user
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

    // delete a user by getting their id
    deleteUser(req, res) {
        User.findOneAndDelete(req.params.id)
        .then(userData => {
            if(!userData){
                return res.status(404).json({message: 'User was not found'})
            }
            res.json(userData, {message: "User deleted"});
        })
        .catch(err => res.status(500).json(err));
    },

    // add a user as a friend
    addUser_Friend(req, res) {
        User.findOneAndUpdate(
            {_id: req.params.userId},
            {$addToSet: {friends: req.params.friendId}},
            {new: true}
        ).then(userData => {
            if(!userData) {
                return res.status(404).json({message: 'User was not found'});
            }
            res.json(userData);
        })
        .catch(err => res.status(500).json(err));
    },

    // Remove user from friend list
    removeUser_Friend(req, res) {
        User.findOneAndUpdate(
            {_id: req.params.userId},
            {$pull: {friends: params.friendId}},
            {new: true}
        ).then(userData => {
            if(!userData){
                return res.status(404).json({message: 'User was not found'});
            }
            res.json(userData);
        
        
        })
        .catch(err => res.status(500).json(err));
    },
};