const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const axios = require("axios");
const config = require("config");
const asyncHandler = require('express-async-handler');
const User = require('../models/user');
const nodemailer = require('nodemailer');
const randomstring = require('randomstring');
const mailConfig = require('../config/configMail.json');

    ////register user

    const registerUser = asyncHandler(async (req, res) => {
        const { name, email, password } = req.body

        if(!name || !email || !password ) {
            res.status(400)
            throw new Error('Please enter all fields')
        }
        
        const userExists = await User.findOne({ email })
        
        if (userExists) {
            res.status(400)
            throw new Error('User already exists')
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        
        const user = await User.create({
            name,
            email,
            // DateOfBirth,
            password: hashedPassword,
        })
        
        if (user) {
            res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            // DateOfBirth: user.DateOfBirth,
            //token: generateToken(user._id),
            })
        } else {
            res.status(400)
            throw new Error('Invalid user data')
        }
    });


    ////register user with google auth

    const signupController = async(req, res) => {
        if (req.body.googleAccessToken) {
            const {googleAccessToken} = req.body;
    
            console.log("req.body.googleAccessToken : "+ req.body.googleAccessToken);
    
            axios
                .get("https://www.googleapis.com/oauth2/v3/userinfo", {
                headers: {
                    "Authorization": `Bearer ${googleAccessToken}`
                }
            })
                .then(async response => {
                    console.log("here are the response data: "+ response.data.email);
                    const given_name = response.data.given_name;
                    const family_name = response.data.family_name;
                    const email = response.data.email;
                    const picture = response.data.picture;
    
                    const existingUser = await User.findOne({email})
    
                    if (existingUser){ 
                        return res.status(400).json({message: "User already exist!"});
                    }
    
                    const result = await User.create({verified:"true",email, firstName, lastName, profilePicture: picture})
    
                    const token = jwt.sign({
                        email: result.email,
                        id: result._id
                    }, config.get(process.env.JWT_SECRET), {expiresIn: "1h"})
    
                    res
                        .status(200)
                        .json({result, token})
                })
                .catch(err => {
                    res
                        .status(400)
                        .json({message: "Invalid access token!"})
                })
    
        }
    }

    ////login user with google auth

    const signinController = async(req, res) => {
        if(req.body.googleAccessToken){
            // gogole-auth
            const {googleAccessToken} = req.body;
            console.log("req.body.googleAccessToken : "+ req.body.googleAccessToken);
            
            axios
                .get("https://www.googleapis.com/oauth2/v3/userinfo", {
                headers: {
                    "Authorization": `Bearer ${googleAccessToken}`
                }
            })
                .then(async response => {
                    console.log("here are the response data: "+ response.data.email);
                    const firstName = response.data.given_name;
                    const lastName = response.data.family_name;
                    const email = response.data.email;
                    const picture = response.data.picture;
    
                    const existingUser = await User.findOne({email})
    
                    if (!existingUser) 
                    return res.status(404).json({message: "User don't exist!"})
    
                    const token = jwt.sign({
                        email: existingUser.email,
                        id: existingUser._id
                    }, config.get(process.env.JWT_SECRET), {expiresIn: "1h"})
            
                    res
                        .status(200)
                        .json({result: existingUser, token})
                        
                })
                .catch(err => {
                    console.error(err);
                    res
                        .status(400)
                        .json({message: "Invalid access token!"})
                })
        }
    }




        //normal-auth

        const LoginUser = asyncHandler(async (req, res) => {
            const { email, password } = req.body;
            console.log(req.body);
            const user = await User.findOne({ email })

            if (user 
                && user.isConfirmed 
                && (!user.isDeleted)
                &&(!user.isBlocked)
                &&(await bcrypt.compare(password, user.password))) {
                const {password, ...userWithoutPassword} = user.toObject();
                res.json({
                user: userWithoutPassword,
                token: generateToken(user._id),


                })
            } else if(user && !user.isConfirmed){
                res.status(401).send("Please confirm your email")
                throw new Error('Please confirm your email')
            }else if(user && user.isDeleted){
                res.status(401).send("Your account is deleted")
                throw new Error('Your account is deleted')
            }else if(user && user.isBlocked){
                res.status(401).send("Your account is blocked")
                throw new Error('Your account is blocked')
            }
            else {
                res.status(401)
                throw new Error('Invalid email or password')
            }
            console.log(user);
        });

        ////generate token

        const generateToken = (id) => {
            return jwt.sign({ id }, process.env.JWT_SECRET, {
                expiresIn: '30d',
            })
            }

        const GetUser = asyncHandler(async (req, res) => {
            res.status(200).json(req.user)
            });


    //****************** update  *****************/
    






            
