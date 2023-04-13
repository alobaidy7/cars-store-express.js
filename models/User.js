const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken")

// User Schema
const UserSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength:100
    },

    email:{
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength:100,
        unique: true
    },

    password:{
        type: String,
        required: true,
        trim: true,
        minlength: 8,
        
    },

    profilePhoto:{
        type: Object,
        default:{
            url: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png",
            publicId : null
        }
    },

    bio: {
        type: String,
    },

    isAdmin: {
        type: Boolean,
        default: false,
    },

    isAccountVerified:{
        type: Boolean,
        default:false,
    },
},

{
    timestamps:true
}

);

// generate auth token
UserSchema.methods.generateAuthToken = function(){
    return jwt.sign({id: this._id, isAdmin: this.isAdmin}, process.env.JWT_SECRET, {
        expiresIn: "30d"
    })
}

// User Model
const User = mongoose.model("User", UserSchema);

// validate User model (Register)
function validateRegisterUser(obj){
    const schema = Joi.object({
        username: Joi.string().trim().min(3).max(50).required(),
        email: Joi.string().trim().min(5).max(100).required().email(),
        password: Joi.string().trim().min(8).required(),
    })
    return schema.validate(obj);
}


// validate User model (login)
function validateLoginUser(obj){
    const schema = Joi.object({
        email: Joi.string().trim().min(5).max(100).required().email(),
        password: Joi.string().trim().min(8).required(),
    })
    return schema.validate(obj);
}


// validate User model (Update)
function validateUpdateUser(obj){
    const schema = Joi.object({
        username: Joi.string().trim().min(3).max(50).required().email(),
        password: Joi.string().trim().min(8),
        bio: Joi.string(),
    })
    return schema.validate(obj);
}



module.exports = {
    User,
    validateRegisterUser,
    validateLoginUser,
    validateUpdateUser,
};