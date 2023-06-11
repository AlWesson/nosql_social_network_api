const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');

// set environment variables
const app = express();
const PORT = process.env.PORT || 3001;

// use middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
//use rorutes
app.use(routes);


// connect to mongodb/start server.
db.once('open', () => {
    app.listen(PORT, () => {
        console.log(`API server running on port ${PORT}`);
    });
});
