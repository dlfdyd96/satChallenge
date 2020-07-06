import routes from '../routes.js'
import express from 'express'
import passport from 'passport'
import {
  getMe, 
  getUserDetail, 
  postEditProfile, 
  postUpdatePassword
} from '../controller/userController.js'

const userRouter = express.Router()

// [get] user/changePassword
userRouter.get(routes.me,
  passport.authenticate('jwt', { session: false }),
  getMe
)

// [get] user/changePassword
userRouter.get(routes.userDetail, getUserDetail)

// [post] user/edit-profile
userRouter.post(routes.userEdit,
  passport.authenticate('jwt', { session: false }),
  postEditProfile
)

// [post] user/change-password
userRouter.post(routes.changePassword,
  passport.authenticate('jwt', { session: false }),
  postUpdatePassword
)





export default userRouter