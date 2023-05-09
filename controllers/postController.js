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

  //***************************** Enpoint to get All posts By userId ******************/

  exports.findAll = async (req, res , next) => {
    const Posts = await Post.find();
    res.setHeader('Cache-Control', 'no-cache, no-store');
    res.setHeader('Expires', '0');
    res.send(Posts);
  }


//***************************** Enpoint to  (get All posts  - get post By Id )  ******************/
exports.find = async (req , res , next ) => {
 
  const id = req.params.id ;
  await  (id)? Post.findOne({_id :req.params.id })
    .then((post) => {(post)?  res.send(post):res.status(404).send({message :"Not found Post with id "+ req.params.id })})
    .catch((err) =>res.status(500).send({ message: "Error retrieving post with id " + req.params.id , error : +err})): Post.find()
    .then((posts) => res.send(posts))
    .catch((err)=> res.send({message : "Error retrieving posts"  , error : err}))
} 

//**************************** Endpoint to delete a post  // DELETE /posts/:postId **************** */
// DELETE /posts/:postId
  exports.deletee =  async (req, res) => {
  try {
    console.log('Hello from deletee');
    const post = await Post.findById(req.params.id);

    if (!post) {
      console.log('Publication introuvable');
      return res.status(404).json({ message: 'Publication introuvable' });
    }

    // Vérifiez si l'utilisateur qui a créé la publication est celui qui essaie de la supprimer
    if (post.user.toString() !== req.user.id) {
      console.log('Non autorisé');
      return res.status(401).json({ message: 'Non autorisé' });
    }

    await post.remove();
    console.log('Publication supprimée');
    res.json({ message: 'Publication supprimée' });
    
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erreur serveur');
  }
  }

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

//       Liker 
exports.liker = async (req, res) => {
  try {
    console.log('Heyyyyyyyyy i m innnnnnnnnnnnnnnnnnnnnnnnnnn ');
    console.log(req.params.postId);
    console.log(req.params.userId);

    const post = await Post.findById(req.params.postId);

    if (!post) {
      console.log('Post not found' );
      return res.status(404).json({ msg: 'Post not found' });
    }

    const userId = req.params.userId;
    console.log('here is the user id');
    console.log(userId);

    const alreadyLiked = post.likes.some((like) => {
     // console.log(like.user.toString());
     return like.user.toString() === userId;});

      console.log(alreadyLiked);
    if (alreadyLiked) {
      post.likes = post.likes.filter((like) => like.user.toString() !== userId);
      await post.save();
      return res.status(200).send(post.likes.length.toString());
    }

    post.likes.unshift({ user: userId });
    await post.save();
    
    res.send(post.likes.length.toString());
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
}