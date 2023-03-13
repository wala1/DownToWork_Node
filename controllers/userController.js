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
        res.status(400).send('user exists')
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
            res.status(401).send("invalid email or password")
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
            // html : '<p> Welcome ' + name + ',Please copy the link <a href="http://localhost:3000/reset-password?token='+token+'">  and reset your password </a>'
            html : '<p> Welcome ' + name + ', Go to this  <a href="http://localhost:3000/new-submit">  link  </a> and  enter this number  '+token+' to reset your password'

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
            // const randomstringtoken = randomstring.generate();
            const _otp = Math.floor(100000 + Math.random() * 900000);
            // console.log(randomstringtoken);
            console.log(_otp);
            // const data = await User.updateOne({email},{$set:{tokenPass : randomstringtoken}});
            const data = await User.updateOne({email},{$set:{otp : _otp }});

            // sentResetPasswordMail(user.name , user.email,randomstringtoken);
            sentResetPasswordMail(user.name , user.email,_otp);

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
const submitotp = async(req, res) => {
    console.log(req.body)
    let user = await User.findOne({ otp: req.body.otp });
    const password= req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    user = User.updateOne({email : user.email}, {password:hashedPassword , otp:null}).then(result => {
        res.send({ code: 200, message: 'Password updated' })
    }).catch(err => {
        res.send({ code: 500, message: 'Server err' })
    })
    
    
    // .then(result => {
    //     //  update the password 
    //     User.updateOne({ email: result.email }, { password: req.body.password })
    //         .then(result => {
    //             res.send({ code: 200, message: 'Password updated' })
    //         })
    //         .catch(err => {
    //             res.send({ code: 500, message: 'Server err' })
    //         })
    // }).catch(err => {
    //     res.send({ code: 500, message: 'otp is wrong' })
    // })
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
    GetUser,
    resetPassword,
    forgetPassword,
    blockUser,
    unblockUser,
    submitotp
}