// const jwt = require ('jsonwebtoken');
// const bcrypt = require ('bcryptjs');
// const axios = require ('axios');
// const config = require ('config');
// const asyncHandler = require ('express-async-handler');
// const User = require ('../models/user');
// const nodemailer = require ('nodemailer');
// const randomstring = require ('randomstring');
// const mailConfig = require ('../config/configMail.json');
// const multer = require ('multer');
// const path = require ('path');
// const fs = require ('fs');
// const sendCredentials = require ('../ConfigMailing');

// /* // Définir la destination et le nom du fichier téléchargé
// const storage = multer.diskStorage({
//     destination: function(req, file, cb) {
//       cb(null, 'uploads');
//     },
//     filename: function (req, file, cb) {
//         cb(null, Date.now() + '-' + file.originalname)
//       }
//   });
  
// // Définir les types de fichiers acceptés
// const upload = multer({
//     storage: storage,
//     limits: {fileSize: 10000000},
//     fileFilter: function(req, file, cb) {
//       checkFileType(file, cb);
//     }
//   }).single('picture');

// // Vérifier le type de fichier
// function checkFileType(file, cb) {
//     // Les types de fichiers autorisés
//     const filetypes = /jpeg|jpg|png|gif/;
//     // Vérifier l'extension du fichier
//     const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
//     // Vérifier le type MIME du fichier
//     const mimetype = filetypes.test(file.mimetype);
  
//     if (mimetype && extname) {
//       return cb(null, true);
//     } else {
//       cb('Error: Images Only!');
//     }
//   }
//  */
// ////register user

// const registerUser = asyncHandler (async (req, res) => {
//   const {name, email, DateOfBirth, password} = req.body;

//   if (!name || !email || !password || !DateOfBirth) {
//     res.status (400);
//     throw new Error ('Please enter all fields');
//   }

//   const userExists = await User.findOne ({email});

//   if (userExists) {
//     res.status (400).send ('user exists');
//     throw new Error ('User already exists');
//   }

//   const salt = await bcrypt.genSalt (10);
//   const hashedPassword = await bcrypt.hash (password, salt);
//   ////confirmationMail////
//   const characters =
//     '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
//   let activationCode = '';
//   for (let i = 0; i < 25; i++) {
//     activationCode +=
//       characters[Math.floor (Math.random () * characters.length)];
//   }

//   ////confirmationMail////
//   const user = await User.create ({
//     name,
//     email,
//     DateOfBirth,
//     password: hashedPassword,
//     //jdid
//     activationCode: activationCode,
//   });

//   if (user) {
//     res.status (201).json ({
//       _id: user._id,
//       name: user.name,
//       email: user.email,
//       DateOfBirth: user.DateOfBirth,
//       token: generateToken (user._id),
//     });
// <<<<<<< HEAD
//     const sendConfirmationEmail = async (email, activationCode) => {
//         try {
//             const transporter = nodemailer.createTransport({
//                 host: 'smtp.gmail.com',
//                 port: 587,
//                 secure: false,
//                 requireTLS: true,
//                 auth: {
//                     user: "DownToWork98@gmail.com",
//                     pass: "xhcqnjahqhsgublw"
//                 }
//             });
//             const mailOptions = {
//                 from: "DownToWork98@gmail.com",
//                 to: email,
//                 subject: 'For account confirmation',
//                 // html : '<p> Welcome ' + name + ',Please copy the link <a href="http://localhost:3000/reset-password?token='+token+'">  and reset your password </a>'
//                 html: `
// =======
//     sendConfirmationEmail (user.email, user.activationCode);
//   } else {
//     res.status (400);
//     throw new Error ('Invalid user data');
//   }
// });
// const sendConfirmationEmail = async (email, activationCode) => {
//   try {
//     const transporter = nodemailer.createTransport ({
//       host: 'smtp.gmail.com',
//       port: 587,
//       secure: false,
//       requireTLS: true,
//       auth: {
//         user: mailConfig.emailUser,
//         pass: mailConfig.emailPassword,
//       },
//     });
//     const mailOptions = {
//       from: mailConfig.emailUser,
//       to: email,
//       subject: 'For account confirmation',
//       // html : '<p> Welcome ' + name + ',Please copy the link <a href="http://localhost:3000/reset-password?token='+token+'">  and reset your password </a>'
//       html: `
// >>>>>>> main
//                 <div>
//                 <h1>Activation du compte </h1>
                  
//                   <p>Veuillez confirmer votre email en cliquant sur le lien suivant
//           </p>
//                   <a href=http://localhost:3000/confirm/${activationCode}>Cliquez ici
//           </a>
          
//                   </div>`,
//     };
//     transporter.sendMail (mailOptions, function (error, info) {
//       if (error) {
//         console.log (error);
//       } else {
//         console.log ('Mail has been sent', info.response);
//       }
//     });
//   } catch (error) {
//     //res.status(400).send({success:false,msg:error.message});
//   }
// };

// const verifyUser = async (req, res) => {
//   User.findOne ({activationCode: req.params.activationCode}, function (
//     err,
//     user
//   ) {
//     if (err) {
//       // Handle error
//       console.log ('errror');
//     }

//     // Update the field
//     user.isConfirmed = true;

//     // Save the changes
//     user.save (function (err) {
//       if (err) {
//         // Handle error
//         console.log ('error2');
//       }

//       // Document updated successfully
//       res.send ('Document updated');
//     });
//   });
// };

// ////register user with google auth

// const signupController = async (req, res) => {
//   if (req.body.googleAccessToken) {
//     const {googleAccessToken} = req.body;

//     console.log ('req.body.googleAccessToken : ' + req.body.googleAccessToken);
//     console.log ('req.body.email : ' + req.body.email);
//     console.log ('req.body.email : ' + req.body.email);

//     axios
//       .get ('https://www.googleapis.com/oauth2/v3/userinfo', {
//         headers: {
//           Authorization: `Bearer ${googleAccessToken}`,
//         },
//       })
//       .then (async response => {
//         console.log ('here are the response data: ' + response.data.email);
//         const name = response.data.given_name;
//         const email = response.data.email;
//         const picture = response.data.picture;

//         const existingUser = await User.findOne ({email});

//         if (existingUser) {
//           return res.status (400).json ({message: 'User already exist!'});
//         }

//         const result = await User.create ({
//           verified: 'true',
//           email,
//           firstName,
//           lastName,
//           profilePicture: picture,
//         });

//         const token = jwt.sign (
//           {
//             email: result.email,
//             id: result._id,
//           },
//           config.get (process.env.JWT_SECRET),
//           {expiresIn: '1h'}
//         );

//         res.status (200).json ({result, token});
//       })
//       .catch (err => {
//         res.status (400).json ({message: 'Invalid access token!'});
//       });
//   }
// };

// ////login user with google auth

// const signinController = async (req, res) => {
//   // gogole-auth
//   if (req.body.googleAccessToken) {
//     const {googleAccessToken} = req.body;
//     console.log ('req.body.googleAccessToken : ' + req.body.googleAccessToken);

