const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const app = express();
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean')
const hpp = require('hpp')
// const morgan = require('morgan');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const courseRouter = require('./routes/courseRoutes');
const userRouter = require('./routes/userRoutes');
const reviewRouter = require('./routes/reviewRoutes');
const viewRouter = require('./routes/viewRoutes');
const bookingRouter = require('./routes/bookingRoutes');

// 1) MIDDLEWARES
// SET SECURITY HTTP HEADERS 
app.use(helmet())

// DEVELOPMENT LOGGING
if (process.env.NODE_ENV === 'development') {
  // app.use(morgan('dev'));
}

// SET API REQUEST LIMITS 
const limiter = rateLimit({
  max: 500,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!'
})
app.use('/api', limiter);


// Used to get the body info
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());

// DATA SANITIZATION AGAINST NOSQL QUERY INJECTION 
app.use(mongoSanitize());

// DATA SANITIZATION AGAINST XSS 
app.use(xss());

// PREVENT PARAMETER POLLUTION
app.use(hpp({
  whitelist: [
    'duration', 
    'ratingsQuantity', 
    'ratingsAverage', 
    'maxGroupSize', 
    'difficulty', 
    'price'
  ]
}));

// SERVING STATIC FILES 
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(`${__dirname}/public`));

// TEST MIDDLEWARE 
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// SETTING PUG AS TEMPLATE ENGINE 
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// ROUTES
app.get('/', (req, res) => {
  res.status(200).render('base');
});

app.use('/', viewRouter);
app.use('/api/v1/courses', courseRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/bookings', bookingRouter);
app.use('/api/v1/reviews', reviewRouter);

// 404 error for all unhandled routes
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// ERROR HANDLING MIDDLEWARE
app.use(globalErrorHandler);

module.exports = app;
