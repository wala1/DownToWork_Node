const express = require ('express')
const router = express.Router()
const Product = require ('../models/Product')
const productController = require ('../controllers/productController')
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


// Route pour ajouter un produit dans la base de donnèe
router.post("/add" , upload.single('prodImg'), productController.add)

// Route pour récupérer toutes les produits  de la base de donnèe
router.get('/getAll', productController.find);

// Route pour récupérer un produit  par son ID
router.get('/getById/:id', productController.find);

// Route pour supprimer un produit  par son ID
router.delete('/delete/:id', productController.delete);

// Route pour modifier un produit par son ID
router.put('/update/:id', productController.update);

router.put('/updateProduct/:id', productController.updateProduct);

router.get('/getByOwner/:id', productController.findProductByOwnerId)

router.get('/getProdByOwner/:id', productController.findProductDetailsByOwnerId)


module.exports=router