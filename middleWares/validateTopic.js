const yup = require('yup');
const validate = (async function(req , res , next ){
    try{
        const schema = yup.object().shape({
            topicName : yup.string().min(4).max(30).required(),
            topicImg : yup.string().required(),
            TopicDesc : yup.string().min(4).max(100).required(),
            
        });
        await schema.validate(req.body , {abortEarly : false});
        next();

    }catch(err){
        res.status(400).json({
            err : err.errors,
        });
    }
})
module.exports = validate ; 