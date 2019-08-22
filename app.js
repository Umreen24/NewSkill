const express = require('express');
const morgan = require('morgan');
const path = require('path');

const app = express();

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const courseRouter = require('./routes/courseRoutes');
const userRouter = require('./routes/userRoutes');
const reviewRouter = require('./routes/reviewRoutes');

// 1) MIDDLEWARES
// used to only console.log dev data when app is ran in dev
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Used to get the body info
app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  //console.log(req.headers);
  next();
});

// 3) ROUTES
app.get('/', (req, res) => {
  res.status(200).render('base', {
    course: "Phil's Photography",
    user: 'Jonas'
  });
});

app.get('/overview', (req, res) => {
  res.status(200).render('overview', {
    title: 'All Courses'
  });
});

app.get('/course', (req, res) => {
  res.status(200).render('course', {
    title: "Phil's Photography"
  });
});

app.use('/api/v1/courses', courseRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/reviews', reviewRouter);

// 404 error for all unhandled routes
app.all('*', (req, res, next) => {
  // const err = new Error(`Can't find ${req.originalUrl} on this server!`);
  // err.status = 'fail';
  // err.statusCode = 404;
  // next(err);

  next(new AppError(`Can't find ${req.originalUrl} on this server!`));
});

// ERROR HANDLING MIDDLEWARE
app.use(globalErrorHandler);

module.exports = app;
