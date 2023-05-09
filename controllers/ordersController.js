const Order = require("../models/Order");
const Product = require("../models/Product");


//CREATE

const CreatetOrder =  async (req, res) => {
  const newOrder = new Order(req.body);

  try {
    const savedOrder = await newOrder.save();
    res.status(200).json(savedOrder);
  } catch (err) {
    res.status(500).json(err);
  }
};

//UPDATE
const UpdateOrder = async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedOrder);
  } catch (err) {
    res.status(500).json(err);
  }
};

//DELETE
const DeleteOrder = async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.status(200).json("Order has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
};

//GET USER ORDERS
const getOrdersByUserId= async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId });
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
};

// //GET ALL

const getAllOrders =  async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
};

//get oreder by product Owner id
const GetOrdersByProductOwnerId = async (req, res) => {
try{const orders = await Order.find({
  "products.productId": { $in: await Product.find({ownerId: req.params.id }).distinct("_id") }
}).exec();
res.status(200).json(orders);
}
catch(err){
  console.log(err);
  res.status(500).json(err);
}
};


// GET MONTHLY INCOME

const GetMonthlyIncome = async (req, res) => {
  const productId = req.query.pid;
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

  try {
    const income = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: previousMonth },
          ...(productId && {
            products: { $elemMatch: { productId } },
            status: { $ne:"Declined" }, 
          }),
        },
      },
      {
        $project: {
          month: { $month: "$createdAt" },
          sales: "$amount",
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: "$sales" },
        },
      },
      {
        $sort: {
          _id: 1,
        },
      }
    ]);
    res.status(200).json(income);
  } catch (err) {
    res.status(500).json(err);
  }
};
//get all months income 
const GetAllMonthlyIncome = async (req, res) => {
  const productId = req.query.pid;
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

  try {
    const income = await Order.aggregate([
      {
        $match: {
          //createdAt: { $gte: previousMonth },
          ...(productId && {
            products: { $elemMatch: { productId } },
            status: { $ne: "Declined" },
          }),
        },
      },
      {
        $project: {
          month: { $month: "$createdAt" },
          sales: "$amount",
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: "$sales" },
        },
      },
      {
        $sort: {
          _id: 1,
        },
      }
    ]);
    res.status(200).json(income);
  } catch (err) {
    res.status(500).json(err);
  }
};

//get monthly income by product owner

const GetMonthlyIncomeByProductOwner = async (req, res) => {
  const ownerId = req.params.id;
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

  try {
    const productIds = await Product.find({ ownerId }).distinct("_id");
    console.log(productIds);

    const orders = await Order.find({
      "products.productId": { $in: productIds },
    }).exec();
    console.log(orders);

    const orderIds = orders.map((order) => order._id);
    console.log(orderIds);

    const income = await Order.aggregate([
      {
        $match: {
          _id: { $in: orderIds },
          createdAt: { $gte: previousMonth },
          status: { $ne: "Declined" },
       },
      },
      
   
      {
        $project: {
          month: { $month: "$createdAt" },
          sales: "$amount",
        },
      },
      {
        $group: {
          _id: '$month',
          total: { $sum: '$sales' },
        },
      },
      {
        $sort: {
          _id: 1,
        },
      }
    ]);
  
    res.status(200).json(income);

  } catch (err) {
    res.status(500).json(err);
  }
};

//get all monthly income by product owner
const GetAllMonthlyIncomeByProductOwner = async (req, res) => {
  const ownerId = req.params.id;
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

  try {
    const productIds = await Product.find({ ownerId }).distinct("_id");
    console.log(productIds);

    const orders = await Order.find({
      "products.productId": { $in: productIds },
    }).exec();
    console.log(orders);

    const orderIds = orders.map((order) => order._id);
    console.log(orderIds);

    const income = await Order.aggregate([
      {
        $match: {
          _id: { $in: orderIds },
          status: { $ne: "Declined" },
          //createdAt: { $gte: previousMonth },
       },
      },
      // {
      //   $lookup: {
      //     from: 'products',
      //     localField: 'products.productId',
      //     foreignField: '_id',
      //     as: 'product',
      //   },
      // },
      // {
      //   $unwind: '$product',
      // },
      // {
      //   $match: {
      //     'product.ownerId': ownerId,
      //   },
      // },
      {
        $project: {
          month: { $month: "$createdAt" },
          sales: "$amount",
        },
      },
      {
        $group: {
          _id: '$month',
          total: { $sum: '$sales' },
        },
      },
    ]);
  
    res.status(200).json(income);

  } catch (err) {
    res.status(500).json(err);
  }
};



module.exports = {
    CreatetOrder,
    UpdateOrder,
    DeleteOrder,
    getOrdersByUserId,
    getAllOrders,
    GetMonthlyIncome,
    GetOrdersByProductOwnerId,
    GetMonthlyIncomeByProductOwner,
    GetAllMonthlyIncome,
    GetAllMonthlyIncomeByProductOwner,
};