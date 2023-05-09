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
        enum : ["beginner" , "medium" , "advanced"],
        required : true
    },
    imageCourse : {
        type : String     },
    type : {
        type : String , 
        enum : ["pdf" , "video" , "game"],
        required : true
    },
    topic : {
        type : topicSchema,
        required : true
    }
})

const Course = mongoose.model('Course' , schemaCourse);
exports.Course=Course;
exports.schemaCourse = schemaCourse;