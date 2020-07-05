import mongoose from 'mongoose'
import passportLocalMongoose from 'passport-local-mongoose'
import validator from 'validator'

const UserSchema = new mongoose.Schema({
  email : {
    type: String,
    required : 'Email is Required',
    validate : [validator.isEmail]
  },
  // password : String,
  username : String,
  naverId : Number,
  kakaoId : Number,
  representLang : String,
  challenge : [  // challenge 만든 이
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Challenge"
    }
  ],
  joinedChallenges : [ // join 한 chanllenge 들
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Challenge" 
    }
  ],
  // 푼문제들
  submitQuiz : [
    {
      type : mongoose.Schema.Types.ObjectId,
      ref: "SubmitQuiz"
    }
  ],

})

UserSchema.plugin(passportLocalMongoose, { usernameField: "email" });

const model = mongoose.model("User", UserSchema);

export default model;