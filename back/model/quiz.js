import mongoose, { mongo } from 'mongoose';

const quizSchema = new mongoose.Schema({
  title : {
    type: String,
    required: "Title is Required",
  },
  url : { // 문제 url
    type: String,
    required : "URL is required",
  },
  day : {
    type : Date,
    required : "Day is required",
  },
  description : {
    type: String,
    required : "Description is required",
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  challenge : {
    type: mongoose.Schema.Types.ObjectId,
    ref : "Challenge",
    required : "Challenge is required",
  },
  creator : {
    type: mongoose.Schema.Types.ObjectId,
    ref : "User"
  },
  submitChallenger : [
    {
      type : mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  ],
});

const model = mongoose.model("Quiz", quizSchema);

export default model;