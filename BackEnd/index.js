const express = require('express');
require('dotenv').config();
const app = express();
const routes = require('./Routers/router');
const { connectToDatabase } = require('./Models/db'); 

const startApp = async () => {
    try {
        // Waiting for mongoDb connection
        await connectToDatabase(); 
        //routes redirection to routes file
        app.use('/', routes);
        const port = process.env.PORT || 5000;
        app.listen(port, () => {
            console.log(`Example app listening on port ${port}`);
        });
    } catch (error) {
        console.log('Error in DB connection: ', error);
    }
}

startApp();