//     axios
//       .get ('https://www.googleapis.com/oauth2/v3/userinfo', {
//         headers: {
//           Authorization: `Bearer ${googleAccessToken}`,
//         },
//       })
//       .then (async response => {
//         console.log ('here are the response data: ' + response.data.email);
//         const name = response.data.given_name;
//         const email = response.data.email;
//         const picture = response.data.picture;

//         const existingUser = await User.findOne ({email});

//         if (!existingUser)
//           return res.status (404).json ({message: "User don't exist!"});

//         const token = jwt.sign (
//           {
//             email: existingUser.email,
//             id: existingUser._id,
//           },
//           config.get (process.env.JWT_SECRET),
//           {expiresIn: '1h'}
//         );

//         console.log (token); // log the token

//         res.status (200).json ({result: existingUser, token});
//       })
//       .catch (err => {
//         console.error (err);
//         res.status (400).json ({message: 'Invalid access token!'});
//       });
//   }
// };

// //normal-auth

// const LoginUser = asyncHandler (async (req, res) => {
//   const {email, password} = req.body;
//   console.log (req.body);
//   let user = await User.findOne ({email});

//   if (!user) {
//     res.status (401).send ('invalid email or password');
//     throw new Error ('Invalid email or password');
//   }

//   if (!user.isActivated) {
//     user.isActivated = true;
//     await user.save ();
//   }

//   if (!user.isConfirmed) {
//     res.status (401).send ('Please confirm your email');
//     throw new Error ('Please confirm your email');
//   } else if (user.isDeleted) {
//     res.status (401).send ('Your account is deleted');
//     throw new Error ('Your account is deleted');
//   } else if (user.isBlocked) {
//     res.status (401).send ('Your account is blocked');
//     throw new Error ('Your account is blocked');
//   } else if (await bcrypt.compare (password, user.password)) {
//     const {password, ...userWithoutPassword} = user.toObject ();
//     res.json ({
//       user: userWithoutPassword,
//       token: generateToken (user._id),
//     });
//   } else {
//     res.status (401).send ('invalid email or password');
//     throw new Error ('Invalid email or password');
//   }

//   console.log (user);
// });

// ////generate token

// const generateToken = id => {
//   return jwt.sign ({id}, process.env.JWT_SECRET, {
//     expiresIn: '30d',
//   });
// };

// const GetUser = asyncHandler (async (req, res) => {
//   res.status (200).json (req.user);
// });

// //             Signup with Facebook

// const signupFb = async (req, res, next) => {
//   const name = req.body.name;
//   const email = req.body.email;
//   const imagePath = req.body.imagePath;
//   const password = 'Facebook' + Math.floor (Math.random () * 100000000);

//   const userExists = await User.findOne ({email});

//   if (userExists) {
//     res.status (400).send ('user exists');
//     throw new Error ('User already exists');
//   }

//   const salt = await bcrypt.genSalt (10);
//   const hashedPassword = await bcrypt.hash (password, salt);

//   const picture = {
//     data: null,
//     contentType: null,
//     imagePath: imagePath,
//   };

//   const user = await User.create ({
//     name,
//     email,
//     password: hashedPassword,
//     picture: picture,
//   });

//   if (user) {
//     res.status (201).json ({
//       _id: user._id,
//       name: user.name,
//       email: user.email,
//       DateOfBirth: user.DateOfBirth,
//       picture: user.picture,
//       token: generateToken (user._id),
//     });

//     //sendCredentials(name,email,password)
//   } else {
//     res.status (400).send ('Invalid user data');
//   }
// };
// //             Fetch User By id
// const findById = (req, res, next) => {
//   const id = req.params.id;
//   User.findOne ({_id: req.params.id})
//     .then (user => {
//       if (user) {
//         res.setHeader ('Cache-Control', 'no-cache, no-store');
//         res.setHeader ('Expires', '0');
//         res.send (user);
//       } else {
//         res
//           .status (400)
//           .send ({message: 'Not found user with id ' + req.params.id});
//       }
//     })
//     .catch (err => {
//       res.status (500).send ({
//         message: 'Error retrieving user with id ' + req.params.id,
//         error: +err,
//       });
//     });
// };
// //            GetImagePath

// const GetImagePath = async (req, res) => {
//   const id = req.params.id;
//   User.findOne ({_id: id})
//     .then (user => {
//       res.setHeader ('Cache-Control', 'no-cache, no-store');
//       res.setHeader ('Expires', '0');
//       console.log ('yessss ');
//       res.send (user.picture.imagePath);
//     })
//     .catch (err => {
//       res.status (500).send ({
//         message: 'Error retrieving user with id ' + req.params.id,
//         error: +err,
//       });
//     });
// };
// //            Desactivate account
// const desactivateAccount = async (req, res) => {
//   try {
//     const user = await User.findByIdAndUpdate (
//       req.params.id,
//       {$set: {isActivated: false}},
//       {new: true}
//     );
//     res.status (200).send ({
//       success: true,
//       msg: ' The user ' + user.name + 'account is desactivated',
//       data: user,
//     });
//   } catch (error) {
//     res.status (400).send ({success: false, msg: error.message});
//   }
// };

// //           Editer account
// const update = async (req, res) => {
//   if (Object.keys (req.body).length === 0) {
//     return res
//       .status (400)
//       .send ({message: 'User with new informations must be provided'});
//   }

//   const id = req.params.id;

//   //The { useFindAndModify: false} option is used to avoid using the deprecated findAndModify() method
//   //The { new: true } option tells Mongoose to return the updated document instead of the original one.
//   await User.findByIdAndUpdate (id, req.body, {
//     useFindAndModify: false,
//     new: true,
//   })
//     .then (user => {
//       !user
//         ? res.status (404).send ({
//             message: `Cannot Update user with ${id}. Maybe user not found!`,
//           })
//         : res.send (user);
//     })
//     .catch (err =>
//       res
//         .status (500)
//         .json ({message: 'Error Update user information', error: err})
//     );
// };

// //           Change Password

// const changePwd = async (req, res) => {
//   console.log ('Hello from change password');
//   try {
//     const user = await User.findById (req.params.id);
//     if (!user) {
//       return res.status (404).json ({message: 'User not found'});
//     }
//     const {oldPassword, newPassword} = req.body;
//     const isMatch = await bcrypt.compare (oldPassword, user.password);
//     if (!isMatch) {
//       return res.status (400).json ({message: 'Incorrect password'});
//     }
//     const salt = await bcrypt.genSalt (10);
//     const hashedPassword = await bcrypt.hash (newPassword, salt);
//     user.password = hashedPassword;
//     await user.save ();
//     res.json ({message: 'Password updated successfully'});
//   } catch (err) {
//     console.error (err);
//     res.status (500).json ({message: 'Internal server error'});
//   }
// };

// //           Update photo profile