///send mail

const sentResetPasswordMail = async(name , email , token) => {
    try{
        const transporter = nodemailer.createTransport({
            host:'smtp.gmail.com',
            port:587,
            secure:false,
            requireTLS : true,
            auth: {
                user : mailConfig.emailUser,
                pass:mailConfig.emailPassword
            }
        });
        const mailOptions = {
            from : mailConfig.emailUser,
            to : email,
            subject : 'For Reset Password',
            html : '<p> Welcome ' + name + ',Please copy the link <a href="http://localhost:3000/users/reset-password?token='+token+'">  and reset your password </a>'
        }
        transporter.sendMail(mailOptions,function(error,info){
            if(error){
                console.log(error);
            }else{
                console.log("Mail has been sent" , info.response);
            }
        });

    }catch(error){
        res.status(400).send({success:false,msg:error.message});
    }

}


/// forget password 

const forgetPassword = async(req , res , next) => {
    try{
        const email = req.body.email;
        const user = await User.findOne({email});
        if(user){
            console.log("hello");
            const randomstringtoken = randomstring.generate();
            console.log(randomstringtoken);
            const data = await User.updateOne({email},{$set:{tokenPass : randomstringtoken}});
            sentResetPasswordMail(user.name , user.email,randomstringtoken);
            res.status(200).send({success:true,msg:"Please check your inbox "});
        }else{
            res.status(400).send("The given mail does not exist");
        }
    }catch(error){
        res.status(400).send({success:false, msg:error.message});
    }
}

/// reset password
        
const resetPassword = async(req, res) => {
    try{
        const token = req.query.token;
        const tokenUser = await User.findOne({tokenPass : token});
        console.log(tokenUser.email);
        if(tokenUser){
            const password = req.body.password;
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            const userData = await User.findByIdAndUpdate({_id:tokenUser._id} , {$set:{
                password : hashedPassword, 
                tokenPass : ''
            }}, {new:true});
            res.status(200).send({success:true, msg:" Password has been reset" , data: userData});


        }else{
              res.status(400).send({success:false, msg:"this link has bee expired"});
                    
        }

    }catch(error){
                res.status(400).send({success:false, msg:error.message});
    }
}


// block User 
const blockUser = async(req,res) => {
    try{
       
        const user = await User.findByIdAndUpdate(req.params.id , {$set:{
            isBlocked : true
        }} , {new : true});
        res.status(200).send({success:true, msg:" The user " + user.name+ " is blocked" , data: user});
        

    }catch(error){
        res.status(400).send({success:false, msg:error.message});
    }
    
}
// unblock User 
const unblockUser = async(req,res) => {
    try{
        const user = await User.findByIdAndUpdate({_id:req.params.id} , {$set:{
            isBlocked : false
        }} , {new : true});
        res.status(200).send({success:true, msg:" The user " + user.name+ " is unblocked" , data: user});


    }catch(error){
        res.status(400).send({success:false, msg:error.message});
    }
    
}





        
module.exports = {
    registerUser,
    LoginUser,
    signinController,
    signupController,
    GetUser,
    resetPassword,
    forgetPassword,
    blockUser,
    unblockUser
}