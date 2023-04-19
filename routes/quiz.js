const express = require('express');
const router = express.Router();
const { addQuiz, allList , updateQuiz, getQuizById, getQuizByType , deleteQuiz, getQuizzesByIdTest} = require('../controllers/quizController');

router.get('/', allList);
router.post('/addQuiz', addQuiz);
router.post('/updateQuiz', updateQuiz);
router.post('/getQuizById', getQuizById);
router.post('/getQuizByType', getQuizByType);
router.delete('/deleteQuiz', deleteQuiz);
router.get('/getQuizzesByIdTest', getQuizzesByIdTest);

module.exports = router;
