const { Schema, model } = require("mongoose");

const moment = require('moment');

const ReactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Schema.Types.ObjectId()
    },
    reactionBody: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (date) => moment(date).format('DD-MM-YYYY'),
    }
  },
  {
    toJSON: {
      getters: true
    },
    _id: false
  }
);

module.exports = ReactionSchema;

const ThoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
    },

    createdAt: {
      type: Date,
      default: Date.now,
      get: (date) => moment(date).format('DD-MM-YYYY'),
    },

    username: {
        type: String,
        required: true,
        
    },
    reactions: [ReactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

// get total count of reactions on retrieval
ThoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});

const Thought = model('thought', ThoughtSchema);

module.exports = Thought;