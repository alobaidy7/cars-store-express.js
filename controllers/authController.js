const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const { User, validateRegisterUser,validateLoginUser } = require("../models/User")



/***************************************
 * @desc Register New User
 * @route /api/auth/register
 * @method POST
 * @access Public
***************************************/
module.exports.registerUserCtrl = asyncHandler(async(req,res)=>{
   
    // validation
   const {error} = validateRegisterUser(req.body);
   if (error){
    return res.status(400).json({message: error.details[0].message});
   }

    // is user already exist
    let user = await User.findOne({email: req.body.email})
    if (user){
        return res.status(400).json({message: "User Already Exist !"})
    }


    // hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password,salt);
    
    user = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,

    });

    await user.save();

    res.status(201).json({message: "you registered successfully, please log in"})




    // new user and save it to db
    // send response to user
});







/***************************************
 * @desc Login User
 * @route /api/auth/login
 * @method POST
 * @access Public
***************************************/
module.exports.loginUserCtrl = asyncHandler(async(req,res)=>{
    // validation
    const {error} = validateLoginUser(req.body);
    if (error){
    return res.status(400).json({message: error.details[0].message});
   }


    // is user not exist
    let user = await User.findOne({email: req.body.email})
    if (!user){
        return res.status(400).json({message: "Invalid Email or Password !"})
    }


    // check password
    const isPasswordMatch = await bcrypt.compare(req.body.password, user.password)
    if (!isPasswordMatch){
        return res.status(400).json({message: "Invalid Email or Password !"})
    }


    // generate token
    const token = user.generateAuthToken();

    // send response to client

    res.status(200).json({
        _id: user._id,
        isAdmin: user.isAdmin,
        profilePhoto: user.profilePhoto,
        token
    })
})