const express = require('express');
const morgan = require('morgan');
const createError = require('http-errors');
const userRouter = require('./Routers/userRouter');
const seedRouter = require('./Routers/seedRouter');
const { errorResponse } = require('./Controllers/responseController');
const app = express();

app.use(morgan('dev'))
app.use(express.json());

app.use("/api/users",userRouter);
app.use("/api/seed",seedRouter );


// server error handeling ---> all the error
app.use((err,req,res,next)=>{
   return errorResponse(res, {
    statusCode:err.status,
    message:err.message,
   })

});


module.exports = app;