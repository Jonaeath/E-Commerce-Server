//  Controller handel logical part only and we keep all logical part here
const createError = require('http-errors');
const fs = require('fs');
const { users } = require('../Model/userModel');
const User = require('../Model/userModel');
const { successResponse } = require('./responseController');
const { findWithId } = require('../Services/findItem');
const { deleteImage } = require('../Helper/deleteimage');
const { createJSONWebToken } = require('../Helper/jasonwebtoken');
const { jwtActivationKey } = require('../secret');

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
const getUserById = async (req,res,next)=>{
    try {
        const id = req.params.id;
        const options = { password: 0 };

        const user = await findWithId(User,id,options)

        return successResponse(res,{
            statusCode:200,
            message:'user were returned successfully',
            payload:{ user }
        })

    } catch(error){
        next(error);
    }
};


const deleteUserById = async (req,res,next)=>{
    try {
        const id = req.params.id;
        const options = { password: 0 };
// when we want to delete a user,first we find a user
        const user = await findWithId(User,id,options)
// then we delete our user image path
        const userImagePath = user.image;
         deleteImage(userImagePath);

        //  after delete image then we delete user
        await User.findByIdAndDelete({
            _id: id,
            // Never delete admin
            isAdmin: false,   
        });

        return successResponse(res,{
            statusCode:200,
            message:'user were Delete successfully',
        })

    } catch(error){
        next(error);
    }
};

const processRegister = async (req,res,next)=>{
    try {
        const {name, email, password, phone, address} = req.body;
        
        const userExists = await User.exists({email: email})
        if(userExists){
            throw createError(409,'User with this email already exist,Please Login')
        }

        // create jwt
       const token = createJSONWebToken(
            {name, email, password, phone, address},
            jwtActivationKey,
            '10m'
        )
        console.log(token)
    

        return successResponse(res,{
            statusCode:200,
            message:'user were create successfully',
            payload: {token}
            
        });

    } catch(error){
        next(error);
    }
};

module.exports = {getUsers, getUserById, deleteUserById, processRegister}