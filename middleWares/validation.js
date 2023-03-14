const yup = require('yup');


const validate = async function (req, res, next) {
    try {
        const registerSchema = yup.object().shape({
            name: yup.string().required(),
            email: yup.string().email().required(),
            password: yup.string().required(),
           // DateOfBirth: yup.date().required(),
        });
        
        await registerSchema.validate(req.body);
        next();
    } catch (error) {
        res.status(400).send(error.message);
    }
};

module.exports = {
  
    validate,
};