// const updateImg = async (req, res) => {
//   const id = req.params.id;
//   const user = await User.findById (id);
//   if (!user) {
//     return res.status (404).json ({errors: [{msg: 'User not found'}]});
//   }
//   try {
//     user.picture.data = req.file.buffer;
//     user.picture.contentType = req.file.mimetype;
//     user.picture.imagePath = req.file.path;

//     await user.save ();
//     return res.status (200).json ({user});
//   } catch (err) {
//     console.log (err);
//     return res.status (500).send ('Server Error');
//   }
// };

// //         Enpoint to get All users

// const findAll = async (req, res, next) => {
//   console.log ('hello from get users');
//   User.find ()
//     .then (users => {
//       res.setHeader ('Cache-Control', 'no-cache, no-store');
//       res.setHeader ('Expires', '0');
//       res.status (200).send (users);
//       console.log (users);
//     })
//     .catch (err => res.status (500).send ({message: 'Error retrieving users'}));
// };
// /*   ############################  PASSWORD RECOVERY ######################################### */

// ///send mail

// const sentResetPasswordMail = async (name, email, token) => {
//   try {
//     const transporter = nodemailer.createTransport ({
//       host: 'smtp.gmail.com',
//       port: 587,
//       secure: false,
//       requireTLS: true,
//       auth: {
//         user: mailConfig.emailUser,
//         pass: mailConfig.emailPassword,
//       },
//     });
//     const mailOptions = {
//       from: mailConfig.emailUser,
//       to: email,
//       subject: 'For Reset Password',
//       // html : '<p> Welcome ' + name + ',Please copy the link <a href="http://localhost:3000/reset-password?token='+token+'">  and reset your password </a>'
//       html: `<!DOCTYPE html>
//             <html lang="en" >
//             <head>
//               <meta charset="UTF-8">
//               <title>CodePen - OTP Email Template</title>
              
//             </head>
//             <body>
//             <!-- partial:index.partial.html -->
//             <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
//               <div style="margin:50px auto;width:70%;padding:20px 0">
//                 <div style="border-bottom:1px solid #eee">
//                   <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Down To Work </a>
//                 </div>
//                 <p style="font-size:1.1em">Hi,</p>
//                 <p>Thank you for choosing Down To Work. Use the following CODE to complete your Password Recovery Procedure. </p>
//                 <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${token}</h2>
//                 <p style="font-size:0.9em;">Regards,<br />DTW</p>
//                 <hr style="border:none;border-top:1px solid #eee" />
//                 <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
//                   <p>Down To Work</p>
//                   <p>Tunisia , </p>
//                   <p>TN</p>
//                 </div>
//               </div>
//             </div>
//             <!-- partial -->
              
//             </body>
//             </html>`,
//     };
//     transporter.sendMail (mailOptions, function (error, info) {
//       if (error) {
//         console.log (error);
//       } else {
//         console.log ('Mail has been sent', info.response);
//       }
//     });
//   } catch (error) {
//     res.status (400).send ({success: false, msg: error.message});
//   }
// };

// // delete account
// const deleteAccount = async (req, res, next) => {
//   try {
//     const {email, password} = req.body;
//     const user = await User.findOne ({email: email});
//     if (!user) {
//       return res.status (400).send ({success: false, msg: 'User not found'});
//     }

//     // Check if the password is correct
//     const passwordMatch = await bcrypt.compare (password, user.password);
//     if (!passwordMatch) {
//       return res
//         .status (400)
//         .send ({success: false, msg: 'Incorrect password'});
//     }

//     // Delete the user's account
//     await User.deleteOne ({_id: user._id});

//     res
//       .status (200)
//       .send ({success: true, msg: 'Account deleted successfully'});
//   } catch (error) {
//     console.error (error);
//     res.status (500).send ({success: false, msg: 'Something went wrong'});
//   }
// };

// /// forget password

// const forgetPassword = async (req, res, next) => {
//   try {
//     const email = req.body.email;
//     const user = await User.findOne ({email});
//     if (user) {
//       console.log ('hello');
//       // const randomstringtoken = randomstring.generate();
//       const _otp = Math.floor (1000 + Math.random () * 9000);
//       // console.log(randomstringtoken);
//       console.log (_otp);
//       // const data = await User.updateOne({email},{$set:{tokenPass : randomstringtoken}});
//       const data = await User.updateOne ({email}, {$set: {otp: _otp}});

//       // sentResetPasswordMail(user.name , user.email,randomstringtoken);
//       sentResetPasswordMail (user.name, user.email, _otp);

//       res.status (200).send ({success: true, msg: 'Please check your inbox '});
//     } else {
//       res.status (400).send ('The given mail does not exist');
//     }
//   } catch (error) {
//     res.status (400).send ({success: false, msg: error.message});
//   }
// };

// /// send code

// const verifyCode = async (req, res) => {
//   console.log (req.body);
//   let user = await User.findOne ({otp: req.body.otp});
//   if (!user) return res.send ({code: 400, message: ' code is invalid '});
//   res.send ({code: 200, message: 'code is valid', data: user});
// };

// /// change pass

// const ChangePassword = async (req, res) => {
//   console.log (req.body);
//   let user = await User.findOne ({otp: req.body.otp});
//   const password = req.body.password;
//   const salt = await bcrypt.genSalt (10);
//   const hashedPassword = await bcrypt.hash (password, salt);
//   user = await User.updateOne (
//     {email: user.email},
//     {password: hashedPassword, otp: null}
//   )
//     .then (result => {
//       res.send ({code: 200, message: 'Password updated', data: user});
//     })
//     .catch (err => {
//       res.send ({code: 500, message: 'Server err'});
//     });
// };

// const submitotp = async (req, res) => {
//   console.log (req.body);
//   let user = await User.findOne ({otp: req.body.otp});
//   const password = req.body.password;
//   const salt = await bcrypt.genSalt (10);
//   const hashedPassword = await bcrypt.hash (password, salt);
//   user = User.updateOne (
//     {email: user.email},
//     {password: hashedPassword, otp: null}
//   )
//     .then (result => {
//       res.send ({code: 200, message: 'Password updated'});
//     })
//     .catch (err => {
//       res.send ({code: 500, message: 'Server err'});
//     });
// };
// /* ################################ ADMIN : BLOCK , UNBLOCK ######################*/
// // block User
// const blockUser = async (req, res) => {
//   try {
//     const user = await User.findByIdAndUpdate (
//       req.params.id,
//       {
//         $set: {
//           isBlocked: true,
//         },
//       },
//       {new: true}
//     );
//     res.status (200).send ({
//       success: true,
//       msg: ' The user ' + user.name + ' is blocked',
//       data: user,
//     });
//   } catch (error) {
//     res.status (400).send ({success: false, msg: error.message});
//   }
// };
// // unblock User
// const unblockUser = async (req, res) => {
//   try {
//     const user = await User.findByIdAndUpdate (
//       {_id: req.params.id},
//       {
//         $set: {
//           isBlocked: false,
//         },
//       },
//       {new: true}
//     );
//     res.status (200).send ({
//       success: true,
//       msg: ' The user ' + user.name + ' is unblocked',
//       data: user,
//     });
//   } catch (error) {
//     res.status (400).send ({success: false, msg: error.message});
//   }
// };

