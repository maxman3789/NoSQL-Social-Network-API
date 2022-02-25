const { User, Thought } = require("../models");

const usersController = {
    getUsers(req, res) {
        User.find()
            .then((users) => res.json(users))
            .catch((err) => res.status(500).json(err));
    },

    getUserById(req, res) {
        User.findOne({ _id: req.params.userId })
            .select("-__v")
            .then((user) =>
                !user
                    ? res.status(404).json({ message: `ID not found` })
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },

    createUser(req, res) {
        User.create(req.body)
            .then((user) => res.json(user))
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
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },

    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.userId })
            .then((user) => 
                !user
                    ? res.status(404).json({ message: `User ID not found` })
                    : Thought.deleteMany({ userId: req.params.userId })
            )
            .then((user) =>
                !user
                    ? res.status(404).json({ message: `No thoughts` })
                    : res.json({ message: `All deleted` })
            )
            .catch((err) => res.status(500).json(err));
    },

    addFriend(req,res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends: { _id: req.params.friendId } } },
            { new: true }
        )
        .then((user) => 
            !user
                ? res.status(404).json({ message: `No user found` })
                : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },

    removeFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: req.params.friendId } },
            { new: true } 
        )
        .then((user) => 
            !user
                ? res.status(404).json({ message: `this user doesnt exist you fool, how can someone who doesnt exist have a friend to unfriend you fool` })
                : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
    }
}

module.exports = usersController;