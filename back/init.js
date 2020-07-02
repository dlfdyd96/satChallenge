import app from './app.js';
import './db.js';

// Environment Variables
import dotenv from 'dotenv';
dotenv.config();

// Models
// import './models/User.js';

app.listen(process.env.WORKING_ON === "DEV" ?
    process.env.DEV_PORT
    : process.env.PROD_PORT
    , () => console.log(`✅  Listening on: ${
    process.env.WORKING_ON === "DEV" ? 
    `http://localhost:${process.env.DEV_PORT}`
    : process.env.DOMAIN_URL
}`));