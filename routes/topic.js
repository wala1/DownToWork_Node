const multer = require('multer');
const express = require('express');
const path = require('path');
const validate = require('../middleWares/validateTopic'); 
const { Topic , topicSchema } =require("../models/Topics");
const {TopicsList, addTopic ,deleteTopic, updateTopic , topicById} = require("../controllers/topicController");

const router = express.Router();



// Storage engine 
const storage = multer.diskStorage({
    destination : './public/images',
    filename : (req , file , cb)  => {
        return cb(null ,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}` )
    }
})

// Define the multer
const upload = multer({
    storage : storage,
    // limits : {
    //     fileSize : 10
    // }
}) 

router.use('/topicImage', express.static('public/images')); 
router.get('/' ,  TopicsList);
router.post('/add' ,validate , upload.single('topicImage') , addTopic);
router.put('/update/:id', validate , updateTopic);
router.delete('/delete/:id', deleteTopic);
router.get('/find/:id' , topicById);


module.exports=router;