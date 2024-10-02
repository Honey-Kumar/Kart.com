const CatchAsyncError = require("../Middlewares/CatchAsyncError");
const OrderSchema = require("../Models/OrderSchema");
const ProductSchema = require("../Models/ProductSchema");
const ErrorHandler = require("../utils/ErrorHandler");

const CreateOrder = CatchAsyncError(async (req, res, next) => {
    const { shippingInfo, order, payment, itemPrice, tax, shippingCost, totalprice } = req.body;
    const NewOrder = {
        shippingInfo,
        order,
        User: req.User._id,
        payment,
        itemPrice,
        tax,
        shippingCost,
        totalprice,
    }
    const result = await OrderSchema.create(NewOrder);
    return res.status(200).json({
        success: true,
        message: "Order Placed Successfully",
        response: result
    })
})

//Get Order Details By Id --- Both User/Admin
const OrderDetails = CatchAsyncError(async (req, res, next) => {
    const OrderId = req.params.id;
    const Orderdata = await OrderSchema.findById({ _id: OrderId }).populate("User", "firstname lastname email role");
    if (!Orderdata) {
        return next(new ErrorHandler("Order Details not Found", 404));
    }

    return res.status(200).json({
        success: true,
        message: "Order Details Fetched Successfully",
        response: Orderdata
    })
})


//Login User Orders Details
const MyOrders = CatchAsyncError(async (req, res, next) => {
    const Orderdata = await OrderSchema.find({ User: req.User.id }).populate("User", "firstname lastname email role");
    if (Orderdata.length <= 0) {
        return next(new ErrorHandler("You Don't have Placed any Order yet", 404));
    }
    return res.status(200).json({
        success: true,
        message: "Order Details Fetched Successfully",
        response: Orderdata
    })
})

//Get All Orders List ----Admin
const AllOrder = CatchAsyncError(async (req, res, next) => {
    const OrderList = await OrderSchema.find().populate("User", "firstname lastname email role");
    if (!OrderList) {
        return next(new ErrorHandler("Order Details not Found", 404));
    }
    //Calculating total orders and total valued orders 
    const totalorder = OrderList.length;
    let totalamount = 0;
    OrderList.forEach(index => totalamount += index.totalprice);

    return res.status(200).json({
        success: true,
        message: "Order Details Fetched Successfully",
        TotalOrders: totalorder,
        TotalValuedOrder: totalamount,
        response: OrderList
    })
})

//Deleting Order
const DeleteOrder = CatchAsyncError(async (req, res, next) => {
    const Orderdata = await OrderSchema.findById({ _id: req.params.id });
    if (!Orderdata) {
        return next(new ErrorHandler("Order Details not Found", 404));
    }
    const result = await OrderSchema.deleteOne({ _id: req.params.id });
    return res.status(200).json({
        success: true,
        message: "Order Details Deleted Successfully",
        response: result
    })
})

//Update Order Status and as per status update product stock ------Admin
const UpdateOrderStatus = CatchAsyncError(async (req, res, next) => {
    const Orderdata = await OrderSchema.findById({ _id: req.params.id });
    if (!req.body.status) {
        return next(new ErrorHandler("Please Mention any Status for Order Admin", 404));
    }
    if (!Orderdata) {
        return next(new ErrorHandler("Order Details not Found", 404));
    }
    if (Orderdata.orderStatus === 'Delivered') {
        return next(new ErrorHandler("Order is Already delivered to Customer", 403));
    }
    if (req.body.status === 'Processing') {
        return next(new ErrorHandler("Order is Already Shipped", 403));
    }
    if (req.body.status === 'Shipped') {
        Orderdata.order.forEach(iteam => updateStock(iteam.productData, iteam.quantity))
    }

    Orderdata.orderStatus = req.body.status;

    if (req.body.status === 'Delivered') {
        Orderdata.deliveredAt = Date.now();
    }
    await Orderdata.save({ validateBeforeSave: false });
    return res.status(200).json({
        success: true,
        message: "Order Status Changed Successfully"
    })

})

async function updateStock(id, quantity) {
    const productdata = await ProductSchema.findById({ _id: id });
    productdata.stock -= quantity;
    await productdata.save({ validateBeforeSave: false });
}


//Update Order route for User to update order details
const OrderUpdate = CatchAsyncError(async (req, res, next) => {
    const Orderdata = await OrderSchema.findById({ _id: req.params.id });
    if (!Orderdata) {
        return next(new ErrorHandler("Order Details not Found", 404));
    }
    if (!req.body.shippingInfo && !req.body.order) {
        return next(new ErrorHandler("Please Mention Any changes to Order", 404));
    }
    if (Orderdata.orderStatus === 'Shipped') {
        return next(new ErrorHandler("Order is Already Shipped, No Updation is Possible", 403));
    }
    if (Orderdata.orderStatus === 'Delivered') {
        return next(new ErrorHandler("Order is Already delivered to Customer", 403));
    }

    if (req.body.order) {
        req.body.order.forEach(newItem => {
            const existingItemIndex = Orderdata.order.findIndex(item => item.productData.toString() === newItem.productData.toString());

            if (existingItemIndex > -1) {
                Orderdata.order[existingItemIndex].quantity += Number(newItem.quantity);
            } else {
                Orderdata.order.push(newItem);
            }
        });
    }

    // updating ShiipingInfo to Order if exist
    if (req.body.shippingInfo) {
        Orderdata.shippingInfo = req.body.shippingInfo;
    }
    let total = 0;
    Orderdata.order.forEach((e) => {
        total += e.price * e.quantity
    })
    Orderdata.itemPrice = total;
    Orderdata.totalprice = Orderdata.itemPrice + Orderdata.tax + Orderdata.shippingCost;
    await Orderdata.save({ validateBeforeSave: false });
    return res.status(200).json({
        success: true,
        message: "Order Detailes Updated Successfully",
        response: Orderdata
    })

})



module.exports = { CreateOrder, OrderDetails, MyOrders, AllOrder, DeleteOrder, UpdateOrderStatus, OrderUpdate }