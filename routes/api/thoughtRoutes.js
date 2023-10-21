const router = require('express').Router();

const {
    getThoughts,
    getOneThought,
    createThought,
} = require('../../controllers/thoughtController');

// api/thoughts
router.route('/')
.get(getThoughts)
.post(createThought);

// api/thoughts/:thoughtId
router.route('/:thoughtId').get(getOneThought);

module.exports = router;