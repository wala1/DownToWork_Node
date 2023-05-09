const mongoose = require('mongoose')

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a name'],
    },
    email: {
      type: String,
      required: [true, 'Please add an email'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Please add a password'],
    },
    statut: {
      type: String,
      default: 'Web Designer | Architect'
    },
    classification:{type: String, enum: ["Beginner", "Intermediate", "Advanced"] },
    picture: {
      data: {
        type: Buffer,
        default: null
      },
      contentType: {
        type: String,
        default: null
      },
      imagePath: {
        type: String,
        default: null
      }
    },
    googleId: {
      type: String,
     // required: false,
    },
    DateOfBirth: {
      type: Date,
      format: 'yyyy-MM-dd',
     // required: [true, 'Please add a DateOfBirth'],
    },
    isOwner : {
      type : Boolean,
      default: false,
    },
    isAdmin : {
      type : Boolean,
      default: false,
    },
    isSpecialiste : {
      type : Boolean,
      default: false,
    },
    isClient : {
      type : Boolean,
      default: true,
    },
    isConfirmed : {
      type : Boolean,
      default: false,
    },
   activationCode: String,
    isDeleted : {
      type : Boolean,
      default: false,
    },
    isBlocked : {
      type : Boolean,
      default: false,
    }, 
    activationCode: String,
    isActivated : {
      type : Boolean,
      default: true,
    },
    tokenPass : {
      type : String,
      default : ''
    },
    otp : {
      type : Number
    }
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('User', userSchema)