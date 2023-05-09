const express = require('express')
const Product = require('../models/Product')
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
});

const upload = multer({ storage: storage });

//*****************************Create ****************/
exports.add = (req, res, next) => {
    console.log(req.file, req.body, 16)

    if (Object.keys(req.body).length === 0) {
        res.status(400).send({ message: "Content can not be emtpy!" });
        return;
    }

    const newProduct = new Product({
        prodName: req.body.prodName,
        prodDesc: req.body.prodDesc,
        prodImg: {
            data: req.file.buffer,
            contentType: req.file.mimetype,
            imgUrl: req.file.path
        },

        prodPrice: req.body.prodPrice,
        prodBrand: req.body.prodBrand,
        prodCateg: req.body.prodCateg,
        ownerId: req.body.ownerId
    })
    newProduct.save()
        .then((product) => res.status(201).json({ message: "Product added with sucess !", product }))
        .catch(err => res.status(400).json({ message: err.message || "Some error occurred while creating a Product" }));
}

//***************************** Enpoint to  (get All products  - get product By Id )  ******************/
exports.find = (req, res, next) => {


    const id = req.params.id;
    console.log('Received request for ID:', id);
    (id) ? Product.findOne({ _id: req.params.id })
        .then((product) => { (product) ? res.send(product) : res.status(404).send({ message: "Not found Product with id " + req.params.id }) })
        .catch((err) => res.status(500).send({ message: "Error retrieving product with id " + req.params.id, error: +err })) : Product.find()
            .then((products) => res.send(products))
            .catch((err) => res.send({ message: "Error retrieving products", error: err }))
}

//**************************** Endpoint to delete a product **************** */
// exports.find = (req, res, next) => {
// (id) ? Product.findOne({ _id: req.params.id })
//   .then((product) => { (product) ? res.send(product) : res.status(404).send({ message: "Not found Product with id " + req.params.id }) })
//   .catch((err) => res.status(500).send({ message: "Error retrieving product with id " + req.params.id, error: +err })) : Product.find()
//   .then((products) => res.send(products))
//   .catch((err) => res.send({ message: "Error retrieving products", error: err }))
// }
exports.delete = (req, res) => {
    const id = req.params.id;
    Product.findByIdAndDelete(id)
        .then(product => {
            (!product) ? res.status(404).send({ message: `Cannot Delete with id ${id}. Maybe id is wrong` })
                : res.send({ message: "product was deleted successfully!" })
        })
        .catch(err => { res.status(500).send({ message: "Could not delete product with id=" + id, error: err }); });
}


//**************************** Endpoint to update a product **************** */
exports.update = (req, res) => {


    if (Object.keys(req.body).length === 0) { return res.status(400).send({ message: "product with new informations must be provided" }) }

    const id = req.params.id;
    //The { useFindAndModify: false} option is used to avoid using the deprecated findAndModify() method
    //The { new: true } option tells Mongoose to return the updated document instead of the original one.
    Product.findOneAndUpdate({ _id: id }, { prodRate:req.body.prodRate,prodRateNbr:req.body.prodRateNbr }, { useFindAndModify: false, new: true })
        .then(product => { (!product) ? res.status(404).send({ message: `Cannot Update product with ${id}. Maybe product not found!` }) : res.send(product) })
        .catch(err => res.status(500).send({ message: "Error Update product information", error: +err }))
}

//update product
exports.updateProduct = (req, res) => {
    const id = req.params.id;
    const product = req.body;
    Product.findByIdAndUpdate(id, product, { useFindAndModify: false })
        .then((data) => {
            (!data) ? res.status(404).send({ message: `Cannot Update product with ${id}. Maybe product not found!` }) : res.send({ message: "product was updated successfully." })
        })
        .catch((err) => res.status(500).send({ message: "Error Update product information", error: +err }))
}




//get products by ownerId
exports.findProductByOwnerId = (req, res, next) => {
    const id = req.params.id;
    Product.find({ ownerId: id })
      .then((products) => {
            const productIds = products.map((element) => element._id);
            res.send(productIds);
      })
      .catch((err) => res.send({ message: "Error retrieving products", error: err }));
  };
  //get product details by owner Id
    exports.findProductDetailsByOwnerId = (req, res, next) => {
        const id = req.params.id;
        Product.find({ ownerId: id })
          .then((products) => {
            const UserProducts = products.map((element) => element);
            res.send(UserProducts);
          })
          .catch((err) => res.send({ message: "Error retrieving products", error: err }));
      };






