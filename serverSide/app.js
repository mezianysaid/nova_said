const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
var logger = require('morgan');
var passport = require('passport');
var multer = require('multer');
require('./api/models/database');
require('./api/config/passport');
// var upload = multer({ dest: 'upload/' });

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({ origin: 'http://localhost:4200' }));
// app.use(passport.initialize());
// app.use('/api/user', express.static('uploads'));

//error handler
app.use((err, req, res, next) => {
    if (err.name === 'ValidationError') {
        var valError = [];
        Object.keys(err.errors).forEach(key => valError.push(err.errors[key].message));
        res.status(422).send(valError);
    }
});
app.use('/uploads', express.static('uploads'));
// app.use('/uploadVideos', express.static('uploadVideos'));
const user_Router = require('./api/routers/userRouter.router');
app.use('/api/user', user_Router);

//GET USER'S ROUTE
const blg_Router = require('./api/routers/BlogRouter.router');
app.use('/api/blog', blg_Router);





app.listen(3100 || 3000);