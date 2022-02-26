const { User, Thought } = require("../models");

const usersController = {
    getUsers(req, res) {
        User.find()
        .select('-__v')
            .then((users) => res.json(users))
            .catch((err) => res.status(500).json(err));
    },

    getUserById(req, res) {
        User.findOne({ _id: req.params.userId })
            .select("-__v")
            .then((user) =>
                !user
                    ? res.status(404).json({ message: `ID not found` })
                    : res.status(200).json(user)
            )
            .catch((err) => res.status(500).json(err));
    },

    createUser(req, res) {
        User.create(req.body)
            .then((user) => res.status(200).json(user))
            .catch((err) => res.status(500).json(err));
    },

    updateUser(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
            .then((user) => 
                !user
                    ? res.status(404).json({ message: `User ID not found` })
                    : Thought.updateMany({ username: user.username }, { username: req.body.username })
            .then(res.status(200).json({ message: 'The user has been updated!' }))
            .catch((err) => res.status(500).json(err))
      )
        .catch((err) => res.status(500).json(err));
    },

    deleteUser(req, res) {
        User.findOneAndRemove({ _id: req.params.userId })
            .then((user) => 
                !user
                    ? res.status(404).json({ message: `User ID not found` })
                    : Thought.deleteMany({ _id: { $in: user.thoughts } })
                    .then(res.status(200).json({ message: 'Deleted' }))
                    .catch((err) => res.status(500).json(err))
            )
            
            .catch((err) => res.status(500).json(err));
    },

    addFriend(req,res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends: req.body._id } },
            { new: true }
        )
        .then((user) => 
            !user
                ? res.status(404).json({ message: `No user found` })
                : res.status(200).json({ message: 'They are friends!' })
            )
            .catch((err) => res.status(500).json(err));

        User.findOneAndUpdate(
            { _id: req.body._id },
            { $addToSet: { friends: req.params.userId } }
        )
        .catch(
            // Error handling
        )
    },

    removeFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: req.params.friendId } },
            { new: true } 
        )
        .then((user) => 
            !user
                ? res.status(404).json({ message: `User not found` })
                : res.status(200).json({ message: 'Friend Removed!' })
        )
        .catch((err) => res.status(500).json(err));

        User.findOneAndUpdate(
            { _id: req.params.friendId },
            { $pull: { friends: req.params.userId } }
        )
        .catch(
            // Error handling
        )
    }
}

module.exports = usersController;