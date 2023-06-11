

const { Thought, User, Reaction } = require('../models');
// const {Types} = require('mongoose');

module.exports = {


    // get all thoughts
    gatherThoughts(req, res){
        Thought.find({})
        .then(thought => res.json(thought))
        .catch(err => {res.status(500).json(err)});
    },
    // get a single thought
    getAThought(req, res){
        Thought.findOne({_id: req.params.thoughtId})
        .select('-__v')
        .then(thought => {
            if(!thought) {
                return res.status(404).json({message: "Thought not found"});
            }
            res.json(thought);
        })
        .catch(err => res.status(400).json(err));
    },
    
    createThought(req, res){
        Thought.create(req.body)
        .then(({_id}) => {
            return User.findOneAndUpdate(
                {_id: req.body.userId},
                {$push: {thoughts: _id}},
                {new: true}
            );
        })
        .then(thought => {
            if(!thought){
                return res.status(404).json({message: "User not found"});
            }
            res.json(thought);
        })
        .catch(err => res.status(500).json(err))

        
    },

    updateThought(req, res){
        Thought.findOneAndUpdate(
            {_id: req.params.thoughtId},
            {$set: req.body},
            {runValidators: true, new: true}
        )
        .then(user => {
            if(!user){
                return res.status(404).json({message: "Thought was not found"});
            }
            res.json(user);
        })
        .catch(err => res.status(500).json(err));
    },

    deleteThought(req, res){ 
        Thought.findOneAndDelete({_id: req.params.thoughtId})
        .then(thought => {
            if(!thought){
                return res.status(404).json({message: "Thought was not found"});
            }
            User.findOneAndUpdate(
                {thoughts: req.params.thoughtId},
                {$pull: {thoughts: req.params.thoughtId}},
                {new: true}
            )
        })
        .then(user => {
            if(!user){
                return res.status(404).json({message: 'Thought deleted. Thought not tied to user'});
            }
            res.json({mesasge: "Thought deleted"});
        })
        .catch(err => res.status(500).json(err));
    },

    addReaction(req, res) {
        Thought.findOneAndUpdate(
            {_id: req.params.thoughtId},
            {$addToSet: {reactions: req.body}},
            {runValidators: true, new: true}
        )
        .then(thought => {
            if(!thought) {
                return res.status(404).json({message: 'Thought could not be found'});
            }
            res.json(thought);
        })
        .catch(err => res.status(500).json(err));
    },

    removeReaction(req, res) {
        Thought.findOneAndUpdate(
            {_id: req.params.thoughtId},
            {$pull: {reactions: {reactionId: req.params.reactionId}}},
            {runValidators: true, new: true}
        )
        .then(thought => {
            if(!thought){
                return res.status(404).json({message: 'Thought could not be found'});
            }
            res.json(thought);
        })
        .catch(err => res.status(500).json(err));
    }

};