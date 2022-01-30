const User = require("./user.module");
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const answerSchema = new mongoose.Schema({
    user_ref: { type: mongoose.ObjectId, ref: User},
    content: { type: String},
    upvote: {type: Array },
    downvote: {type: Array }

},{timestamps: true});

const Answer = mongoose.model("answer", answerSchema);
module.exports = Answer;