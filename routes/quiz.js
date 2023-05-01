const express = require('express');
const router = express.Router();
const multer = require('multer');
const { addQuiz, allList , updateQuiz, getQuizById, getQuizByType ,updateQuizParameterId, deleteQuiz,updateQuizQuestionNumber,updateQuizQuestionNumberDecrement, getQuizzesByIdTest, getQuizzesPagination} = require('../controllers/quizController');


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5 // limit to 5 MB
  }
});

router.get('/', allList);
router.post('/addQuiz', upload.single('picture'), addQuiz);
router.put('/updateQuiz/:id', upload.single('picture'), updateQuiz);
router.get('/getQuizById/:id', getQuizById);
router.get('/getQuizByType', getQuizByType);
router.delete('/deleteQuiz', deleteQuiz);
router.get('/getQuizzesByIdTest', getQuizzesByIdTest);
router.get('/getQuizzesPagination', getQuizzesPagination);
router.put('/updateQuizQuestionNumber/:id',updateQuizQuestionNumber);
router.put('/updateQuizQuestionNumberDecrement/:id',updateQuizQuestionNumberDecrement);
router.put('/updateQuizParameterId/:id', updateQuizParameterId);

module.exports = router;
