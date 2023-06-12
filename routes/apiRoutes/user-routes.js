const router = require('express').Router();

const {
    getAllUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
    addUser_Friend,
    removeUser_Friend,
} = require('../../controllers/user-controller');

// GET and POST for all users
router
.route('/')
.get(getAllUsers)
.post(createUser);

// GET, PUT, and DELETE for users by id
router
.route('/:userId')
.get(getSingleUser)
.put(updateUser)
.delete(deleteUser);

// POST and DELETE for adding friends and removing friends
router
.route('/:userId/friends/:friendId')
.post(addUser_Friend)
.delete(removeUser_Friend);

module.exports = router;