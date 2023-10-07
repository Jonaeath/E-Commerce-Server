// Router only handel Router part only

const express = require('express');
const { getUsers,getUserById, deleteUserById } = require('../Controllers/useControllers');
const userRouter = express.Router()

// GET:/api/users
userRouter.get('/',getUsers)

// GET:/api/users for single user
userRouter.get('/:id',getUserById)

// GET:/api/users for Deleting
userRouter.delete('/:id',deleteUserById)


module.exports = userRouter;