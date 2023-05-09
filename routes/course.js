const express = require('express');
const multer = require('multer');
const router = express.Router();
const path = require('path');

const { addCourse, courseList , updateCourse ,getCourse ,deleteCourse,downloadCoursePdf ,findCourseByTopicAndLevel,AddCoursePdf,findCourseByType,findCourseByTopic,downloadPdf,uploadFile,test} = require('../controllers/courseController');

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
})
//Configuration de multer pour enregistrer les fichiers dans le dossier uploads/
const storageFile = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  });
const uploadFileCourse = multer({ 
    storage: storageFile,
    dest: 'uploads/' // Spécifiez le dossier de destination pour le fichier téléchargé
}); 

router.use('/imageCourse', express.static('public/images')); 
router.get('/' ,courseList);
router.get('/find/:id' , getCourse);
router.get('/find-type/:type' , findCourseByType);
router.get('/find-topic/:topicName' , findCourseByTopic);
router.get('/download/:courseId',downloadCoursePdf);
router.get('/find-topic-level/:topicName/:level',findCourseByTopicAndLevel);
router.put('/update/:id' , updateCourse);
router.post('/add' ,upload.single('imageCourse'), addCourse);
router.post('/add-pdf',uploadFileCourse.single('pdf') ,AddCoursePdf);
router.delete('/delete/:id' , deleteCourse);


module.exports = router;