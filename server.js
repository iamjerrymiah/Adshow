const mongoose = require('mongoose');
const dotenv = require('dotenv');


//Error Handler for sychronous operation
process.on('uncaughtException', err => { 
    console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
    console.log(err.name, err.message);
    //console.log(err.stack)
    process.exit(1);
  });


dotenv.config({ path: './config.env' });

const app = require('./app');

//connecting to DB and replac password
const DB = process.env.DATABASE.replace('<password>', process.env.DATABASE_PASSWORD);

mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(()=> console.log("DB was connected successfully"));


//Port number
const port = process.env.PORT || 1000;
//Starting the server
app.listen(port, ()=> {
    console.log("App running at port " + port);
});

//ReferenceError saveError is not defined
//Error Handler for Databse connection
process.on('unhandledRejection', err => { 
    console.log('UNHANDLED REJECTION! 💥 Shutting down...');
    console.log(err.name, err.message);
    console.log(err.stack);
});


process.on('SIGTERM', () => {
    console.log('👋 SIGTERM RECEIVED. Shutting down gracefully');
    server.close(() => {
      console.log('💥 Process terminated!');
    });
  });
