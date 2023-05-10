const { request } = require('http');
const pdf2json = require('pdf2json');
const {schemaCourse ,  Course} = require('../models/Course');
const {Topic} =  require('../models/Topics');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const pdfjsLib = require('pdfjs-dist');

//#################################### List of Courses ###############################
async function courseList(req , res , next){
    const course = await Course.find();
    res.send(course);
};
//#################################### Add Course ####################################
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
//#################################### Update Course #################################
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
//#################################### Search Course By Id  ##########################
async function getCourse(req,res){
    const course = Course.findById(req.params.id);
    if(!course) return res.status(400).send("The course does not exist");
    res.send(course);
};
//#################################### Search Course By Type #########################
async function findCourseByType(req,res){
    const type = req.params.type;
    console.log(type);
    const courses = await Course.find({type : type}).lean();
    console.log(courses);
    if(!courses) return res.status(400).send("There is not courses with this type");
    res.json(courses);
};
//#################################### Search Course By Topic ########################
async function findCourseByTopic(req,res){
    const topicName = req.params.topicName;
    console.log(topicName);
    const courses = await Course.find({"topic.topicName" : topicName}).lean();
    console.log(courses);
    if(!courses) return res.status(400).send("There is not courses with this type");
    res.json(courses);
};
//#################################### Search Course By Topic and Level ########################
async function findCourseByTopicAndLevel(req, res) {
    const topicName = req.params.topicName;
    const level = req.params.level;
    const courses = await Course.find({
      "topic.topicName": topicName,
      "Level": level
    }).lean();
    if (!courses) return res.status(404).send("There are no courses with this topic and level");
    res.json(courses);
  }
  
//#################################### Delete Course #################################
async function deleteCourse(req , res){
    const course =await  Course.findByIdAndRemove(req.params.id);
    if(!course) return res.status(404).send("The course does not exist");
    res.send("The Course : "+ course.nameCourse + " is deleted successfully");
};
//#################################### Add Course + Upload Pdf #######################
async function AddCoursePdf(req, res){

    // Lecture du fichier PDF téléchargé et conversion en buffer
    const pdfPath = path.join("D:/PI/DownToWork_Node/", '/uploads', req.file.originalname);
    console.log("this is what i am looking for "+ req.file.originalname);    
    const dataBuffer = fs.readFileSync(pdfPath);
    const topic = await Topic.findById(req.body.topicId);
    console.log(topic);
    if(!topic) return res.status(400).send("Topic is not found");
    const { nameCourse, descriptionCourse,Level ,imageCourse,type,videoUrl} = req.body;
  
    // Enregistrez le fichier PDF dans la base de données MongoDB
    let cours = new Course({
         nameCourse,
         descriptionCourse,
         Level,
         imageCourse,
         type,
         videoUrl,
         topic : {
            _id : topic.id,
            topicName : topic.topicName,
            topicImg : topic.topicImg,
            TopicDesc : topic.TopicDesc
        },
         pdf: {
             data: dataBuffer,
             contentType: 'application/pdf'
        }
    })
    await cours.save();
    res.send(cours);
};
//#################################### download Course ##############################
async function downloadCoursePdf(req, res) {
    try {
      const courseId = req.params.courseId;
      const course = await Course.findById(courseId);
      if (!course) {
        return res.status(404).send('Course not found');
      }
  
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', `attachment; filename=${course.nameCourse}.pdf`);
      res.send(course.pdf.data);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal server error');
    }
  }
exports.addCourse = addCourse;
exports.updateCourse = updateCourse;
exports.getCourse = getCourse;
exports.deleteCourse = deleteCourse;
exports.courseList = courseList;
exports.findCourseByType = findCourseByType;
exports.findCourseByTopic = findCourseByTopic;
exports.AddCoursePdf = AddCoursePdf;
exports.downloadCoursePdf = downloadCoursePdf;
exports.findCourseByTopicAndLevel = findCourseByTopicAndLevel;