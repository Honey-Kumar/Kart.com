const express = require("express");
const { CreateOrder, OrderDetails, MyOrders, AllOrder, DeleteOrder, UpdateOrderStatus, OrderUpdate } = require("../Controller/OrderController");
const OrderRouter = express.Router();
const { Authentication, forAdmin } = require("../Middlewares/Authentication")

OrderRouter.route('/order/new').post(Authentication, CreateOrder)
OrderRouter.route('/order/:id').get(Authentication, OrderDetails).delete(Authentication, DeleteOrder).put(Authentication, OrderUpdate);
OrderRouter.route('/me/orders').get(Authentication, MyOrders)
OrderRouter.route('/admin/orders').get(Authentication, forAdmin, AllOrder)
OrderRouter.route('/admin/order/:id').put(Authentication, forAdmin, UpdateOrderStatus)

module.exports = OrderRouter;