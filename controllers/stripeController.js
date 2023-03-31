// const stripe = require("stripe")(process.env.STRIPE_KEY);
// const payment = (req,res)=>{
//     stripe.charges.create({
//         source : res.body.tokenId,
//         amount : req.body.amount,
//         currrency:"usd",   
//     },(stripeErr, stripeRes)=>{
//         if(stripeErr){
//             res.dtatus(500).json(stripeErr)
//         }
//     });

// };

// module.exports = payment;