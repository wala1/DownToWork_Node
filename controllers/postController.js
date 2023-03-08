const express = require ('express')
const Post = require ('../models/Post')


//*****************************Create ****************/
exports.add = (req , res , next ) => {
    
   if(Object.keys(req.body).length === 0){
        res.status(400).send({ message : "Content can not be emtpy!"});
        return;
    }
    const newPost  = new Post({...req.body})
    newPost.save()
    .then((post)=>res.status(201).json({message:"Post added with sucess !" , post }))
    .catch(err => res.status(400).json({message : err.message || "Some error occurred while creating a Post"}));
  
  }
//***************************** Enpoint to  (get All posts  - get post By Id )  ******************/
exports.find = (req , res , next ) => {
 
    const id = req.params.id ;
    (id)? Post.findOne({_id :req.params.id })
    .then((post) => {(post)? res.send(post):res.status(404).send({message :"Not found Post with id "+ req.params.id })})
    .catch((err) =>res.status(500).send({ message: "Error retrieving post with id " + req.params.id , error : +err})): Post.find()
    .then((posts) => res.send(posts))
    .catch((err)=> res.send({message : "Error retrieving posts"  , error : err}))
} 

//**************************** Endpoint to delete a post **************** */

exports.delete = (req, res)=>{
    const id = req.params.id;
    Post.findByIdAndDelete(id)
    .then(post => { (!post)?  res.status(404).send({ message : `Cannot Delete with id ${id}. Maybe id is wrong`})
    :res.send({ message : "post was deleted successfully!"}) })
    .catch(err =>{res.status(500).send({message: "Could not delete User with id=" + id  , error : err}); });
}