// const classification = async (req, res) => {
//   try {
//     const userId = req.params.id;
//     const level = req.params.level;

//     const user = await User.findByIdAndUpdate (
//       userId,
//       {classification: level},
//       {new: true}
//     );

//     res.json (user);
//   } catch (error) {
//     console.error (error);
//     res.status (500).json ({message: 'Internal server error'});
//   }
// };

// module.exports = {
//   findById,
//   signupFb,
//   desactivateAccount,
//   changePwd,
//   update,
//   GetImagePath,
//   updateImg,
//   findAll,
//   registerUser,
//   LoginUser,
//   classification,
//   signinController,
//   signupController,
//   GetUser,
//   forgetPassword,
//   blockUser,
//   unblockUser,
//   submitotp,
//   deleteAccount,
//   verifyCode,
//   ChangePassword,
//   verifyUser,
// };




//////////////////////here////////////
// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcryptjs');
// const axios = require("axios");
// const config = require("config");
// const asyncHandler = require('express-async-handler');
// const User = require('../models/user');
// const nodemailer = require('nodemailer');
// const randomstring = require('randomstring');
// const mailConfig = require('../config/configMail.json');

//     ////register user
    
//     const registerUser = asyncHandler(async (req, res) => {
//         const { name, email,DateOfBirth, password } = req.body
    
//         if (!name || !email || !password || !DateOfBirth ) {
//             res.status(400)
//             throw new Error('Please enter all fields')
//         }
    
//         const userExists = await User.findOne({ email })
    
//         if (userExists) {
//             res.status(400).send('user exists')
//             throw new Error('User already exists')
//         }
    
//         const salt = await bcrypt.genSalt(10)
//         const hashedPassword = await bcrypt.hash(password, salt)
//         ////confirmationMail////
//         const characters =
//             "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
//         let activationCode = "";
//         for (let i = 0; i < 25; i++) {
//             activationCode += characters[Math.floor(Math.random() * characters.length)];
//         }
    
    
    
//         ////confirmationMail////
//         const user = await User.create({
//             name,
//             email,
//             DateOfBirth,
//             password: hashedPassword,
//             //jdid
//             activationCode: activationCode,
//         })
    
    
    
    
//         if (user) {
//             res.status(201).json({
//                 _id: user._id,
//                 name: user.name,
//                 email: user.email,
//                 DateOfBirth: user.DateOfBirth,
//                 token: generateToken(user._id),
    
//             })
//             sendConfirmationEmail(user.email, user.activationCode);
//         } else {
//             res.status(400)
//             throw new Error('Invalid user data')
//         }
//     });
//     const sendConfirmationEmail = async (email, activationCode) => {
//         try {
//             const transporter = nodemailer.createTransport({
//                 host: 'smtp.gmail.com',
//                 port: 587,
//                 secure: false,
//                 requireTLS: true,
//                 auth: {
//                     user: "DownToWork98@gmail.com",
//                     pass: "xhcqnjahqhsgublw"
//                 }
//             });
//             const mailOptions = {
//                 from: "DownToWork98@gmail.com",
//                 to: email,
//                 subject: 'For account confirmation',
//                 // html : '<p> Welcome ' + name + ',Please copy the link <a href="http://localhost:3000/reset-password?token='+token+'">  and reset your password </a>'
//                 html: `
//                 <div>
//                 <h1>Activation du compte </h1>
                  
//                   <p>Veuillez confirmer votre email en cliquant sur le lien suivant
//           </p>
//                   <a href=http://localhost:3000/confirm/${activationCode}>Cliquez ici
//           </a>
          
//                   </div>`
    
//             }
//             transporter.sendMail(mailOptions, function (error, info) {
//                 if (error) {
//                     console.log(error);
//                 } else {
//                     console.log("Mail has been sent", info.response);
//                 }
//             });
    
//         } catch (error) {
//             //res.status(400).send({success:false,msg:error.message});
//         }
    
//     }
    
//     const verifyUser = async(req,res)=>{
    
//         User.findOne({activationCode: req.params.activationCode}, function(err, user) {
//             if (err) {
//               // Handle error
//               console.log("errror")
//             }
          
//             // Update the field
//             user.isConfirmed = true;
          
//             // Save the changes
//             user.save(function(err) {
//               if (err) {
//                 // Handle error
//                 console.log("error2")
//               }
          
//               // Document updated successfully
//               res.send('Document updated');
//             });
//           });
    
//         }
    
//     ////register user with google auth

//     const signupController = async(req, res) => {
//         if (req.body.googleAccessToken) {
//             const {googleAccessToken} = req.body;
    
//             console.log("req.body.googleAccessToken : "+ req.body.googleAccessToken);
//             console.log("req.body.email : "+ req.body.email);
//             console.log("req.body.email : "+ req.body.email);
    
//             axios
//                 .get("https://www.googleapis.com/oauth2/v3/userinfo", {
//                 headers: {
//                     "Authorization": `Bearer ${googleAccessToken}`
//                 }
//             })
//                 .then(async response => {
//                     console.log("here are the response data: "+ response.data.email);
//                     const name = response.data.given_name;
//                     const email = response.data.email;
//                     const picture = response.data.picture;
    
//                     const existingUser = await User.findOne({email})
    
//                     if (existingUser){ 
//                         return res.status(400).json({message: "User already exist!"});
//                     }
    
//                     const result = await User.create({verified:"true",email, firstName, lastName, profilePicture: picture})
    
//                     const token = jwt.sign({
//                         email: result.email,
//                         id: result._id
//                     }, config.get(process.env.JWT_SECRET), {expiresIn: "1h"})
    
//                     res
//                         .status(200)
//                         .json({result, token})
//                 })
//                 .catch(err => {
//                     res
//                         .status(400)
//                         .json({message: "Invalid access token!"})
//                 })
    
//         }
//     }

//     ////login user with google auth

//     const signinController = async(req, res) => {
//             // gogole-auth
//         if(req.body.googleAccessToken){
//             const {googleAccessToken} = req.body;
//             console.log("req.body.googleAccessToken : "+ req.body.googleAccessToken);
            
//             axios
//                 .get("https://www.googleapis.com/oauth2/v3/userinfo", {
//                 headers: {
//                     "Authorization": `Bearer ${googleAccessToken}`
//                 }
//             })
//                 .then(async response => {
//                     console.log("here are the response data: "+ response.data.email);
//                     const name = response.data.given_name;
//                     const email = response.data.email;
//                     const picture = response.data.picture;
    
//                     const existingUser = await User.findOne({email})

//                     if (!existingUser) 
//                     return res.status(404).json({message: "User don't exist!"})
                    
//                     const token = jwt.sign({
//                         email: existingUser.email,
//                         id: existingUser._id
//                     }, config.get(process.env.JWT_SECRET), {expiresIn: "1h"});
                    
//                     console.log(token); // log the token
                    
