const User = require("./user.module");
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const questionSchema = new mongoose.Schema({
    user_ref: { type: mongoose.ObjectId, ref: User},
    title: { type: String },
    content: { type: String},
    tags: { type: Array },
    answers: { type: Array },
    votes: { type: Number}
},{timestamps: true});

const Question = mongoose.model("question", questionSchema);
module.exports = Question;