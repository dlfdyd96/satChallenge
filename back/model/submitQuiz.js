import mongoose from 'mongoose'

const SubmitQuizSchema = new mongoose.Schema({
  contents : String,
  createdAt: {
    type: Date,
    default: Date.now
  },
  creator : {
    type : mongoose.Schema.Types.ObjectId,
    ref : "User"
  },
  quiz : {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Quiz"
  }
})

const model = mongoose.model("SubmitQuiz", SubmitQuizSchema);

export default model;