//  Controller handel logical part only and we keep all logical part here
const createError = require('http-errors');
const { users } = require('../Model/userModel');
const User = require('../Model/userModel');


const getUsers = async (req,res,next)=>{
    try {
        const users = await User.find()
        res.status(200).send({
            message: 'users were returned',
            users,
        });
    } catch(error){
        next(error)
    }
}

module.exports = {getUsers}