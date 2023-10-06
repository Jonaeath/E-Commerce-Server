//  Controller handel logical part only and we keep all logical part here
const createError = require('http-errors');
const { users } = require('../Model/userModel');
const User = require('../Model/userModel');
const { successResponse } = require('./responseController');
const  mongoose  = require('mongoose');

//  For all users
const getUsers = async (req,res,next)=>{
    try {
        const search = req.query.search || "";
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 5;

        const searchRegExp = new RegExp(".*" + search + ".*",'i');
        
        // We return the value, who are not admin
        const filter = {
            isAdmin: {$ne: true},
            $or:[
                {name:{$regex: searchRegExp}},
                {email:{$regex: searchRegExp}},
                {phone:{$regex: searchRegExp}}
            ],
        };

        const options = {password: 0}; // we don't return password

        const users = await User.find(filter, options)
        // we want to keep how many person per page(pagination)
        .limit(limit)
        .skip((page - 1) * limit);

        // Code for total number of user in our database
        const count = await User.find(filter).countDocuments();
        // if we could not find any user
        if(!users) throw createError(404,"No users found");

        return successResponse(res,{
            statusCode:200,
            message:'users were returned successfully',
            payload:{
            users,
            pagination: Math.ceil(count / limit),
            currentPage: page,
            previousPage: page - 1 > 0 ? page-1 : null,
            // <= it is symbol of less then equal
            previousPage: page + 1 <= Math.ceil(count/limit) ?
            page + 1 : null,

            }
        })



    } catch(error){
        next(error)
    }
}

// For single user - find using id
const getUser = async (req,res,next)=>{
    try {
        const id = req.params.id;
        const options = { password: 0 };

        const user = await User.findById(id, options)
        if(!user) {
            throw createError(404, 'User does not exist with this id')
        }

        return successResponse(res,{
            statusCode:200,
            message:'user were returned successfully',
            payload:{ user }
        })

    } catch(error){
        if(error instanceof mongoose.Error){
            next(createError(404,'Invalid User Id'));
            return;
        }
        next(error);
    }
};

module.exports = {getUsers, getUser}