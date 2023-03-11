const mongoose = require('mongoose');
const {topicSchema} = require('./Topics');

const schemaCourse = new mongoose.Schema({
    nameCourse : {
        type  : String,
        required : true
    },
    descriptionCourse : {
        type : String ,
        required : true
    },
   
    Level : {
        type : String , 
        required : true
    } ,
    topic : {
        type : topicSchema,
        required : true
    }
})

const Course = mongoose.model('Course' , schemaCourse);
exports.Course=Course;
exports.schemaCourse = schemaCourse;