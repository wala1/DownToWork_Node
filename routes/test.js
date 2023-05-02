const express = require('express');
const router = express.Router();
const multer = require('multer');
const { addTest, allList, updateTest, getTestById, getTestByType, deleteTest, getTestPagination } = require('../controllers/testController');

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
router.post('/addTest', upload.single('picture'), addTest);
router.put('/updateTest/:id', updateTest);
router.get('/getTestById/:id', getTestById);
router.post('/getTestByType', getTestByType);
router.delete('/deleteTest', deleteTest);
router.get('/getTestPagination', getTestPagination);

module.exports = router;
