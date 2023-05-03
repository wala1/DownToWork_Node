const express = require('express');
const router = express.Router();
const multer = require('multer');
const { createQuestion, updateQuestion, deleteQuestion,getQuestionsByQuizId, getAllQuestions,copyQuestion, updateQuestionParameterId, getQuestionById, getQuestionsByType, addChoice, updateChoice, deleteChoice, getQuestionsByIdQuiz, getQuestionsPagination } = require('../controllers/questionController');

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

router.get('/', getAllQuestions);
router.post('/addQuestion', upload.single('picture'), createQuestion);
router.post('/copy/:questionId',copyQuestion);
router.put('/updateQuestion/:id', upload.single('picture'), updateQuestion);
router.delete('/delete', deleteQuestion);
router.get('/getQuestionById/:id', getQuestionById);
router.get('/getQuestionsByType/type/:type', getQuestionsByType);
router.get('/getQuestionsPagination', getQuestionsPagination);
router.put('/updateQuestionParameterId/:id', updateQuestionParameterId);


router.post('/addChoice/:id/choices', addChoice);
router.put('/updateChoice/:id/choices/:choiceId', updateChoice);
router.delete('/deleteChoice/:id/choices/:choiceId', deleteChoice);
router.get('/getQuestionsByIdQuiz', getQuestionsByIdQuiz);
router.get('/getQuestionsByQuizId/:id', getQuestionsByQuizId);

module.exports = router;
