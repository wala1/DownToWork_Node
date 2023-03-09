const mongoose = require ('mongoose')



const PostSchema = mongoose.Schema({

 created_at : { type: Date, format: "yyyy-mm-dd",default: Date.now },
 updated_at : { type: Date, format: "yyyy-mm-dd" },
 content :{ type : String , required:true}

})


 PostSchema.pre('findOneAndUpdate', function(next) {
    console.log('Middleware pre-hook called!');
    const currentDate = new Date();
   // this.update({ updated_at: currentDate });
    this.set({ updated_at: currentDate });
    next();
  }); 


module.exports = mongoose.model('Post' , PostSchema)
