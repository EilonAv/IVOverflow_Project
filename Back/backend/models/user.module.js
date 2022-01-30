const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
    nickname: { type: String},
    fullname: { type: String },
    email: { type: String,
    unique:true },
    password: { type: String },
    jwtoken: { type: String }
},{timestamps: true});

const User = mongoose.model("user", userSchema);
module.exports = User;