//                     res
//                         .status(200)
//                         .json({result: existingUser, token});
                    
                        
//                 })
//                 .catch(err => {
//                     console.error(err);
//                     res
//                         .status(400)
//                         .json({message: "Invalid access token!"})
//                 })
//             }
//     }




//         //normal-auth

//         const LoginUser = asyncHandler(async (req, res) => {
//             const { email, password } = req.body;
//             console.log(req.body);
//             let user = await User.findOne({ email })
        
//             if (!user) {
//                 res.status(401).send("invalid email or password")
//                 throw new Error('Invalid email or password')
//             }
        
//             if (!user.isActivated) {
//                 user.isActivated = true;
//                 await user.save();
//             }
        
//             if (!user.isConfirmed) {
//                 res.status(401).send("Please confirm your email")
//                 throw new Error('Please confirm your email')
//             } else if (user.isDeleted) {
//                 res.status(401).send("Your account is deleted")
//                 throw new Error('Your account is deleted')
//             } else if (user.isBlocked) {
//                 res.status(401).send("Your account is blocked")
//                 throw new Error('Your account is blocked')
//             } else if (await bcrypt.compare(password, user.password)) {
//                 const { password, ...userWithoutPassword } = user.toObject();
//                 res.json({
//                     user: userWithoutPassword,
//                     token: generateToken(user._id),
//                 })
//             } else {
//                 res.status(401).send("invalid email or password")
//                 throw new Error('Invalid email or password')
//             }
        
//             console.log(user);
//         });
        

//         ////generate token

//         const generateToken = (id) => {
//             return jwt.sign({ id }, process.env.JWT_SECRET, {
//                 expiresIn: '30d',
//             })
//             }

//         const GetUser = asyncHandler(async (req, res) => {
//             res.status(200).json(req.user)
//             });



// //             Fetch User By id 
// const findById =  (req , res , next ) => {
 
//     const id = req.params.id ;
//       User.findOne({_id :req.params.id })
//     .then((user) => {(user)? res.send(user):res.status(400).send({message :"Not found user with id "+ req.params.id })})
//     .catch((err) =>res.status(500).send({ message: "Error retrieving user with id " + req.params.id  , error : +err}))
    
// } 


// //            Desactivate account
// const desactivateAccount = async(req,res) => {
//     try{
       
//         const user = await User.findByIdAndUpdate(req.params.id , {$set:{isActivated  : false}} , {new : true});
//         res.status(200).send({success:true, msg:" The user " + user.name+ "account is desactivated" , data: user});
        
//     }catch(error){
//         res.status(400).send({success:false, msg:error.message});
//     }
    
// }

// //           Editer account 
// const update = async (req, res)=>{

//     if(Object.keys(req.body).length === 0){ return res.status(400).send({ message : "User with new informations must be provided"})}

//     const id = req.params.id;

//     //The { useFindAndModify: false} option is used to avoid using the deprecated findAndModify() method
//     //The { new: true } option tells Mongoose to return the updated document instead of the original one.
//     await  User.findByIdAndUpdate(id,req.body, { useFindAndModify: false , new: true})
//     .then(user => {(!user) ? res.status(404).send({ message : `Cannot Update user with ${id}. Maybe user not found!`}) :res.send(user)})
//     .catch(err => res.status(500).json({ message : "Error Update user information" , error : err}))
// }




// /*   ############################  PASSWORD RECOVERY ######################################### */
            
// ///send mail

// const sentResetPasswordMail = async(name , email , token) => {
//     try{
//         const transporter = nodemailer.createTransport({
//             host:'smtp.gmail.com',
//             port:587,
//             secure:false,
//             requireTLS : true,
//             auth: {
//                 user : mailConfig.emailUser,
//                 pass:mailConfig.emailPassword
//             }
//         });
//         const mailOptions = {
//             from : mailConfig.emailUser,
//             to : email,
//             subject : 'For Reset Password',
//             // html : '<p> Welcome ' + name + ',Please copy the link <a href="http://localhost:3000/reset-password?token='+token+'">  and reset your password </a>'
//             html :  `<!DOCTYPE html>
//             <html lang="en" >
//             <head>
//               <meta charset="UTF-8">
//               <title>CodePen - OTP Email Template</title>
              
//             </head>
//             <body>
//             <!-- partial:index.partial.html -->
//             <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
//               <div style="margin:50px auto;width:70%;padding:20px 0">
//                 <div style="border-bottom:1px solid #eee">
//                   <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Down To Work </a>
//                 </div>
//                 <p style="font-size:1.1em">Hi,</p>
//                 <p>Thank you for choosing Down To Work. Use the following CODE to complete your Password Recovery Procedure. </p>
//                 <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${token}</h2>
//                 <p style="font-size:0.9em;">Regards,<br />DTW</p>
//                 <hr style="border:none;border-top:1px solid #eee" />
//                 <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
//                   <p>Down To Work</p>
//                   <p>Tunisia , </p>
//                   <p>TN</p>
//                 </div>
//               </div>
//             </div>
//             <!-- partial -->
              
//             </body>
//             </html>`

//         }
//         transporter.sendMail(mailOptions,function(error,info){
//             if(error){
//                 console.log(error);
//             }else{
//                 console.log("Mail has been sent" , info.response);
//             }
//         });

//     }catch(error){
//         res.status(400).send({success:false,msg:error.message});
//     }

// }


// // delete account
// const deleteAccount = async (req, res, next) => {
//     try {
//       const { email, password } = req.body;
//       const user = await User.findOne({ email: email });
//       if (!user) {
//         return res.status(400).send({ success: false, msg: 'User not found' });
//       }
  
//       // Check if the password is correct
//       const passwordMatch = await bcrypt.compare(password, user.password);
//       if (!passwordMatch) {
//         return res.status(400).send({ success: false, msg: 'Incorrect password' });
//       }
  
//       // Delete the user's account
//       await User.deleteOne({ _id: user._id });
  
//       res.status(200).send({ success: true, msg: 'Account deleted successfully' });
//     } catch (error) {
//       console.error(error);
//       res.status(500).send({ success: false, msg: 'Something went wrong' });
//     }
//   };
  
  

// /// forget password 

// const forgetPassword = async(req , res , next) => {
//     try{
//         const email = req.body.email;
//         const user = await User.findOne({email});
//         if(user){
//             console.log("hello");
//             // const randomstringtoken = randomstring.generate();
//             const _otp = Math.floor(1000 + Math.random() * 9000);
//             // console.log(randomstringtoken);
//             console.log(_otp);
//             // const data = await User.updateOne({email},{$set:{tokenPass : randomstringtoken}});
//             const data = await User.updateOne({email},{$set:{otp : _otp }});

//             // sentResetPasswordMail(user.name , user.email,randomstringtoken);
//             sentResetPasswordMail(user.name , user.email,_otp);

//             res.status(200).send({success:true,msg:"Please check your inbox "});
//         }else{
//             res.status(400).send("The given mail does not exist");
//         }
//     }catch(error){
//         res.status(400).send({success:false, msg:error.message});
//     }
// }


