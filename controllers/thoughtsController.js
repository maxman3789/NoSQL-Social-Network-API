const { User, Thought } = require('../models');

const thoughtsController = {
    getThoughts(req, res) {
        Thought.find()
         .select('-__v')
            .then((thoughts) => res.status(200).json(thoughts))
            .catch((err) => res.status(500).json(err));
    },

    getThoughtById(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
            .select("-__v")
            .then((thought) => !thought
            ? res.status(400).json({ message: 'No thought with that ID' })
            : res.status(200).json(thought))
            .catch((err) => res.status(500).json(err));
    },

    createThought(req, res) {
        Thought.create(req.body)
            .then((thought) => {
                return User.findOneAndUpdate(
                    { username: req.body.username },
                    { $addToSet: { thoughts: thought._id } },
                    { new: true }
                )
                .then(res.status(200).json(thought))
                .catch((err) => res.status(500).json(err));
            })
            .catch((err) => res.status(500).json(err));
    },

    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { new: true }
        )
            .then((thought) => 
                !thought
                    ? res.status(404).json({ message: `Lost a thought` })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },

    deleteThought(req, res) {
        Thought.findOneAndRemove({ _id: req.params.thoughtId })
            .then((thought) => 
                !thought
                    ? res.status(404).json({ message: `No Thoughts` })
                    : res.status(200).json({ message: 'Thought deleted!' })
            )
            .catch((err) => res.status(500).json(err));
    },

    addReaction(req,res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body } },
            { new: true }
        )
        .then((reaction) => 
            !reaction
                ? res.status(404).json({ message: `No Reacts` })
                : res.json(reaction)
            )
            .catch((err) => res.status(500).json(err));
    },

    removeReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.params.reactionId } } },
            { new: true } 
        )
        .then((thought) => 
            !thought
                ? res.status(404).json({ message: `Can't remove React` })
                : res.status(200).json({ message: 'Reaction deleted!' })
        )
        .catch((err) => res.status(500).json(err));
    }
};

module.exports = thoughtsController;