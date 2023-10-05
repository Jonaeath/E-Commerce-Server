const { Schema, model} = require('mongoose')
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    name:{
        type: String,
        required: [true,'User Name is required'],
        trim: true,
        minlength:[3, 'Minimun Name length must be 3 words'],
        maxlength:[30, 'Maximun Name length must be 30 words']
        
    },
    mail: {
        type: String,
        required: [true, 'User email is required'],
        trim: true,
        unique: true,
        lowercase: true,
        validate: {
            validator: function (v) {
                // Regular expression for a valid email address
                const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
                
                // Test if the provided email matches the regular expression
                return emailRegex.test(v);
            },
            message: 'Please enter a valid email address'
        }
    },
    password:{
        type: String,
        required: [true,'User password is required'],
        trim: true,
        minlength:[6, 'Minimun Name length must be 6 words'], 
        set: (v) => bcrypt.hashSync(v, bcrypt.genSaltSync(10))
       
    },
    image:{
        type: String,
    },
    address:{
        type: String,
        required: [true,'User address is required'],
    },
    phone:{
        type: String,
        required: [true,'User phone is required'],
    },
    isAdmin:{
        type: Boolean,
        default: false
    },
    isBanned:{
        type: Boolean,
        default: false
    },
},{timestamps: true});