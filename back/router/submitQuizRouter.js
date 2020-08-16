import routes from '../routes.js'
import express from 'express'
import passport from 'passport'
import { postCreateSubmitQuiz, getReadSubmitQuiz, postUpdateSubmitQuiz, getDeleteSubmitQuiz } from '../controller/submitQuizController.js'


const submitQuizRouter = express.Router()


// [post] create Submit Quiz
submitQuizRouter.post(routes.createSubmitQuiz, 
  passport.authenticate('jwt', {session : false}),
  postCreateSubmitQuiz
)

// [get] Read Submit Quiz
submitQuizRouter.get(routes.readSubmitQuiz(),  
  passport.authenticate('jwt', {session : false}),
  getReadSubmitQuiz
)

// [post] Update Submit Quiz
submitQuizRouter.post(routes.updateSubmitQuiz(), 
  passport.authenticate('jwt', {session : false}),
  postUpdateSubmitQuiz
)

// [get] delete Submit Quiz
submitQuizRouter.get(routes.deleteSubmitQuiz(),
  passport.authenticate('jwt', {session : false}),
  getDeleteSubmitQuiz
)



export default submitQuizRouter