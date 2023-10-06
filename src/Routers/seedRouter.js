const express = require('express');
const { seedUser } = require('../Controllers/seedsControllers');
const seedRouter = express.Router();

seedRouter.get('/users', seedUser);


module.exports = seedRouter;