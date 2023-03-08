const mongoose = require ('mongoose')

const PostSchema = mongoose.Schema({

 idPost : {type : Number , required : true},
 created_at : { type: Date, format: 'dd-mm-yyyy', required : true},
 updated_at : { type: Date, format: 'dd-mm-yyyy' , required : true},
 content :{ type : String , required:true}

})


module.exports = mongoose.model('Post' , PostSchema)