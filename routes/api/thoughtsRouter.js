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
    .route('/:thoughtId')
    .get(getThoughtById)
    .put(updateThought)
    .delete(deleteThought);

// /api/thoughts/:thoughtId/reactions
router
    .route('/:thoughtId/reactions')
    .post(addReaction);

// /api/thoughts/id/reactionId
router.route('/:thoughtId/reactions/:reactionId')
    .delete(removeReaction);

module.exports = router;