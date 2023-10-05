//  Controller handel logical part only and we keep all logical part here
const createError = require('http-errors');
const { users } = require('../Model/userModel');


const getUsers = (req,res,next)=>{
    try {
        res.status(200).send({
            message: 'users were returned',
        });
    } catch(error){
        next(error)
    }
}

module.exports = {getUsers}