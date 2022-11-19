require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const userRoutes = require('./routes/user.routes');
const postRoutes = require('./routes/post.routes');
const nonAuthRoutes = require('./routes/nonAuth.routes');

// set up express app
const app = express();

// apply middleware
app.use(bodyParser.json({limit: '100mb'}));
app.use(bodyParser.urlencoded({limit: '100mb', extended: true, parameterLimit: 1000000, type: 'application/x-www-form-urlencoded'}));
app.use(express.json({limit: '100mb'}));
app.use(cors());
const port = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_DB_URI).then(() => {
    app.listen(port, (err) => {
        if(err) throw Error('Error: ', err.message);
        console.log('Connected to DB and running on port: ' + port);
    })
});

app.use('/auth', userRoutes);
app.use('/posts', nonAuthRoutes);
app.use('/auth/posts', postRoutes);

