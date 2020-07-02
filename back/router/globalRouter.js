import routes from '../routes.js';
import express from 'express';
import { getAllChallenges } from '../controller/challengeController.js';

const globalRouter = express.Router();

// [get] api/challenges
globalRouter.get(routes.challenges, getAllChallenges);

// [post] api/
globalRouter.post


export default globalRouter;