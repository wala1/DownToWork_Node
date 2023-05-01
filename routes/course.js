const express = require('express');
const router = express.Router();
const { addCourse, courseList , updateCourse , getCourse ,deleteCourse , findCourseByType,findCourseByTopic, getALLCourses} = require('../controllers/courseController');

router.get('/' ,courseList);
router.post('/add' , addCourse);
router.get('/find/:id' , getCourse);
router.put('/update/:id' , updateCourse);
router.post('/delete/:id' , deleteCourse);
router.get('/find-type/:type' , findCourseByType);
router.get('/find-topic/:topicName' , findCourseByTopic);
router.get('/getCources' ,getALLCourses);




module.exports = router;