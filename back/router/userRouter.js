import routes from '../routes.js';
import express from 'express';
import { getAllChallenges } from '../controller/challengeController.js';
import { onlyPublic, onlyPrivate } from '../middlewares.js';
import { postJoin, postLogin, getLogout, getMe } from '../controller/userController.js';

const globalRouter = express.Router();

// [post] api/
globalRouter.post(routes.join, onlyPublic, postJoin);

// [post] api/login
globalRouter.post(routes.login, onlyPublic, postLogin);

// [get] api/changePassword
globalRouter.get(routes.me, getMe)

// [get] api/challenges
globalRouter.get(routes.challenges, getAllChallenges);



export default globalRouter;