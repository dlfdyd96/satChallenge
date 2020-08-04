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
  baekjoon : String,

  joinedChallenge : [
    {
      type : mongoose.Schema.Types.ObjectId,
      ref : "Challenge"
    }
  ], 
  admin: {
    type : Boolean,
    default : false,
  },
})

UserSchema.plugin(passportLocalMongoose, { usernameField: "email" });

const model = mongoose.model("User", UserSchema);

export default model;