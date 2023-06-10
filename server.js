const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');

// set environment variables
const PORT = process.env.PORT || 3001;
const app = express();
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
