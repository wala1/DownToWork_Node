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
            DateOfBirth: user.DateOfBirth,
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
            console.log("req.body.email : "+ req.body.email);
            console.log("req.body.email : "+ req.body.email);
    
            axios
                .get("https://www.googleapis.com/oauth2/v3/userinfo", {
                headers: {
                    "Authorization": `Bearer ${googleAccessToken}`
                }
            })
                .then(async response => {
                    console.log("here are the response data: "+ response.data.email);
                    const name = response.data.given_name;
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
            // gogole-auth
        if(req.body.googleAccessToken){
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
                    const name = response.data.given_name;
                    const email = response.data.email;
                    const picture = response.data.picture;
    
                    const existingUser = await User.findOne({email})

                    if (!existingUser) 
                    return res.status(404).json({message: "User don't exist!"})
                    
                    const token = jwt.sign({
                        email: existingUser.email,
                        id: existingUser._id
                    }, config.get(process.env.JWT_SECRET), {expiresIn: "1h"});
                    
                    console.log(token); // log the token
                    
                    res
                        .status(200)
                        .json({result: existingUser, token});
                    
                        
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
            let user = await User.findOne({ email })
        
            if (!user) {
                res.status(401).send("invalid email or password")
                throw new Error('Invalid email or password')
            }
        
            if (!user.isActivated) {
                user.isActivated = true;
                await user.save();
            }
        
            if (!user.isConfirmed) {
                res.status(401).send("Please confirm your email")
                throw new Error('Please confirm your email')
            } else if (user.isDeleted) {
                res.status(401).send("Your account is deleted")
                throw new Error('Your account is deleted')
            } else if (user.isBlocked) {
                res.status(401).send("Your account is blocked")
                throw new Error('Your account is blocked')
            } else if (await bcrypt.compare(password, user.password)) {
                const { password, ...userWithoutPassword } = user.toObject();
                res.json({
                    user: userWithoutPassword,
                    token: generateToken(user._id),
                })
            } else {
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


//             Fetch User By id 
const findById =  (req , res , next ) => {
 
    const id = req.params.id ;
      User.findOne({_id :req.params.id })
    .then((user) => {(user)? res.send(user):res.status(400).send({message :"Not found user with id "+ req.params.id })})
    .catch((err) =>res.status(500).send({ message: "Error retrieving user with id " + req.params.id  , error : +err}))
    
} 



//            Desactivate account
const desactivateAccount = async(req,res) => {
    try{
       
        const user = await User.findByIdAndUpdate(req.params.id , {$set:{
            isActivated  : false
        }} , {new : true});
        res.status(200).send({success:true, msg:" The user " + user.name+ " is blocked" , data: user});
        

    }catch(error){
        res.status(400).send({success:false, msg:error.message});
    }
    
}

//           Editer account 
const update = async (req, res)=>{

    if(Object.keys(req.body).length === 0){ return res.status(400).send({ message : "User with new informations must be provided"})}

    const id = req.params.id;

    //The { useFindAndModify: false} option is used to avoid using the deprecated findAndModify() method
    //The { new: true } option tells Mongoose to return the updated document instead of the original one.
    await  User.findByIdAndUpdate(id,req.body, { useFindAndModify: false , new: true})
    .then(user => {(!user) ? res.status(404).send({ message : `Cannot Update user with ${id}. Maybe user not found!`}) :res.send(user)})
    .catch(err => res.status(500).json({ message : "Error Update user information" , error : err}))
}

    


/*   ############################  PASSWORD RECOVERY ######################################### */
            
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
            html :  `<!DOCTYPE html>
            <html lang="en" >
            <head>
              <meta charset="UTF-8">
              <title>CodePen - OTP Email Template</title>
              
            </head>
            <body>
            <!-- partial:index.partial.html -->
            <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
              <div style="margin:50px auto;width:70%;padding:20px 0">
                <div style="border-bottom:1px solid #eee">
                  <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Koding 101</a>
                </div>
                <p style="font-size:1.1em">Hi,</p>
                <p>Thank you for choosing Koding 101. Use the following OTP to complete your Password Recovery Procedure. OTP is valid for 5 minutes</p>
                <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${token}</h2>
                <p style="font-size:0.9em;">Regards,<br />Koding 101</p>
                <hr style="border:none;border-top:1px solid #eee" />
                <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
                  <p>Koding 101 Inc</p>
                  <p>1600 Amphitheatre Parkway</p>
                  <p>California</p>
                </div>
              </div>
            </div>
            <!-- partial -->
              
            </body>
            </html>`

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
            const _otp = Math.floor(1000 + Math.random() * 9000);
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


/// send code

const verifyCode = async(req, res) => {
    console.log(req.body)
    let user = await User.findOne({ otp: req.body.otp });
    if(!user) return res.send({ code: 400, message: ' code is invalid ' });
    res.send({ code: 200, message: 'code is valid' , data:user} );
   
}

/// change pass
const ChangePassword = async (req,res) => {
    console.log(req.body);
    let user = await User.findOne({ otp: req.body.otp });
    const password= req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    user = await User.updateOne({email : user.email}, {password:hashedPassword , otp:null}).then(result => {
                res.send({ code: 200, message: 'Password updated', data:user })
            }).catch(err => {
                res.send({ code: 500, message: 'Server err' })
})
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
   
}
/* ################################ ADMIN : BLOCK , UNBLOCK ######################*/
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
    findById,
    desactivateAccount,
    update,
    registerUser,
    LoginUser,
    signinController,
    signupController,
    GetUser,
    forgetPassword,
    blockUser,
    unblockUser,
    verifyCode,
    ChangePassword
}