const nodemailer = require ('nodemailer');


module.exports.sendCredentials= (
    name,
    email,
    password,
  ) => {
    try {
        
const transporter = nodemailer.createTransport(
    {
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
      user: 'onesdiouani@gmail.com',
      pass: 'eroeduihotnfawkk',
    },
    }
  )
  
  const mailOptions = {
    from : "onesdiouani@gmail.com",
    to : email ,
    subject: 'Account credentials From Down To Work',
    html: `
    <div>
    <h1>Activation du compte </h1>
      <h2>Bonjour ${name}</h2>
      <p>Veuillez confirmer votre email en cliquant sur le lien suivant
  </p>
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
  
    } 
    catch (err) { console.log(err);}
  }



  