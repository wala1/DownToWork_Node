const {schemaVideo ,  Video} = require('../models/Video');
const {Topic} =  require('../models/Topics');
const path = require('path');
const cors = require('cors');

//#################################### List of Videos ###############################
async function videoList(req , res , next){
    const video = await Video.find();
    res.send(video);
};
//#################################### Add Video ####################################
async function addVideo(req, res , next){
    const topic = await Topic.findById(req.body.topicId);
    console.log(topic);
    if(!topic) return res.status(400).send("Topic is not found");
    let video = new Video ({
        nameVideo : req.body.nameVideo,
        descriptionVideo : req.body.descriptionVideo,
        level : req.body.level,
        videoUrl : req.body.videoUrl,
        topic : {
            _id : topic.id,
            topicName : topic.topicName,
            topicImg : topic.topicImg,
            TopicDesc : topic.TopicDesc
        }
    })
    video = await video.save();
    res.send(video);
};
//#################################### Search Video By Topic ########################
async function findVideoByTopic(req,res){
    const topicName = req.params.topicName;
    console.log(topicName);
    const videos = await Video.find({"topic.topicName" : topicName}).lean();
    console.log(videos);
    if(!videos) return res.status(400).send("There is not videos with this type");
    res.json(videos);
};
//#################################### Search Video By Topic and Level ########################
async function findVideoByTopicAndLevel(req,res){
    const topicName = req.params.topicName;
    const level = req.params.level;
    console.log(topicName);
    const videos = await Video.find({
        "topic.topicName" : topicName,
        "level" : level
    }).lean();
    console.log(videos);
    if(!videos) return res.status(400).send("There is not videos with this type");
    res.json(videos);
};
//#################################### Delete Video #################################
async function deleteVideo(req , res){
    const video =await  Video.findByIdAndRemove(req.params.id);
    if(!video) return res.status(404).send("The video does not exist");
    res.send("The video : "+ video.nameVideo + " is deleted successfully");
};
//#################################### Update Video #################################
async function updateVideo(req,res,next){
    const video = Video.findByIdAndUpdate(req.params.id, 
        {
             nameVideo : req.body.nameVideo,
             descriptionVideo : req.body.descriptionVideo,
             level : req.body.level,
             videoUrl : req.body.videoUrl,

        }, 
        { new : true});
    if(!video) return res.status(400).send("The video does not exist");
    res.send(video);
};
exports.addVideo = addVideo;
exports.videoList = videoList;
exports.findVideoByTopic = findVideoByTopic;
exports.deleteVideo = deleteVideo;
exports.updateVideo = updateVideo;
exports.findVideoByTopicAndLevel = findVideoByTopicAndLevel;

