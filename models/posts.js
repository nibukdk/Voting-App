let mongoose = require("mongoose"),
    passportLocalMongoose= require("passport-local-mongoose");

let postSchema = mongoose.Schema({
  topic: String,
  options:{
    option1: String,
    option2: String,
    option3: String,
    option4: String

  },
  voters:[
    {
      type: mongoose.Schema.ObjectId,
      ref:"User"
    }
  ]
});




    module.exports = Post;
