var express = require('express');
var router = express.Router();
const { registerUser,LoginUser,GetUser ,forgetPassword , blockUser,unblockUser, findById, update,ChangePassword,verifyCode, desactivateAccount,verifyUser, updateImg} = require('../controllers/userController.js');
const { protect } = require ('../middleWares/authMiddleWare.js');
const { validate } = require('../middleWares/validation.js');
const { signinController, signupController, deleteAccount } = require("../controllers/userController")
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname)
    }
  });
  
const upload = multer({ storage: storage });


router.post('/register',validate,registerUser);
router.post('/verifyUser/:activationCode',verifyUser);
router.post('/login', LoginUser);
router.post("/signin", signinController);
router.post("/signup", signupController);
router.get('/getuser', protect, GetUser);
router.get('/getById/:id', findById );
router.put('/update/:id', update );
router.put('/desactivate/:id', desactivateAccount )
router.get('/block-user/:id' , blockUser);
router.get('/unblock-user/:id',unblockUser);
router.post('/delete-account', deleteAccount );
router.put('/updateImg/:id',upload.single('picture'),updateImg)


// router.post("/api/user", async (req, res) => {
//     const userData = req.body;
//     const newUser = new User(userData);
//     await newUser.save();
//     res.send("User data saved successfully!");
//   });
router.post('/forget-password', forgetPassword );
router.post('/verification-code' , verifyCode);
router.post('/change-password',ChangePassword);
router.post('/verifyUser/:activationCode',verifyUser);


// /* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

module.exports = router;
