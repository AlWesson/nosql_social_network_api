const {User, Thought} = require('../models');


module.exports = {

    // get all users
    getAllUsers(req, res) {
        User.find({})
        .then(user => res.json(user))
        .catch(err => res.status(500).json(err));
    },

    // get a user by id
    getSingleUser(req, res) {
        User.findOne({_id: req.params.userId})
        .populate('thoughts')
        .populate('friends')
        .select('-__v')
        .then(user => {
            if(!user){
                return res.status(404).json({message: 'User not found'});
            }
            res.json(userData);
        })
        
        .catch(err => res.status(500).json(err));
    },

    // create a user
    createUser(req, res) {
        User.create(req.body)
        .then(user => res.json(user))
        .catch(err => res.status(500).json(err));
    },

    // update a user
    updateUser(req, res) {
        User.findOneAndUpdate(
            {_id: req.params.userId}, 
            {$set: req.body}, 
            { new: true}
            )
        .then(user => {
            if(!user) {
                return res.status(404).json({message: "User was not found"})
            }
            res.json(user);
        })
        .catch(err => res.status(500).json(err));
    },

    // delete a user by getting their id
    deleteUser(req, res) {
        User.findOneAndDelete({_id: req.params.userId})
        .then(user => {
            if(!user){
                return res.status(404).json({message: 'User was not found'})
            }
            Thought.deleteMany({ _id: {$in: user.thoughts}});
        })
        .then(() => res.json({message: "User and belongings deleted."}))
        .catch(err => res.status(500).json(err));
    },

    // add a user as a friend
    addUser_Friend(req, res) {
        User.findOneAndUpdate(
            {_id: req.params.userId},
            {$addToSet: {friends: req.params.friendId}},
            {new: true}
        ).then(user => {
            if(!user) {
                return res.status(404).json({message: 'User was not found'});
            }
            res.json(user);
        })
        .catch(err => res.status(500).json(err));
    },

    // Remove user from friend list
    removeUser_Friend(req, res) {
        User.findOneAndUpdate(
            {_id: req.params.userId},
            {$pull: {friends: req.params.friendId}},
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

