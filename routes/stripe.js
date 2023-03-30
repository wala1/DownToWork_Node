const router = require("express").Router();
const stripe = require("stripe")("sk_test_51MpqyNGRNqPvE5WcJcK2DAoOde9xQUwv1P4ioDv4zoz30JC7aCZpBeOHf07MHC5FLX8lS9Xku907qSv1i2a7493L001V8AzvE1");

router.post("/payment", (req, res) => {
  stripe.charges.create(
    {
      source: req.body.tokenId,
      amount: req.body.amount,
      currency: "usd",
    },
    (stripeErr, stripeRes) => {
      if (stripeErr) {
        res.status(500).send(stripeErr.message);
        console.log(stripeErr.message)
      } else {
        res.status(200).json(stripeRes);
      }
    }
  );
});

module.exports = router;
