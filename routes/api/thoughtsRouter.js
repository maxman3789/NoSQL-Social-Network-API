const router = require('express').Router();

const {
    getThoughts,
    getThoughtById,
    createThought,
    deleteThought,
    updateThought,
    addReaction,
    removeReaction
} = require('../../controllers/thoughtsController');

// /api/thoughts/
router
    .route('/')
    .get(getThoughts)
    .post(createThought);

// /api/thoughts/id
router
    .route('/:id')
    .get(getThoughtById)
    .put(updateThought)
    .post(addReaction)
    .delete(deleteThought);

// /api/thoughts/id/reactionId
router.route('/:id/:reactionId')
    .delete(removeReaction);

module.exports = router;