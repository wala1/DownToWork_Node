const mongoose = require('mongoose');
//create schema
const topicSchema = new mongoose.Schema({
    topicName : {
        type : String,
        required : true
    },
    topicImg : {
        type : String,
        required : true
    },
    TopicDesc : {
        type : String,
        required : true
    }
})
//class
const Topic = mongoose.model('Topic',topicSchema);

exports.Topic = Topic;
exports.topicSchema = topicSchema;