// /// send code

// const verifyCode = async(req, res) => {
//     console.log(req.body)
//     let user = await User.findOne({ otp: req.body.otp });
//     if(!user) return res.send({ code: 400, message: ' code is invalid ' });
//     res.send({ code: 200, message: 'code is valid' , data:user} );
   
// }

// /// change pass
// const ChangePassword = async (req,res) => {
//     console.log(req.body);
//     let user = await User.findOne({ otp: req.body.otp });
//     const password= req.body.password;
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);
//     user = await User.updateOne({email : user.email}, {password:hashedPassword , otp:null}).then(result => {
//                 res.send({ code: 200, message: 'Password updated', data:user })
//             }).catch(err => {
//                 res.send({ code: 500, message: 'Server err' })
// })
// }
// const submitotp = async(req, res) => {
//     console.log(req.body)
//     let user = await User.findOne({ otp: req.body.otp });
//     const password= req.body.password;
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);
//     user = User.updateOne({email : user.email}, {password:hashedPassword , otp:null}).then(result => {
//         res.send({ code: 200, message: 'Password updated' })
//     }).catch(err => {
//         res.send({ code: 500, message: 'Server err' })
//     })
   
// }
// /* ################################ ADMIN : BLOCK , UNBLOCK ######################*/
// // block User 
// const blockUser = async(req,res) => {
//     try{
       
//         const user = await User.findByIdAndUpdate(req.params.id , {$set:{
//             isBlocked : true
//         }} , {new : true});
//         res.status(200).send({success:true, msg:" The user " + user.name+ " is blocked" , data: user});
        

//     }catch(error){
//         res.status(400).send({success:false, msg:error.message});
//     }
    
// }
// // unblock User 
// const unblockUser = async(req,res) => {
//     try{
//         const user = await User.findByIdAndUpdate({_id:req.params.id} , {$set:{
//             isBlocked : false
//         }} , {new : true});
//         res.status(200).send({success:true, msg:" The user " + user.name+ " is unblocked" , data: user});


//     }catch(error){
//         res.status(400).send({success:false, msg:error.message});
//     }
    
// }





        
// module.exports = {
//     findById,
//     desactivateAccount,
//     update,
//     registerUser,
//     LoginUser,
//     signinController,
//     signupController,
//     GetUser,
//     forgetPassword,
//     blockUser,
//     unblockUser,
//     submitotp,
//     deleteAccount,
//     verifyCode,
//     ChangePassword,
//     verifyUser,
    
// }
const jwt = require ('jsonwebtoken');
const bcrypt = require ('bcryptjs');
const axios = require ('axios');
const config = require ('config');
const asyncHandler = require ('express-async-handler');
const User = require ('../models/user');
const nodemailer = require ('nodemailer');
const randomstring = require ('randomstring');
const mailConfig = require ('../config/configMail.json');
const multer = require ('multer');
const path = require ('path');
const fs = require ('fs');
const sendCredentials = require ('../ConfigMailing');

/* // Définir la destination et le nom du fichier téléchargé
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, 'uploads');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
      }
  });
  
// Définir les types de fichiers acceptés
const upload = multer({
    storage: storage,
    limits: {fileSize: 10000000},
    fileFilter: function(req, file, cb) {
      checkFileType(file, cb);
    }
  }).single('picture');

// Vérifier le type de fichier
function checkFileType(file, cb) {
    // Les types de fichiers autorisés
    const filetypes = /jpeg|jpg|png|gif/;
    // Vérifier l'extension du fichier
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // Vérifier le type MIME du fichier
    const mimetype = filetypes.test(file.mimetype);
  
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb('Error: Images Only!');
    }
  }
 */
////register user

const registerUser = asyncHandler (async (req, res) => {
  const {name, email, DateOfBirth, password} = req.body;

  if (!name || !email || !password || !DateOfBirth) {
    res.status (400);
    throw new Error ('Please enter all fields');
  }

  const userExists = await User.findOne ({email});

  if (userExists) {
    res.status (400).send ('user exists');
    throw new Error ('User already exists');
  }

  const salt = await bcrypt.genSalt (10);
  const hashedPassword = await bcrypt.hash (password, salt);
  ////confirmationMail////
  const characters =
    '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let activationCode = '';
  for (let i = 0; i < 25; i++) {
    activationCode +=
      characters[Math.floor (Math.random () * characters.length)];
  }

  ////confirmationMail////
  const user = await User.create ({
    name,
    email,
    DateOfBirth,
    password: hashedPassword,
    //jdid
    activationCode: activationCode,
  });

  if (user) {
    res.status (201).json ({
      _id: user._id,
      name: user.name,
      email: user.email,
      DateOfBirth: user.DateOfBirth,
      token: generateToken (user._id),
    });
    sendConfirmationEmail (user.email, user.activationCode);
  } else {
    res.status (400);
    throw new Error ('Invalid user data');
  }
});
const sendConfirmationEmail = async (email, activationCode) => {
  try {
    const transporter = nodemailer.createTransport ({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      requireTLS: true,
      auth: {
        user: "DownToWork98@gmail.com",
        pass: "xhcqnjahqhsgublw"
      },
    });
    const mailOptions = {
      from: "DownToWork98@gmail.com",
      to: email,
      subject: 'For account confirmation',
      // html : '<p> Welcome ' + name + ',Please copy the link <a href="http://localhost:3000/reset-password?token='+token+'">  and reset your password </a>'
      html: `
                <div>
                <h1>Activation du compte </h1>
                  
                  <p>Veuillez confirmer votre email en cliquant sur le lien suivant
          </p>
                  <a href=http://localhost:3000/confirm/${activationCode}>Cliquez ici
          </a>
          
                  </div>`,
    };
    transporter.sendMail (mailOptions, function (error, info) {
      if (error) {
        console.log (error);
      } else {
        console.log ('Mail has been sent', info.response);
      }
    });
  } catch (error) {
    //res.status(400).send({success:false,msg:error.message});
  }
};

const verifyUser = async (req, res) => {
  User.findOne ({activationCode: req.params.activationCode}, function (
    err,
    user
  ) {
    if (err) {
      // Handle error
      console.log ('errror');
    }

    // Update the field
    user.isConfirmed = true;

    // Save the changes
    user.save (function (err) {
      if (err) {
        // Handle error
        console.log ('error2');
      }

      // Document updated successfully
      res.send ('Document updated');
    });
  });
};

////register user with google auth

