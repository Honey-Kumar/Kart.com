const express = require("express");
const { CreateUser, DeteletUser, UserDetails, UpdateUser, LoginUser, Logout, ForgetPassword, resetUserpassword, AllUsersList } = require("../Controller/UsersController");
const { Authentication, forAdmin } = require("../Middlewares/Authentication");
const UserRouter = express.Router();

UserRouter.route('/user/new').post(CreateUser);
UserRouter.route('/user/:id').delete(Authentication, DeteletUser).get(Authentication, UserDetails).put(Authentication, UpdateUser);
UserRouter.route('/user/login').post(LoginUser);
UserRouter.route('/logout').get(Logout);
UserRouter.route('/password/forget').post(ForgetPassword);
UserRouter.route('/user/password/:token').put(Authentication, resetUserpassword);
UserRouter.route('/admin/users').get(Authentication, forAdmin, AllUsersList);

module.exports = UserRouter