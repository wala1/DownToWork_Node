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
    DateOfBirth: {
      type: Date,
      format: 'dd-mm-yyyy',
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
    isDeleted : {
      type : Boolean,
      default: false,
    },
    isBlocked : {
      type : Boolean,
      default: false,
    }, 
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