const express = require ('express')
const router = express.Router()
const Post = require ('../models/Post')
const PostController = require ('../controllers/postController')



// Route pour ajouter une publication dans la base de donnèe
router.post("/add" , PostController.add)

// Route pour récupérer toutes les publications  de la base de donnèe
router.get('/getAll', PostController.find);

// Route pour récupérer une publication  par son ID
router.get('/getById/:id', PostController.find);

// Route pour supprimer une publication  par son ID
router.delete('/delete/:id', PostController.delete);

// Route pour modifier une publication par son ID
router.put('/update/:id', PostController.update);


module.exports=router