const express = require("express");
const { Home, CreateProduct, ProductDetails, AllProduct, UpdateProduct, DeleteProduct, AddUpdateReview, ReviewList, DeleteReview } = require("../Controller/ProductController");
const { Authentication, forAdmin } = require("../Middlewares/Authentication");
const Productrouter = express.Router();

Productrouter.route('/').get(Home)
Productrouter.route('/product/new').post(Authentication, forAdmin, CreateProduct)
Productrouter.route('/product/:id').get(ProductDetails).put(Authentication, UpdateProduct).delete(Authentication, DeleteProduct)
Productrouter.route('/product').get(AllProduct)
Productrouter.route('/product/review/:id').put(Authentication, AddUpdateReview).get(Authentication, ReviewList).delete(Authentication, DeleteReview)

module.exports = Productrouter