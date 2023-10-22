const router = require('express').Router();

const {
    getUsers,
    getOneUser,
    createUser,
    updateUser,
    deleteUser,
} = require('../../controllers/userController');

// /api/users
router.route('/')
    .get(getUsers)
    .post(createUser);

// /api/:userId
router.route('/:userId') //? is this where req.params.userId  is defined?
    .get(getOneUser)
    .put(updateUser)
    .delete(deleteUser);


module.exports = router;