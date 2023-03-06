var express = require('express');
var router = express.Router();
const { registerUser,LoginUser,GetUser } = require('../controllers/userController.js');
const { protect } = require ('../middleWares/authMiddleWare.js');


router.post('/register', registerUser);
router.post('/login', LoginUser);
router.get('/getuser', protect, GetUser);
// /* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

module.exports = router;
