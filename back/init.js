import dotenv from 'dotenv';

import './db.js';
import app from './app.js';

// Environment Variables
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