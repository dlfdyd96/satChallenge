import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import mongoose from 'mongoose'
import passport from 'passport'

// import './passport.js'
import globalRouter from './router/globalRouter.js'
// import userRouter from './routers/UserRouter.js'
// import itineraryRouter from './routers/ItineraryRouter.js'
import morgan from 'morgan'


const app = express()

app.use('/static', express.static(__dirname + '/public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(morgan('dev'))
app.use(cors())

// app.use(passport.initialize())

app.use('/api' , globalRouter)
// app.use('/user', userRouter)
// app.use('/itinerary', itineraryRouter)

export default app;