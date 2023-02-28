var express = require('express');
var router = express.Router();
const { registerUser,LoginUser } = require('../controllers/userController.js');


router.post('/register', registerUser);
router.post('/login', LoginUser);

// /* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

module.exports = router;
