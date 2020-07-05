import passport from 'passport'
import passportJWT from 'passport-jwt'
import User from './model/User.js'
import { verifyUser } from './controller/userController.js'
import dotenv from 'dotenv'
dotenv.config()

// local Login
passport.use(User.createStrategy())

// JWT Token Authentication
passport.use(
    new passportJWT.Strategy({
            // options
            jwtFromRequest: passportJWT.ExtractJwt.fromAuthHeaderAsBearerToken(), 
            secretOrKey   : process.env.JWT_SECRET_KEY
        },
        // callback
        verifyUser
    )
)

/* Session을 쓰지 않기 때문에 사용 x
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
*/