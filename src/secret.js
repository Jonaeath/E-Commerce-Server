require('dotenv').config();

const serverPort = process.env.SERVER_PORT || 4001;
const mongodbURL = process.env.MONGODB_ATLAS_URL;

const defaultImagePath = process.env.DEFAULT_USER_IMAGE_PATH || '../public/image/users/default.png';

const jwtActivationKey = process.env.JWT_ACTIVATION_KEY || YTGUKhjhkwjewiGKHK4657868576869;


module.exports = {serverPort, mongodbURL,defaultImagePath,jwtActivationKey};