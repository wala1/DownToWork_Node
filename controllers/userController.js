const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
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

    ////login user

    const LoginUser = asyncHandler(async (req, res) => {
        const { email, password } = req.body;
        console.log(req.body);
        const user = await User.findOne({ email })

        if (user && (await bcrypt.compare(password, user.password))) {
            const {password, ...userWithoutPassword} = user.toObject();
            res.json({
            user: userWithoutPassword,
            token: generateToken(user._id),


            })
        } else {
            res.status(401)
            throw new Error('Invalid email or password')
        }
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




        

    module.exports = {
        registerUser,
        LoginUser,
        GetUser,
        resetPassword,
        forgetPassword
      }