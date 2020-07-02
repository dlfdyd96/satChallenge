import mongoose from 'mongoose';

const quizSchema = new mongoose.Schema({
  day : {
    type : String,
    required : "Day is required",
  },
  title : {
    type: String,
    required: "Title is Required",
  },
  url : {
    type: String,
    required : "URL is required",
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  description : {
    type: String,
    required : "Description is required",
  },
});

const model = mongoose.model("Quiz", quizSchema);

export default model;