var express = require('express');
var router = express.Router();
const { registerUser,LoginUser,GetUser ,forgetPassword ,classification, blockUser,unblockUser, findById, update,ChangePassword,verifyCode, desactivateAccount,verifyUser, updateImg, findOneOrAll, findAll, changePwd, signupFb, GetImagePath} = require('../controllers/userController.js');
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
router.post("/signupFb", signupFb);
router.get('/getuser', protect, GetUser);


// Route pour récupérer un utilisateur par son ID
router.get('/getById/:id', findById );
// Route pour récupérer tous les utilisateurs de la base de donnèe
router.get('/', findAll);
// Route pour modifier un utilisateur de la base de donnèe
router.put('/update/:id', update );
router.put('/classification/:id/:level', classification);
// Route pour desactiver le compte d'un utilisateur
router.put('/desactivate/:id', desactivateAccount )
// Route pour changer le password d'un utilisateur
router.put('/changePwd/:id' , changePwd) 
// Route pour modfier l'image d'un utilisateur 
router.put('/updateImg/:id',upload.single('picture'),updateImg)
router.get('/getImagePath/:id', GetImagePath )


router.get('/unblock-user/:id',unblockUser);

router.get('/block-user/:id' , blockUser);
router.post('/delete-account', deleteAccount );
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
