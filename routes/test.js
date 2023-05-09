const express = require('express');
const router = express.Router();
const multer = require('multer');
const { addTest, allList, updateTest, getTestById, getTestByType, deleteTest,updateTestQuizNumber,updateTestQuizNumberDecrement, getTestPagination} = require('../controllers/testController');

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
router.post('/addTest', upload.single('picture'), addTest);
router.put('/updateTest/:id', upload.single('picture'), updateTest);
router.get('/getTestById/:id', getTestById);
router.post('/getTestByType', getTestByType);
router.delete('/deleteTest', deleteTest);
router.get('/getTestPagination', getTestPagination);
router.put('/updateTestQuizNumber/:id',updateTestQuizNumber);
router.put('/updateTestQuizNumberDecrement/:id',updateTestQuizNumberDecrement);

module.exports = router;
