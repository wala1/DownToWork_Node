const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();
const { addCourse, courseList , updateCourse , getCourse ,deleteCourse , findCourseByType,findCourseByTopic,getALLCourses, downloadPdf,uploadFile} = require('../controllers/courseController');

// Storage engine 
const storage = multer.diskStorage({
    destination : './public/images',
    filename : (req , file , cb)  => {
        return cb(null ,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}` )
    }
})

// Define the multer
const upload = multer({
    storage : storage,
    // limits : {
    //     fileSize : 10
    // }
}) 
router.use('/courseImage', express.static('public/images')); 
router.get('/' ,courseList);
router.post('/add' ,upload.single('courseImage'), addCourse);
router.get('/find/:id' , getCourse);
router.put('/update/:id' , updateCourse);
router.post('/delete/:id' , deleteCourse);
router.get('/find-type/:type' , findCourseByType);
router.get('/find-topic/:topicName' , findCourseByTopic);
router.get('/getCources' ,getALLCourses);
router.get('/download-course' , downloadPdf);
router.post('/uploadd',upload.single("asset"),uploadFile)



module.exports = router;