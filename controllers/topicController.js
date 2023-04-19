const { Topic , topicSchema } =require("../models/Topics");
async function TopicsList  (req , res , next )  {
    const topics = await Topic.find();
    res.send(topics);
};
async function addTopic(req , res , next){
    let topic = new Topic({
        topicName : req.body.topicName,
        topicImg : req.body.topicImg,
        //`http://localhost:3001/topicImage/${req.file.filename}`
        TopicDesc : req.body.TopicDesc
    })
    topic = await topic.save();
    res.send(topic);

};
async function updateTopic(req , res , next){
    const topic = await Topic.findByIdAndUpdate(req.params.id ,
         {topicImg : req.body.topicImg,
          topicName : req.body.topicName ,
          TopicDesc : req.body.TopicDesc
        } ,
         { new : true});
    if(!topic){
        return res.status(404).send('the topic with the given id was not found');
    }
    res.send(topic);
};
async function deleteTopic(req , res , next){
    const topic = await Topic.findByIdAndRemove(req.params.id);
    if(!topic) return res.status(404).send('the topic with the given id was not found');
    res.send(topic);
}
async function topicById(req,res , next ){
    const topic = await Topic.findById(req.params.id);
    if(!topic) return res.status(404).send('the topic with the given id was not found');
    res.send(topic);
}

exports.TopicsList = TopicsList;
exports.addTopic = addTopic;
exports.updateTopic = updateTopic;
exports.deleteTopic = deleteTopic;
exports.topicById = topicById;