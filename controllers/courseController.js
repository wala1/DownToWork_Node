const { request } = require('http');
const {schemaCourse ,  Course} = require('../models/Course');
const {Topic} =  require('../models/Topics');
const cors = require('cors');
async function courseList(req , res , next){
    const course = await Course.find();
    res.send(course);
};
async function addCourse(req, res , next){
    const topic = await Topic.findById(req.body.topicId);
    console.log(topic);
    if(!topic) return res.status(400).send("Topic is not found");
    let course = new Course ({
        nameCourse : req.body.nameCourse,
        descriptionCourse : req.body.descriptionCourse,
        Level : req.body.Level,
        imageCourse : req.body.imageCourse,
        type : req.body.type,
        topic : {
            _id : topic.id,
            topicName : topic.topicName,
            topicImg : topic.topicImg,
            TopicDesc : topic.TopicDesc
        }
    })
    course = await course.save();
    res.send(course);
};
async function updateCourse(req,res,next){
    const course = Course.findByIdAndUpdate(req.params.id, 
        {
            nameCourse : req.body.nameCourse ,
            descriptionCourse : req.body.descriptionCourse,
            level :req.body.descriptionCourse,
            imageCourse : req.body.imageCourse,
            type : req.body.type,

        }, 
        { new : true});
    if(!course) return res.status(400).send("The course does not exist");
    res.send(course);
};
async function getCourse(req,res){
    const course = Course.findById(req.params.id);
    if(!course) return res.status(400).send("The course does not exist");
    res.send(course);
};
async function findCourseByType(req,res){
    const type = req.params.type;
    console.log(type);
    const courses = await Course.find({type : type}).lean();
    console.log(courses);
    if(!courses) return res.status(400).send("There is not courses with this type");
    res.json(courses);
};
async function findCourseByTopic(req,res){
    const topicName = req.params.topicName;
    console.log(topicName);
    const courses = await Course.find({"topic.topicName" : topicName}).lean();
    console.log(courses);
    if(!courses) return res.status(400).send("There is not courses with this type");
    res.json(courses);
};
async function deleteCourse(req , res){
    const course = Course.findByIdAndRemove(req.params.id);
    if(!course) return res.status(400).send("The course does not exist");
    res.send(course);
};

async function getALLCourses(req , res){
    try {
        const courses = await Course.find();
        res.status(200).json({
          message: "Courses fetched successfully!",
          courses: courses
        });
      } catch (error) {
        res.status(400).send({ success: false, msg: error.message });
      }
};

async function downloadPdf(req,res){
    res.download('./uploads/image.png');

}
async function uploadFile(req,res){
    console.log('request file : ' , req.file);
    console.log('request body : ' , req.body);
    res.json({
        fullName : req.body.fullName,
        asset : req.file.path
    })

}
exports.addCourse = addCourse;
exports.updateCourse = updateCourse;
exports.getCourse = getCourse;
exports.deleteCourse = deleteCourse;
exports.courseList = courseList;
exports.findCourseByType = findCourseByType;
exports.findCourseByTopic = findCourseByTopic;
exports.downloadPdf = downloadPdf;
exports.uploadFile = uploadFile;
exports.getALLCourses = getALLCourses;