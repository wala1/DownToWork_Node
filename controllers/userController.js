const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/user')



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

        
        /// reset password 
        const resetPassword = async(req,res,next) => {
            const {email , password , confirm_password} = req.body;
            let user = await User.findOne({ email })    

            if(!user){
                 return res.status(400).send("This user does not exist");
            }      

            if (password === confirm_password) {
                const salt = await bcrypt.genSalt(10)
                const hashedPassword = await bcrypt.hash(password, salt)
                user.set({
                    password : hashedPassword,
                })
           } else {
                 return res.status(400).send("You entered different passwords");
           }
            const result = await user.save();
            res.send(result);

        }
    

    module.exports = {
        registerUser,
        LoginUser,
        GetUser,
        resetPassword
      }