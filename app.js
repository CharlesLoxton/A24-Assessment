import express from 'express';
import dotenv from "dotenv";
import url_router from './routers/url_router.js'
import Database from './database/Database.js';
dotenv.config();

//create the express app
const app = express();
//Connect to MongoDB instance
Database.connectDB();

//configure middleware to accept application/json in our POST requests
app.use(express.json());

app.use('/', url_router); 

const listener = app.listen(process.env.PORT || 3000, () => {
    console.log('Listening on port ' + listener.address().port)
})