const signupController = async (req, res) => {
  if (req.body.googleAccessToken) {
    const {googleAccessToken} = req.body;

    console.log ('req.body.googleAccessToken : ' + req.body.googleAccessToken);
    console.log ('req.body.email : ' + req.body.email);
    console.log ('req.body.email : ' + req.body.email);

    axios
      .get ('https://www.googleapis.com/oauth2/v3/userinfo', {
        headers: {
          Authorization: `Bearer ${googleAccessToken}`,
        },
      })
      .then (async response => {
        console.log ('here are the response data: ' + response.data.email);
        const name = response.data.given_name;
        const email = response.data.email;
        const picture = response.data.picture;

        const existingUser = await User.findOne ({email});

        if (existingUser) {
          return res.status (400).json ({message: 'User already exist!'});
        }

        const result = await User.create ({
          verified: 'true',
          email,
          firstName,
          lastName,
          profilePicture: picture,
        });

        const token = jwt.sign (
          {
            email: result.email,
            id: result._id,
          },
          config.get (process.env.JWT_SECRET),
          {expiresIn: '1h'}
        );

        res.status (200).json ({result, token});
      })
      .catch (err => {
        res.status (400).json ({message: 'Invalid access token!'});
      });
  }
};

////login user with google auth

const signinController = async (req, res) => {
  // gogole-auth
  if (req.body.googleAccessToken) {
    const {googleAccessToken} = req.body;
    console.log ('req.body.googleAccessToken : ' + req.body.googleAccessToken);

    axios
      .get ('https://www.googleapis.com/oauth2/v3/userinfo', {
        headers: {
          Authorization: `Bearer ${googleAccessToken}`,
        },
      })
      .then (async response => {
        console.log ('here are the response data: ' + response.data.email);
        const name = response.data.given_name;
        const email = response.data.email;
        const picture = response.data.picture;

        const existingUser = await User.findOne ({email});

        if (!existingUser)
          return res.status (404).json ({message: "User don't exist!"});

        const token = jwt.sign (
          {
            email: existingUser.email,
            id: existingUser._id,
          },
          config.get (process.env.JWT_SECRET),
          {expiresIn: '1h'}
        );

        console.log (token); // log the token

        res.status (200).json ({result: existingUser, token});
      })
      .catch (err => {
        console.error (err);
        res.status (400).json ({message: 'Invalid access token!'});
      });
  }
};

//normal-auth

const LoginUser = asyncHandler (async (req, res) => {
  const {email, password} = req.body;
  console.log (req.body);
  let user = await User.findOne ({email});

  if (!user) {
    res.status (401).send ('invalid email or password');
    throw new Error ('Invalid email or password');
  }

  if (!user.isActivated) {
    user.isActivated = true;
    await user.save ();
  }

  if (!user.isConfirmed) {
    res.status (401).send ('Please confirm your email');
    throw new Error ('Please confirm your email');
  } else if (user.isDeleted) {
    res.status (401).send ('Your account is deleted');
    throw new Error ('Your account is deleted');
  } else if (user.isBlocked) {
    res.status (401).send ('Your account is blocked');
    throw new Error ('Your account is blocked');
  } else if (await bcrypt.compare (password, user.password)) {
    const {password, ...userWithoutPassword} = user.toObject ();
    res.json ({
      user: userWithoutPassword,
      token: generateToken (user._id),
    });
  } else {
    res.status (401).send ('invalid email or password');
    throw new Error ('Invalid email or password');
  }

  console.log (user);
});

////generate token

const generateToken = id => {
  return jwt.sign ({id}, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

const GetUser = asyncHandler (async (req, res) => {
  res.status (200).json (req.user);
});

//             Signup with Facebook

const signupFb = async (req, res, next) => {
  const name = req.body.name;
  const email = req.body.email;
  const imagePath = req.body.imagePath;
  const password = 'Facebook' + Math.floor (Math.random () * 100000000);

  const userExists = await User.findOne ({email});

  if (userExists) {
    res.status (400).send ('user exists');
    throw new Error ('User already exists');
  }

  const salt = await bcrypt.genSalt (10);
  const hashedPassword = await bcrypt.hash (password, salt);

  const picture = {
    data: null,
    contentType: null,
    imagePath: imagePath,
  };

  const user = await User.create ({
    name,
    email,
    password: hashedPassword,
    picture: picture,
  });

  if (user) {
    res.status (201).json ({
      _id: user._id,
      name: user.name,
      email: user.email,
      DateOfBirth: user.DateOfBirth,
      picture: user.picture,
      token: generateToken (user._id),
    });

    //sendCredentials(name,email,password)
  } else {
    res.status (400).send ('Invalid user data');
  }
};
//             Fetch User By id
const findById = (req, res, next) => {
  const id = req.params.id;
  User.findOne ({_id: req.params.id})
    .then (user => {
      if (user) {
        res.setHeader ('Cache-Control', 'no-cache, no-store');
        res.setHeader ('Expires', '0');
        res.send (user);
      } else {
        res
          .status (400)
          .send ({message: 'Not found user with id ' + req.params.id});
      }
    })
    .catch (err => {
      res.status (500).send ({
        message: 'Error retrieving user with id ' + req.params.id,
        error: +err,
      });
    });
};
//            GetImagePath

const GetImagePath = async (req, res) => {
  const id = req.params.id;
  User.findOne ({_id: id})
    .then (user => {
      res.setHeader ('Cache-Control', 'no-cache, no-store');
      res.setHeader ('Expires', '0');
      console.log ('yessss ');
      res.send (user.picture.imagePath);
    })
    .catch (err => {
      res.status (500).send ({
        message: 'Error retrieving user with id ' + req.params.id,
        error: +err,
      });
    });
};
//            Desactivate account
const desactivateAccount = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate (
      req.params.id,
      {$set: {isActivated: false}},
      {new: true}
    );
    res.status (200).send ({
      success: true,
      msg: ' The user ' + user.name + 'account is desactivated',
      data: user,
    });
  } catch (error) {
    res.status (400).send ({success: false, msg: error.message});
  }
};

//           Editer account
const update = async (req, res) => {
  if (Object.keys (req.body).length === 0) {
    return res
      .status (400)
      .send ({message: 'User with new informations must be provided'});
  }

  const id = req.params.id;

  //The { useFindAndModify: false} option is used to avoid using the deprecated findAndModify() method
  //The { new: true } option tells Mongoose to return the updated document instead of the original one.
  await User.findByIdAndUpdate (id, req.body, {
    useFindAndModify: false,
    new: true,
  })
    .then (user => {
      !user
        ? res.status (404).send ({
            message: `Cannot Update user with ${id}. Maybe user not found!`,
          })
        : res.send (user);
    })
    .catch (err =>
      res
        .status (500)
        .json ({message: 'Error Update user information', error: err})
    );
};

//           Change Password

const changePwd = async (req, res) => {
  console.log ('Hello from change password');
  try {
    const user = await User.findById (req.params.id);
    if (!user) {
      return res.status (404).json ({message: 'User not found'});
    }
    const {oldPassword, newPassword} = req.body;
    const isMatch = await bcrypt.compare (oldPassword, user.password);
    if (!isMatch) {
      return res.status (400).json ({message: 'Incorrect password'});
    }
    const salt = await bcrypt.genSalt (10);
    const hashedPassword = await bcrypt.hash (newPassword, salt);
    user.password = hashedPassword;
    await user.save ();
    res.json ({message: 'Password updated successfully'});
  } catch (err) {
    console.error (err);
    res.status (500).json ({message: 'Internal server error'});
  }
};

