const express = require('express');
const router = express.Router();
const { addTest, allList , updateTest, getTestById, getTestByType , deleteTest, getTestPagination} = require('../controllers/testController');

router.get('/' ,allList);
router.post('/addTest' , addTest);
router.post('/updateTest' , updateTest);
router.post('/getTestById' , getTestById);
router.post('/getTestByType' , getTestByType);
router.delete('/deleteTest' , deleteTest);
router.get('/getTestPagination' , getTestPagination);

module.exports = router;
