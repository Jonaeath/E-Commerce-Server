const express = require('express');
const morgan = require('morgan');
const createError = require('http-errors');
const userRouter = require('./Routers/userRouter');
const seedRouter = require('./Routers/seedRouter');
const app = express();

app.use(morgan('dev'))


app.use("/api/users",userRouter);
app.use("/api/seed",seedRouter );



app.get('/test',(req,res)=>{
    res.status(200).send({
        message:'api testing is fine', 
    })
})

// server error handeling ---> all the error
app.use((err,req,res,next)=>{
    return res.status(err.status || 500).json({
        success:false,
        message: err.message,
    })
})


module.exports = app;