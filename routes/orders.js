const express = require('express');
const router = express.Router();
const {CreatetOrder,
    UpdateOrder,
    DeleteOrder,
    getOrdersByUserId,
    getAllOrders,
    GetMonthlyIncome} = require('../controllers/ordersController.js');


//CREATE
router.post('/create',CreatetOrder);

//UPDATE
router.put('/:id',UpdateOrder);

//DELETE
router.delete('/:id',DeleteOrder);

//GET USER ORDERS
router.get('/find/:userId',getOrdersByUserId);

//GET ALL
router.get('/',getAllOrders);

//GET MONTHLY INCOME
router.get('/income',GetMonthlyIncome);

module.exports = router;
