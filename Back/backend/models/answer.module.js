const User = require("./user.module");
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const answerSchema = new mongoose.Schema({
    user_ref: { type: mongoose.ObjectId, ref: User},
    content: { type: String},
    upvote: {type: Array ,default: []},
    downvote: {type: Array ,default: []}

},{timestamps: true});

const Answer = mongoose.model("answer", answerSchema);
module.exports = Answer;