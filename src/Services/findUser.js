// we write code here find related all function

const createError = require("http-errors");
const mongoose = require("mongoose");
const User = require("../Model/userModel");

const findUserById = async (id) =>{
  try {
    const options = { password: 0 };

    const user = await User.findById(id, options);
    if (!user) {
      throw createError(404, "User does not exist with this id");
    }
    return user;

  } catch (error) {
    if(error instanceof mongoose.Error){
    throw (createError(404,'Invalid User Id'));
  }
  throw error;
}
}

module.exports = {findUserById}
