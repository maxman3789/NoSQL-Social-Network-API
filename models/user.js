const { Schema, model } = require("mongoose");

const UserSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: 'Username!',
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: 'E-mail!',
      trim: true,
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Thought",
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);


UserSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});


// create the User model using the UserSchema
const User = model("User", UserSchema);

// export the User model
module.exports = User;