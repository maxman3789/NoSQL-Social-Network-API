const router = require('express').Router();

// TODO: add routes for users
const {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend
} = require('../../controllers/usersController');

// Set up GET all Users and POST at /api/users
router
  .route('/')
  .get(getUsers)
  .post(createUser);

// Set up GET one User by ID, PUT to update User, and DELETE at /api/users/:id
router
  .route('/:userId')
  .get(getUserById)
  .put(updateUser)
  .delete(deleteUser);

//  /api/users/:id/friends/:friendId
router
  .route('/:userId/friends/')
  .post(addFriend)

router
  .route('/:userId/friends/:friendId')
  .delete(removeFriend);

module.exports = router;