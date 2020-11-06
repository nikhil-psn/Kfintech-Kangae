const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ideaSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
  category: {
    type: String,
    required: true,
  },
  body: {
    type: String,
  },
  anonymous: {
    type: Boolean,
  },
  status: {
    type: String,
    default: "Ideation",
  },
  likes: {
    type: [String],
    default: [],
  },
  unlikes: {
    type: [String],
    default: [],
  },
  comments: {
    type: [{ comment: String, commentBy: String }],
    // type: [String],
    default: [],
  },
  time: {
    type: Date,
    required: true,
  },
});

const Idea = mongoose.model("Idea", ideaSchema);

module.exports = { Idea };
