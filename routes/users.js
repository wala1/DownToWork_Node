var express = require('express');
var router = express.Router();
const { registerUser,LoginUser,GetUser ,forgetPassword, blockUser,unblockUser, verifyCode,ChangePassword,findById, update, desactivateAccount} = require('../controllers/userController.js');
const { protect } = require ('../middleWares/authMiddleWare.js');
const { validate } = require('../middleWares/validation.js');
const { signinController, signupController, deleteAccount } = require("../controllers/userController")


router.post('/register',validate,registerUser);
router.post('/login', LoginUser);
router.post("/signin", signinController);
router.post("/signup", signupController);
router.get('/getuser', protect, GetUser);
router.get('/getById/:id', findById );
router.put('/update/:id', update );
router.put('/desactivate/:id', desactivateAccount );
router.get('/block-user/:id' , blockUser);
router.get('/unblock-user/:id',unblockUser);
router.post('/delete-account', deleteAccount );

// router.post("/api/user", async (req, res) => {
//     const userData = req.body;
//     const newUser = new User(userData);
//     await newUser.save();
//     res.send("User data saved successfully!");
//   });
router.post('/forget-password', forgetPassword );
// router.post('/new-password' , submitotp);
router.post('/verification-code' , verifyCode);
router.post('/change-password',ChangePassword);


// /* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

module.exports = router;