//           Update photo profile

const updateImg = async (req, res) => {
  const id = req.params.id;
  const user = await User.findById (id);
  if (!user) {
    return res.status (404).json ({errors: [{msg: 'User not found'}]});
  }
  try {
    user.picture.data = req.file.buffer;
    user.picture.contentType = req.file.mimetype;
    user.picture.imagePath = req.file.path;

    await user.save ();
    return res.status (200).json ({user});
  } catch (err) {
    console.log (err);
    return res.status (500).send ('Server Error');
  }
};

//         Enpoint to get All users

const findAll = async (req, res, next) => {
  console.log ('hello from get users');
  User.find ()
    .then (users => {
      res.setHeader ('Cache-Control', 'no-cache, no-store');
      res.setHeader ('Expires', '0');
      res.status (200).send (users);
      console.log (users);
    })
    .catch (err => res.status (500).send ({message: 'Error retrieving users'}));
};
/*   ############################  PASSWORD RECOVERY ######################################### */

///send mail

const sentResetPasswordMail = async (name, email, token) => {
  try {
    const transporter = nodemailer.createTransport ({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      requireTLS: true,
      auth: {
        user: mailConfig.emailUser,
        pass: mailConfig.emailPassword,
      },
    });
    const mailOptions = {
      from: mailConfig.emailUser,
      to: email,
      subject: 'For Reset Password',
      // html : '<p> Welcome ' + name + ',Please copy the link <a href="http://localhost:3000/reset-password?token='+token+'">  and reset your password </a>'
      html: `<!DOCTYPE html>
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
                  <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Down To Work </a>
                </div>
                <p style="font-size:1.1em">Hi,</p>
                <p>Thank you for choosing Down To Work. Use the following CODE to complete your Password Recovery Procedure. </p>
                <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${token}</h2>
                <p style="font-size:0.9em;">Regards,<br />DTW</p>
                <hr style="border:none;border-top:1px solid #eee" />
                <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
                  <p>Down To Work</p>
                  <p>Tunisia , </p>
                  <p>TN</p>
                </div>
              </div>
            </div>
            <!-- partial -->
              
            </body>
            </html>`,
    };
    transporter.sendMail (mailOptions, function (error, info) {
      if (error) {
        console.log (error);
      } else {
        console.log ('Mail has been sent', info.response);
      }
    });
  } catch (error) {
    res.status (400).send ({success: false, msg: error.message});
  }
};

// delete account
const deleteAccount = async (req, res, next) => {
  try {
    const {email, password} = req.body;
    const user = await User.findOne ({email: email});
    if (!user) {
      return res.status (400).send ({success: false, msg: 'User not found'});
    }

    // Check if the password is correct
    const passwordMatch = await bcrypt.compare (password, user.password);
    if (!passwordMatch) {
      return res
        .status (400)
        .send ({success: false, msg: 'Incorrect password'});
    }

    // Delete the user's account
    await User.deleteOne ({_id: user._id});

    res
      .status (200)
      .send ({success: true, msg: 'Account deleted successfully'});
  } catch (error) {
    console.error (error);
    res.status (500).send ({success: false, msg: 'Something went wrong'});
  }
};

/// forget password

const forgetPassword = async (req, res, next) => {
  try {
    const email = req.body.email;
    const user = await User.findOne ({email});
    if (user) {
      console.log ('hello');
      // const randomstringtoken = randomstring.generate();
      const _otp = Math.floor (1000 + Math.random () * 9000);
      // console.log(randomstringtoken);
      console.log (_otp);
      // const data = await User.updateOne({email},{$set:{tokenPass : randomstringtoken}});
      const data = await User.updateOne ({email}, {$set: {otp: _otp}});

      // sentResetPasswordMail(user.name , user.email,randomstringtoken);
      sentResetPasswordMail (user.name, user.email, _otp);

      res.status (200).send ({success: true, msg: 'Please check your inbox '});
    } else {
      res.status (400).send ('The given mail does not exist');
    }
  } catch (error) {
    res.status (400).send ({success: false, msg: error.message});
  }
};

/// send code

const verifyCode = async (req, res) => {
  console.log (req.body);
  let user = await User.findOne ({otp: req.body.otp});
  if (!user) return res.send ({code: 400, message: ' code is invalid '});
  res.send ({code: 200, message: 'code is valid', data: user});
};

/// change pass

const ChangePassword = async (req, res) => {
  console.log (req.body);
  let user = await User.findOne ({otp: req.body.otp});
  const password = req.body.password;
  const salt = await bcrypt.genSalt (10);
  const hashedPassword = await bcrypt.hash (password, salt);
  user = await User.updateOne (
    {email: user.email},
    {password: hashedPassword, otp: null}
  )
    .then (result => {
      res.send ({code: 200, message: 'Password updated', data: user});
    })
    .catch (err => {
      res.send ({code: 500, message: 'Server err'});
    });
};

const submitotp = async (req, res) => {
  console.log (req.body);
  let user = await User.findOne ({otp: req.body.otp});
  const password = req.body.password;
  const salt = await bcrypt.genSalt (10);
  const hashedPassword = await bcrypt.hash (password, salt);
  user = User.updateOne (
    {email: user.email},
    {password: hashedPassword, otp: null}
  )
    .then (result => {
      res.send ({code: 200, message: 'Password updated'});
    })
    .catch (err => {
      res.send ({code: 500, message: 'Server err'});
    });
};
/* ################################ ADMIN : BLOCK , UNBLOCK ######################*/
// block User
const blockUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate (
      req.params.id,
      {
        $set: {
          isBlocked: true,
        },
      },
      {new: true}
    );
    res.status (200).send ({
      success: true,
      msg: ' The user ' + user.name + ' is blocked',
      data: user,
    });
  } catch (error) {
    res.status (400).send ({success: false, msg: error.message});
  }
};
// unblock User
const unblockUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate (
      {_id: req.params.id},
      {
        $set: {
          isBlocked: false,
        },
      },
      {new: true}
    );
    res.status (200).send ({
      success: true,
      msg: ' The user ' + user.name + ' is unblocked',
      data: user,
    });
  } catch (error) {
    res.status (400).send ({success: false, msg: error.message});
  }
};

const classification = async (req, res) => {
  try {
    const userId = req.params.id;
    const level = req.params.level;

    const user = await User.findByIdAndUpdate (
      userId,
      {classification: level},
      {new: true}
    );

    res.json (user);
  } catch (error) {
    console.error (error);
    res.status (500).json ({message: 'Internal server error'});
  }
};

module.exports = {
  findById,
  signupFb,
  desactivateAccount,
  changePwd,
  update,
  GetImagePath,
  updateImg,
  findAll,
  registerUser,
  LoginUser,
  classification,
  signinController,
  signupController,
  GetUser,
  forgetPassword,
  blockUser,
  unblockUser,
  submitotp,
  deleteAccount,
  verifyCode,
  ChangePassword,
  verifyUser,
};