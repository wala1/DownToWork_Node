const express = require ('express')
const Post = require ('../models/Post')


//*****************************Create ****************/
exports.add = async (req , res , next ) => {
    
   if(Object.keys(req.body).length === 0){
        res.status(400).send({ message : "Content can not be emtpy!"});
        return;
    }
    const newPost  = new Post({...req.body})
   await newPost.save()
    .then((post)=>res.status(201).json({message:"Post added with sucess !" , post }))
    .catch(err => res.status(400).json({message : err.message || "Some error occurred while creating a Post"}));
  
  }
//***************************** Enpoint to  (get All posts  - get post By Id )  ******************/
exports.find = async (req , res , next ) => {
 
    const id = req.params.id ;
  await  (id)? Post.findOne({_id :req.params.id })
    .then((post) => {(post)? res.send(post):res.status(404).send({message :"Not found Post with id "+ req.params.id })})
    .catch((err) =>res.status(500).send({ message: "Error retrieving post with id " + req.params.id , error : +err})): Post.find()
    .then((posts) => res.send(posts))
    .catch((err)=> res.send({message : "Error retrieving posts"  , error : err}))
} 

//**************************** Endpoint to delete a post **************** */

exports.delete = async (req, res)=>{
    const id = req.params.id;
   await Post.findByIdAndDelete(id)
    .then(post => { (!post)?  res.status(404).send({ message : `Cannot Delete with id ${id}. Maybe id is wrong`})
    :res.send({ message : "post was deleted successfully!"}) })
    .catch(err =>{res.status(500).send({message: "Could not delete post with id=" + id  , error : err}); });
}

//**************************** Endpoint to update a Post **************** */
exports.update = async (req, res)=>{

    if(Object.keys(req.body).length === 0){ return res.status(400).send({ message : "post with new informations must be provided"})}

    const id = req.params.id;
    //The { useFindAndModify: false} option is used to avoid using the deprecated findAndModify() method
    //The { new: true } option tells Mongoose to return the updated document instead of the original one.
    await Post.findOneAndUpdate({_id: id}, {$set: req.body}, {useFindAndModify: false , new: true})
    .then(post => {(!post) ? res.status(404).send({ message : `Cannot Update post with ${id}. Maybe post not found!`}) :res.send(post)})
    .catch(err => res.status(500).send({ message : "Error Update post information" , error : +err}))
}
