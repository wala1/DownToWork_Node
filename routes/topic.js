const { Topic , topicSchema } =require("../models/Topics");
const {TopicsList, addTopic ,deleteTopic, updateTopic , topicById} = require("../controllers/topicController")
const express = require('express');
const router = express.Router();

router.get('/' , TopicsList);
router.post('/add' , addTopic);
router.put('/:id', updateTopic);
router.delete('/:id', deleteTopic);
router.get('/:id' , topicById);


module.exports=router;