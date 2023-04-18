const yup = require ('yup')

const postValidator = async function(req , res , next) {

    try {const schema = yup.object().shape({
    
        text : yup.string().required() ,
      
        }) ;
        await schema.validate(req.body) 
        next() ;
    }
     catch (err) {console.log(err)
     res.json({error : err.errors})
    }
     
    
    }
    
    module.exports = postValidator 
    

