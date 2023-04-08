const express = require('express');
const router = express.Router();
const { createQuestion, updateQuestion, deleteQuestion, getAllQuestions, getQuestionById, getQuestionsByType, addChoice, updateChoice, deleteChoice, getQuestionsByIdQuiz } = require('../controllers/questionController');

router.post('/', createQuestion);
router.put('/:id', updateQuestion);
router.delete('/:id', deleteQuestion);
router.get('/', getAllQuestions);
router.get('/:id', getQuestionById);
router.get('/type/:type', getQuestionsByType);
router.post('/:id/choices', addChoice);
router.put('/:id/choices/:choiceId', updateChoice);
router.delete('/:id/choices/:choiceId', deleteChoice);
router.get('/getQuestionsByIdQuiz', getQuestionsByIdQuiz);

module.exports = router;