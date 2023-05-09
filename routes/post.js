const express = require ('express')
const router = express.Router()
const Post = require ('../models/Post')
const PostController = require ('../controllers/postController')
const {protect} = require ('../middleWares/authMiddleWare')
const postValidator = require ('../middleWares/postValidator')


// Route pour ajouter une publication dans la base de donnèe
router.post("/add" , protect , postValidator, PostController.add)

// Route pour récupérer toutes les publications  de la base de donnèe
router.get('/getAll', PostController.findAll);

// Route pour récupérer toutes les publications  de la base de donnèe
router.get('/getAllByUser/:id', PostController.findByUser);

// Route pour récupérer une publication  par son ID
router.get('/getById/:id', PostController.find);

// Route pour supprimer une publication  par son ID
router.delete('/delete/:id', protect , PostController.deletee);

// Route pour modifier une publication par son ID
router.put('/update/:id', PostController.update);

// Route pour récupérer une publication  par son ID
router.post('/liker/:postId/:userId', PostController.liker);




module.exports=router