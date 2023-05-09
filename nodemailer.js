const nodemailer = require ('nodemailer');

const transport = nodemailer.createTransport({
    host:'smtp.gmail.com',
            port:587,
            secure:false,
            requireTLS : true,
    auth: {
      user: "DownToWork98@gmail.com",
      pass: "xhcqnjahqhsgublw",
    },
  });

  module.exports.sendConfirmationEmail = (
    name,
    email,
    password,
    activationCode
    
  ) => {
    // transport houwa jesr from chkoun to amal  html body message chnouwa f wostou
    try{
        const transporter = nodemailer.createTransport({
            host:'smtp.gmail.com',
            port:587,
            secure:false,
            requireTLS : true,
            auth: {
                user : "DownToWork98@gmail.com",
                pass:"xhcqnjahqhsgublw"
            }
        });
        const mailOptions = {
            from : mailConfig.emailUser,
            to : email,
            subject : 'For Reset Password',
            // html : '<p> Welcome ' + name + ',Please copy the link <a href="http://localhost:3000/reset-password?token='+token+'">  and reset your password </a>'
            html : `
            <div>
            <h1>Activation du compte </h1>
              <h2>Bonjour ${name}</h2>
              <p>Veuillez confirmer votre email en cliquant sur le lien suivant
      </p>
              <a href=http://localhost:3000/confirm/${activationCode}>Cliquez ici
      </a>
      <ul>
      <li> votre nom d'utilisateur ${name}  </li>
      <li> votre mot de passe ${password}  </li>
      </ul>
              </div>`,
    };
    transporter.sendMail (mailOptions, function (error, info) {
      if (error) {
        console.log (error);
      } else {
        console.log ('Mail has been sent', info.response);
      }
    });
  } catch (error) {
    // res.status(400).send({success:false,msg:error.message});
  }
};


/*********************************************************************************************************/

