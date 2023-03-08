const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/user')



////register user


const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password,DateOfBirth } = req.body

    if(!name || !email || !password || !DateOfBirth) {
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
        DateOfBirth,
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

    ////login user

    const LoginUser = asyncHandler(async (req, res) => {
        const { email, password } = req.body
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

    module.exports = {
        registerUser,
        LoginUser,
        GetUser,
      }