var express = require('express');
var router = express.Router();
const { registerUser,LoginUser,GetUser ,forgetPassword,resetPassword} = require('../controllers/userController.js');
const { protect } = require ('../middleWares/authMiddleWare.js');
const { validate } = require('../middleWares/validation.js');


router.post('/register',validate,registerUser);
router.post('/login', LoginUser);
router.get('/getuser', protect, GetUser);
router.post('/forget-password', forgetPassword );
router.post('/reset-password',resetPassword);
// /* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

module.exports = router;
