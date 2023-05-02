const express = require('express');
const router = express.Router();
const multer = require('multer');
const { addQuiz, allList , updateQuiz, getQuizById, getQuizByType , deleteQuiz, getQuizzesByIdTest} = require('../controllers/quizController');

// Define storage for uploaded files
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../public/images')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
});

// Create multer middleware
const upload = multer({ storage: storage });

router.get('/', allList);
router.post('/addQuiz', upload.single('picture'), addQuiz);
router.post('/updateQuiz', updateQuiz);
router.post('/getQuizById', getQuizById);
router.post('/getQuizByType', getQuizByType);
router.delete('/deleteQuiz', deleteQuiz);
router.get('/getQuizzesByIdTest', getQuizzesByIdTest);

module.exports = router;
