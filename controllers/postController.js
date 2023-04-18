const Post = require ('../models/Post')
const User = require ('../models/user')

//*****************************Create ****************/
exports.add = async (req , res , next ) => {

  try {

  const user = await User.findById(req.user.id)
  const newPost = new Post ( {
   
    text : req.body.text ,
    user : req.user.id ,
    name : user.name 

  } )

  await newPost.save().then((post)=> { res.json(post) }).catch((error)=> res.json(error))
  
  } catch (error) {
    
    res.status(500).send ( "Server Error")
  }
  
  }
//***************************** Enpoint to get All posts By userId ******************/

  exports.findByUser = async (req, res , next) => {
    const userId = req.params.id;
    const userPosts = await Post.find({user: userId });
    res.json(userPosts);
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
