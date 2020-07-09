import passport from 'passport'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import User from '../model/User'

// 회원가입
export const postJoin = async (req, res, next) => {
  const {
    body: {
      password,
      password2,
      email,
      username,
      representLang
    }
  } = req;
  if (password !== password2) {
    const msg = "입력한 두 비밀번호가 일치하지 않습니다."
    res.status(401).send({ status: 401, message: msg });
  }
  // User 이미 존재하면 미리다 체크해줌.
  const user = new User({ email, username, representLang });
  try {
    await User.register(user, password);
    // res.status(200).send('join success');
    req.user = user;
    res.status(200).json({ user });
    // next(); // login 바로 연결
  } catch (err) {
    console.log(err)

    let msg = "회원 가입을 할 수 없습니다.";

    if (err.email.indexOf("UserExistsError") > -1)
      msg = "가입한 사용자가 존재 합니다."
    else if (err.email.indexOf("ValidationError") > -1)
      msg = "이메일 형식을 입력하세요."

    res.status(401).send({ status: 401, message: msg });
  }
}

// 토큰
export const postLogin = (req, res, next) => {
  passport.authenticate(
    'local', 
    { session: false }, 
    (err, user, info) => {  // callback Method
      // console.log(user);
      if (err || !user) {
        return res.status(400).json({
          message: 'Check the account',
          user: user
        });
      }

      req.login(user, { session: false }, (err) => {
        if (err) {
          res.send(err);
        }
        // generate a signed son web token with the contents of user object and return it in the response
        // console.log(`jwt 전`)
        const token = jwt.sign(user.email, process.env.JWT_SECRET_KEY);
        return res.json({
          user: {
            _id: user._id,
            email: user.email,
            name: user.name,
            representLang : user.representLang
          }, token
        });
      });
  })(req, res);
}
// 확인
export const verifyUser = async (jwt_payload, done) => {
  console.log(`jwtPayload : ${jwt_payload}`);
  return await User.findOne({ email: jwt_payload })
    .then(user => {
      return done(null, user);
    })
    .catch(err => {
      console.log(err);
      return done(err);
    })
}

export const getMe = async (req, res, next) => {
  const {
    user
  } = req;
  const userInfo = await User.findById({_id : user._id}).populate("joinedChallenge");
  res.status(200).json({
    userInfo,
  })
}

// User Detail
export const getUserDetail = async (req, res, next) => {
  const {
      params : { id },
  } = req;
  try {
      const user = await User.findById({_id : user.id}).populate("joinedChallenge");
      // const itinerary = await Itinerary.find({creator : id})
      res.status(200).json({
          message : "Success get User Detail",
          user,
      })
  } catch(err) {
      console.log(`Get User Detail Error \n ${err}`);
      res.status(400).send({
          error : "Failed to get user Detail"
      })
  }
}

/*
// User Detail
export const getUserDetail = async (req, res, next) => {
  const {
    params: { id }
  } = req;
  try {
    const user = await User.findOne({ _id: id });
    const itinerary = await Itinerary.find({ creator: id })
    res.status(200).json({
      message: "Success get User Detail",
      user,
      itinerary
    })
  } catch (err) {
    console.log(`Get User Detail Error \n ${err}`);
    res.status(400).send({
      error: "Failed to get user Detail"
    })
  }
}
*/

// Change Password
export const postUpdatePassword = async (req, res, next) => {
  const {
    body: { oldPassword, newPassword, newPassword2 },
    user    // JWT MiddleWare 추가
  } = req;
  try {
    if (newPassword === newPassword2) {
      await user.changePassword(oldPassword, newPassword);
      res.status(200).json({
        message: 'Success to Update password'
      });
    } else {
      res.status(400).send({
        error: "Not Match New Password1 and New Password2"
      });
    }
  } catch (err) {
    console.log(err);
    res.status(400).send({
      error: "Can't Update Password T^T"
    });
  }
}

// Edit Profile
export const postEditProfile = async (req, res) => {
  const { body, user } = req;
  console.log(body);
  try {

    const updateUser = await User.findOneAndUpdate(
      { _id: req.user._id },
      body // 이름, representLang
    );
    res.status(200).json({
      message: 'Sucess to Update Profile',
      // user: {
      //   _id: updateUser._id,
      //   email: updateUser.email,
      //   username: updateUser.username,
      //   representLang : updateUser.representLang
      // }
    });
  } catch (error) {
    res.status(400).send({
      error
    });
  }
};

