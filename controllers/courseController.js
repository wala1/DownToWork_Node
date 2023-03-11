const {schemaCourse ,  Course} = require('../models/Course');
const {Topic} =  require('../models/Topics');

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
        topic : {
            _id : topic.id,
            topicName : topic.topicName,
            topicImg : topic.topicImg
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
            level :req.body.descriptionCourse

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
async function deleteCourse(req , res){
    const course = Course.findByIdAndRemove(req.params.id);
    if(!course) return res.status(400).send("The course does not exist");
    res.send(course);
};
exports.addCourse = addCourse;
exports.updateCourse = updateCourse;
exports.getCourse = getCourse;
exports.deleteCourse = deleteCourse;
exports.courseList = courseList;