

const { Thought, User, reactionSchema } = require('../models');
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
    // create a thought through a specific user
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
    //edit thought
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
    // delete a user's thought
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
                return res.status(200).json({message: 'Thought deleted'});
            }
            res.json({mesasge: "Thought deleted"});
        })
        .catch(err => res.status(500).json(err));
    },
    // update thought with a reaction
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
    // update thought by removing the reaction
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