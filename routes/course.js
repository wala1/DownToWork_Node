const express = require('express');
const router = express.Router();
const { addCourse, courseList , updateCourse , getCourse ,deleteCourse} = require('../controllers/courseController');

router.get('/' ,courseList);
router.post('/add' , addCourse);
module.exports = router;