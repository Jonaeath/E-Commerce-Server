const User = require("../Model/userModel");
const data = require("../data");

const seedUser = async (req,res,next) => {
  try {
    //deleting all existing users
    await User.deleteMany({});

    //Insert all new users
    const validUsers = data.users.filter(user => user.email !== null);
    const users = await User.insertMany(validUsers);

    //success response
    return res.status(201).json(users);
  } catch (error) {
    next(error);

  }
};

module.exports = { seedUser };
