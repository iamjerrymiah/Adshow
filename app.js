const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const compression = require('compression');
const cors = require('cors');
const morgan = require('morgan');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const viewsRouter = require('./routes/viewsRoute');
const userRouter = require('./routes/userRoute');
const postRouter = require('./routes/postRoute');
const reviewRouter = require('./routes/reviewRoute');
const likeRouter = require('./routes/likeRoute');

const app = express();
app.enable('trust proxy');


app.set('view engine', 'ejs');  
app.set('views', path.join(__dirname, 'views')); 


// GLOBAL MIDDLEWARES
//middleWare for serving static files like HTML
app.use(express.static(path.join(__dirname, 'public')));


// Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());

// Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

//implementing CORS
app.options('*', cors());


// Set security HTTP headers
app.use(helmet());


// Limit requests from same API or IP
const limiter = rateLimit({
  max: 500,  //Be flexible with the max, according to what you are building
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!'
});
app.use('/api', limiter); //works on any req with /api in route


// Data sanitization against NoSQL query injection
app.use(mongoSanitize());


// Data sanitization against XSS
app.use(xss());


// Prevent parameter pollution
app.use(hpp());

app.use(compression());

// Test middleware
app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next(); 
});


//ROUTES
app.use('/', viewsRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/posts', postRouter);
app.use('/api/v1/reviews', reviewRouter);
app.use('/api/v1/likes', likeRouter);


app.all('*', (req,res,next)=> { //Error handling for routes //means for everything{routes in this case}
   next();
});

app.use(globalErrorHandler);


module.exports = app;