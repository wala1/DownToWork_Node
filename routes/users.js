var express = require('express');
var router = express.Router();
const { registerUser,LoginUser,GetUser ,forgetPassword , blockUser,unblockUser, findById, update,ChangePassword,verifyCode, desactivateAccount,verifyUser} = require('../controllers/userController.js');const { validate } = require('../middleWares/validation.js');
const { signinController, signupController } = require("../controllers/userController")


router.post('/register',validate,registerUser);
router.post('/login', LoginUser);
router.post("/signin", signinController);
router.post("/signup", signupController);
router.get('/getuser', protect, GetUser);
router.get('/getById/:id', findById );
router.put('/update/:id', update );
router.put('/desactivate/:id', desactivateAccount )
router.get('/block-user/:id' , blockUser);
router.get('/unblock-user/:id',unblockUser);
router.post('/forget-password', forgetPassword );
router.post('/verification-code' , verifyCode);
router.post('/change-password',ChangePassword);
router.post('/verifyUser/:activationCode',verifyUser);


// /* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

module.exports = router;
