import routes from '../routes.js'
import express from 'express'
import passport from 'passport'
import { 
  postCreateQuiz, 
  getReadQuiz, 
  postUpdateQuiz, 
  getDeleteQuiz } from '../controller/quizController.js'


const quizRouter = express.Router()


// [post] create Quiz
quizRouter.post(routes.createQuiz, 
  passport.authenticate('jwt', {session : false}),
  postCreateQuiz
)

// [post] Read Quiz
quizRouter.get(routes.readQuiz(), 
  getReadQuiz
)

// [post] Update Quiz
quizRouter.post(routes.updateQuiz(), 
  passport.authenticate('jwt', {session : false}),
  postUpdateQuiz
)

// [get] delete Quiz
quizRouter.get(routes.deleteQuiz(),
  passport.authenticate('jwt', {session : false}),
  getDeleteQuiz
)



export default quizRouter