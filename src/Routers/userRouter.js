// Router only handel Router part only

const express = require('express');
const { getUsers } = require('../Controllers/useControllers');
const userRouter = express.Router()

// GET:/api/users
userRouter.get('/',getUsers)

module.exports = userRouter;