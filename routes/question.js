const express = require('express');
const router = express.Router();
const { createQuestion, updateQuestion, deleteQuestion, getAllQuestions, getQuestionById, getQuestionsByType, addChoice, updateChoice, deleteChoice, getQuestionsByIdQuiz } = require('../controllers/questionController');

router.get('/', getAllQuestions);
router.post('/add', createQuestion);
router.put('/update/:id', updateQuestion);
router.delete('/delete/:id', deleteQuestion);
router.get('/getQuestionById/:id', getQuestionById);
router.get('/getQuestionsByType/type/:type', getQuestionsByType);
router.post('/addChoice/:id/choices', addChoice);
router.put('/updateChoice/:id/choices/:choiceId', updateChoice);
router.delete('/deleteChoice/:id/choices/:choiceId', deleteChoice);
router.get('/getQuestionsByIdQuiz', getQuestionsByIdQuiz);

module.exports = router;
