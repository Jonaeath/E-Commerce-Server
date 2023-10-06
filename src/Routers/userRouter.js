// Router only handel Router part only

const express = require('express');
const { getUsers, getUser } = require('../Controllers/useControllers');
const userRouter = express.Router()

// GET:/api/users
userRouter.get('/',getUsers)

// GET:/api/users for single user
userRouter.get('/:id',getUser)


module.exports = userRouter;