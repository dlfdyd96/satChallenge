import routes from '../routes.js'
import express from 'express'
import passport from 'passport'
import { 
  getAllChallenges, 
  getReadChallenge, 
  postCreateChallenge,
  postUpdateChallenge,
  getDeleteChallenge,
  getJoinChallenge,
} from '../controller/challengeController.js'

const challengeRouter = express.Router()

// [get] get All Challenge
challengeRouter.get(routes.challenges, getAllChallenges)

// [post] create Challenge
challengeRouter.post(routes.createChallenge, 
  passport.authenticate('jwt', {session : false}),
  postCreateChallenge
)

// [get] Read Challenge
challengeRouter.get(routes.readChallenge(), 
  getReadChallenge
)

// [post] Update Challenge
challengeRouter.post(routes.updateChallenge(), 
  passport.authenticate('jwt', {session : false}),
  postUpdateChallenge
)

// [get] delete Challenge
challengeRouter.get(routes.deleteChallenge(),
  passport.authenticate('jwt', {session : false}),
  getDeleteChallenge
)

// [get] join Challenge
challengeRouter.get(routes.joinChallenge(),
  passport.authenticate('jwt', {session : false}),
  getJoinChallenge
)


export default challengeRouter