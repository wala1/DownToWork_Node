const mongoose = require('mongoose');
const {topicSchema} = require('./Topics');

const schemaVideo = new mongoose.Schema({
    nameVideo : {
        type : String,
        required : true
    },
    descriptionVideo : {
        type : String,
        required : true
    },
    level : {
        type : String,
        enum : ["beginner" , "medium" , "advanced"],
        required : true
    },
    videoUrl : {
        type : String  ,
        required : true
    },
    topic : {
        type : topicSchema,
        // required : true
    }
})
const Video = mongoose.model('Video' , schemaVideo);
exports.Video = Video;
exports.schemaVideo = schemaVideo