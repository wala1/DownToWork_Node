const express = require('express');
const router = express.Router();
const {videoList, addVideo ,findVideoByTopicAndLevel, findVideoByTopic,deleteVideo,updateVideo} = require('../controllers/videoCotroller')

router.get('/',videoList);
router.post('/add-video',addVideo);
router.get('/find-video-topic/:topicName',findVideoByTopic);
router.get('/find-video-topic-level/:topicName/:level',findVideoByTopicAndLevel);
router.put('/update-video/:id',updateVideo);
router.delete('/deleteVideo/:id',deleteVideo);

module.exports = router;