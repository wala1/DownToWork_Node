const express = require('express');
const router = express.Router();
const {CreatetOrder,
    UpdateOrder,
    DeleteOrder,
    getOrdersByUserId,
    getAllOrders,
    GetOrdersByProductOwnerId,
    GetMonthlyIncomeByProductOwner,
    GetMonthlyIncome,
    GetAllMonthlyIncome,
    GetAllMonthlyIncomeByProductOwner} = require('../controllers/ordersController.js');


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

//get by product owner 
router.get('/productowner/:id',GetOrdersByProductOwnerId);

//get monthly income by product owner
router.get('/incomeByOwner/:id',GetMonthlyIncomeByProductOwner);

//get all monthly income
router.get('/allIncome',GetAllMonthlyIncome);

//get all monthly income by product owner
router.get('/allIncomeByOwner/:id',GetAllMonthlyIncomeByProductOwner);


module.exports = router;
