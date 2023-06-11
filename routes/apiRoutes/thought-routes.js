const router = require('express').Router();

const {
    gatherThoughts,
    getAThought,
    createThought,
    deleteThought,
    updateThought,
    addReaction,
    removeReaction,

} = require('../../controllers/thought-controller');

// route for getting and postion all Thought
router
.route('/')
.get(gatherThoughts)
.post(createThought);

// route for GET, PUT, and DELETE Thought
router
.route('/:thoughtId')
.get(getAThought)
.put(updateThought)
.delete(deleteThought);

// route for POST reactions to Thought
router
.route('/:thoughtId/reactions')
.post(addReaction);

// route for DELETE reactions 
router
.route('/:thoughtId/reactions/:reactionId')
.delete(removeReaction);

module.exports = router;