import mongoose from 'mongoose'

const SubmitQuizSchema = new mongoose.Schema({
  url : String,
  createdAt: {
    type: Date,
    default: Date.now
  },
  user : {
    type : mongoose.Schema.Types.ObjectId,
    ref : "User"
  }
})

const model = mongoose.model("SubmitQuiz", SubmitQuizSchema);

export default model;