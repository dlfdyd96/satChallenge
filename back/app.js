import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import passport from 'passport'
import morgan from 'morgan'

import './passport.js'

import globalRouter from './router/globalRouter.js'
import userRouter from './router/UserRouter.js'
import challengeRouter from './router/challengeRouter.js'
import quizRouter from './router/quizRouter.js'
import submitQuizRouter from './router/submitQuizRouter.js'


const app = express()

app.use('/static', express.static(__dirname + '/public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(morgan('common'))
app.use(cors())

app.use(passport.initialize())

app.use('/' , globalRouter)
app.use('/user', userRouter)
app.use('/challenge', challengeRouter)
app.use('/quiz', quizRouter)
app.use('/submit-quiz', submitQuizRouter)


export default app;