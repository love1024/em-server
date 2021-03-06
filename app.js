const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const expressJwt = require('express-jwt');

const config = require('./config');
const departmentRoute = require('./routes/department');
const resourceRoute = require('./routes/resource');
const projectRoute = require('./routes/project');
const attendanceRoute = require('./routes/attendance');
const billingRoute = require('./routes/billingrate');
const levelInfo = require('./routes/levelInfo');
const resourcePeriodic = require('./routes/resourceperiodic');
const technologyRoute = require('./routes/technology');
const projectResourceRoute = require('./routes/projectResource');
const loginRoute = require('./routes/login');
const taskRoute = require('./routes/task');

const attendancePublish = require('./publish/attendance');
const leavePublish = require('./publish/leave');

const attendanceJob = require('./jobs/attendance');

mongoose.Promise = global.Promise;

//create connection to mongo database
mongoose.connect('mongodb://erste:password0@ds261660.mlab.com:61660/erstemanagement')
  .then(() => console.log('connection succesful'))
  .catch((err) => console.error(err))


const app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

//Check auth token unless given routes
app.use(expressJwt({ secret: config.secret }).unless({ path: ['/login'] }))

//ROUTES
app.use('/departments', departmentRoute);
app.use('/resources', resourceRoute);
app.use('/projects', projectRoute);
app.use('/attendance', attendanceRoute);
app.use('/billing', billingRoute);
app.use('/level', levelInfo);
app.use('/resourceperiodic', resourcePeriodic);
app.use('/technology', technologyRoute);
app.use('/projectresource', projectResourceRoute);
app.use('/login', loginRoute);
app.use('/task', taskRoute);

app.use('/publish/attendance', attendancePublish);
app.use('/publish/leave', leavePublish);

app.use('/job/attendance', attendanceJob);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send({ error: err });
});

module.exports = app;
