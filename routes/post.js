const express = require ('express')
const router = express.Router()
const Post = require ('../models/Post')
const PostController = require ('../controllers/postController')


router.post("/add" , PostController.add)
router.get("/getAll" , PostController.getAll)
router.get("/getById/:id" , PostController.getById)




module.exports=router