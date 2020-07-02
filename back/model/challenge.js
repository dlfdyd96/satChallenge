import mongoose from 'mongoose';

const challengeSchema = new mongoose.Schema({
  title : {
    type: String,
    required: "Title is Required",
  },
  weeks : {
    type : Number,
    required : "Weeks is required"
  },
  problems : {
    type : Number,
    required : "Problems are required"
  },
  challengers : {
    type : Number,
    required : "Challengers is required"
  },
  startedAt : {
    type: Date,
    default : Date.now
  },
  createdAt : {
    type: Date,
    default: Date.now
  },
  img : {
    type: String,
  },
  quizes : [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref : "Quiz"
    }
  ],
  // author : {
  //   type : mongoose.Schema.Types.ObjectId,
  //   ref: "User",
  // },
});

const model = mongoose.model("Challenge", challengeSchema);

export default model;