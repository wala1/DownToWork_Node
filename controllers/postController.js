const express = require ('express')
const Post = require ('../models/Post')


//*****************************Create ****************/
function add (req , res , next ) {
    console.log(req.body)
   
    const newPost  = new Post ({...req.body})
    newPost.save()
    .then(()=>res.status(201).json({message:"Post added with sucess !"}))
    .catch(err => res.status(400).json({err}));

  }

//***************************** Read ******************/
function getAll (req , res , next ) {

    User.find()
    .then(posts =>res.status(201).json(posts))
    .catch(err => res.status(400).json({err}));

  }

//*************************getById ********************/

function getById ( req , res , next ) {
User.findOne({_id : req.params.id}) 
.then((post) => res.status(200).json(post))
.catch((err) => res.status(404).json({err}))
} 

//****************************getAll**************** */







  module.exports = {add , getAll , getById}