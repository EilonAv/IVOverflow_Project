const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const User = require("./models/user.module");
const Question = require("./models/question.module");
const Answer = require("./models/answer.module");
const jwtLib = require('jsonwebtoken');
const crypto = require('crypto');

//Acquiring all the data from '.env' file
require('dotenv').config();

//Create instance of express and port 
const app = express();
const port = process.env.PORT || 80;

app.use(cors());
app.use(express.json());

//Establish database connection
const uri = process.env.MONGO_URI;
mongoose.connect(uri, { useNewUrlParser:true  });
const connection = mongoose.connection;

connection.once('open', () => {
    console.log("MongoDB database is connected succesfully" );
});

app.post("/login", async (req, res) => {

  try{
  
  const {password} =req.body;
  var {email} = req.body;
  email = email.toLowerCase();
  // Validate user input
  if (!(email && password)) {
      res.status(400).send("All input is required");
    }
  
  const user = await User.findOne({ email });
  //Validate user with DB info using sha 512
  const salt = process.env.HASH_SALT;
  var encryptedPassword = crypto.pbkdf2Sync(password, salt, 10000, 512, 'sha512').toString('hex');
  if (user && (user.password == encryptedPassword)) {
      // Create jwt 
      const token = jwtLib.sign(
        { user_id: user._id, email:email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "1h",
        }
      );
      //saving jwt on db for each user
      user.jwtoken = token;
      user.save();
      res.status(200).json({
          message: 'OK',
          jwtoken: token
      });
      return;
    }
  res.status(400).send("Invalid Credentials");
  }
   catch (err) {
      console.log(err);
  }
  });

  app.use(async function(req, res, next) {
    let { email, jwt } = req.body;
    const user = await User.findOne({ email });
    jwtLib.verify(jwt, process.env.TOKEN_KEY, function(err, decoded){
        if( !err && user && user.jwtoken == jwt) {
            next();
            return;
        }
        res.status(401).json(err);
    });

    
});

app.post('/userInfo', async (req, res) => {
  try{
    let { email } = req.body;
    const user = await User.findOne({ email });
    res.json(user);
  }
  catch(err){
    console.log(err);
  }
});
//sending specific question
app.post('/getQuestion_Answer', async (req, res) => {
  try{
    let { question_id } = req.body;
    let id = question_id.id;
    const question = await Question.findById(question_id.id).populate(['user_ref']).populate({
      path: 'answers.user_ref',
      model: User
    });
      res.json(question);
  }
  catch(err){
    console.log(err);
  }

    
});
//sending all the questions
app.post('/getQuestions', async (req, res) => {
  try{
    let { page } = req.body;
    var questions = await Question.where().populate('user_ref'); 
      res.json(questions);

  }
  catch(err){
    console.log(err);
  }

    
});
// new question handler
app.post('/newQuestion', async (req, res) => {
  try{
    const { title,content,tags,email } = req.body;
    const user = await User.findOne({ email });
    user_id = user._id;
    const question = await Question.create({
      user_ref : user_id,
      title : title,
      content : content,
      tags : tags,
      answers: [],
      votes:0

    })
    console.log("new Question added");
    res.status(200).json(question);
  }
  catch(err){
    console.log(err);
  }

    
});

//new answer handler
app.post('/newAnswer', async (req, res) => {
  try{
    const { question_id,content,email } = req.body;
    const user = await User.findOne({ email });
    user_id = user._id;
    const question = await Question.findById( question_id );
    const answer = await new Answer({
      user_ref: user_id,
      content: content,
    }).populate('user_ref')
    console.log(answer);
    question.answers.push(answer);
    question.save();

    console.log("1 Question answer updated");

    res.status(200).json(answer);
  }
  catch(err){
    console.log(err);
  }

    
});

//utility for adding users
app.post('/register', async (req, res) => {
    const { nickname, fullname, email, password } = req.body;
    // encrypt password with sha 512 protocol
    const salt = process.env.HASH_SALT;
    encryptedPassword = await crypto.pbkdf2Sync(password, salt, 10000, 512, 'sha512').toString('hex');
    //create the entry in the collection 'users'
    const user = await User.create({
        nickname: nickname,
        fullname: fullname,
        email: email.toLowerCase(),
        password: encryptedPassword, 
        jwtoken: null,
    });

    res.status(200).json(user);
});

app.post('/upVote', async (req, res) => {
    try{
        const { question_id,answer_id,email } = req.body;
        const user = await User.findOne({ email });
        user_id = user._id;
        const question = await Question.findById( question_id).populate();
        question.answers.find(answer => answer._id == answer_id).upvote.push(user_id);

        up = Object.values(question.answers.find(answer => answer._id == answer_id).upvote)
        down = Object.values(question.answers.find(answer => answer._id == answer_id).downvote)
        if(question.votes < (up.length-down.length))
            question.votes = up.length-down.length;
        
        question.markModified('answers');
        await question.save();

        console.log("1 Vote updated");
        res.status(200);
    }
    catch(err){
        console.log(err);
    } 
  });

app.post('/downVote', async (req, res) => {
    try{
        const { question_id,answer_id,email } = req.body;
        const user = await User.findOne({ email });
        user_id = user._id;
        const question = await Question.findById( question_id);
      question.answers.find(answer => answer._id == answer_id).downvote.push(user_id);
      up = Object.values(question.answers.find(answer => answer._id == answer_id).upvote)
        down = Object.values(question.answers.find(answer => answer._id == answer_id).downvote)
        if(question.votes < (up.length-down.length) || question.votes < 0)
            question.votes = up.length-down.length;
      question.markModified('answers')
      await question.save();

        console.log("1 Vote updated");
        res.status(200);
    }
    catch(err){
        console.log(err);
    } 
  });


app.listen(port, () =>{
    console.log(`server is running on port: ${port}`);
});

