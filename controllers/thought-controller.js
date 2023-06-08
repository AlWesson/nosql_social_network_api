const { Thought, User, Reaction} = require('../models');

module.exports = {
    
    // get all thoughts
    async gatherThoughts(req, res) {
        try{
            const thought = await Thought.find({});
            res.json(thought);
        }
        catch(err){
            res.status(500).json(err);
        }
    },
    
    // get a single thought by id
    async getOneThought(req, res) {
        try{
            const thought = await Thought.findOne({_id: req.params.thoughtId});
            if(!thought){
                return res.status(404).json({message: "Thought not found"});
            }
            res.json(thought);
        }
        catch(err){
            res.status(500).json(err);
        }
    },
    
    // create a new thought
    async createThough(req, res) {
        try{
            const thought = Thought.create(req.body);
            req.json(thought);
        }
        catch(err){
            res.status(500).json(err);
        }
    },

    // delete a thought by id
    async deleteThough(req, res){
        try{
            const thought = Thought.findByIdAndDelete({_id: req.params.thoughtId});
            res.status(200).json(thought);
        }
        catch(err){
            res.status(500).json(err);
        }
    },
    // get thought by id and update
    async updateThought(req, res){
        try{
            const thought = Thought.findByIdAndUpdate(req.params.thoughtId, req.body, {new: true});
            if(!thought){
                return res.status(404).json({message: "Thought not found"});
            }
            res.json(thought);

        }
        catch(err){
            res.status(500).json(err);
        }
    },

    // find thought by id and add reaction
    async addReaction(req, res){
        try{
            const thought = await Thought.findByIdAndUpdate(
                {_id: req.params.thoughtId},
                {$addToSet: {reactions: req.body}},
                {runValidators: true,
                new: true}
            );
            if(!thought){
                return res.status(404).json({ message: 'Thought not found' });
            }
            res.json(thought);
        }
        catch(err){
            res.status(500).json(err);
        }
    },

    //
    async deleteReaction(req, res) {
        try{
            const thought = await Thought.findByIdAndUpdate(
                {_id: req.params.thoughId},
                {$pull: {reactions: {reactionId: req.params.reactionId}}},
                {runValidators: true,
                new: true} 
            );

            if(!thought){
                return res.status(404).json({ message: 'Thought not found' });
            }
            res.json(thought);
        }
        catch(err){
            res.status(500).json(err);
        }
    },
} ;