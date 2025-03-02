const { response } = require("express")
const CatchAsyncError = require("../Middlewares/CatchAsyncError")
const ProductSchema = require("../Models/ProductSchema")
const ApiFeatures = require("../utils/ApiFeatures")
const ErrorHandler = require("../utils/ErrorHandler")
const cloudinary = require('cloudinary')

const Home = (req, res, next) => {
    res.status(200).json({
        success: true,
        message: 'welcome to shopy.com'
    })
}

// Product Routes 

// Create New Product ---Admin
const CreateProduct = CatchAsyncError(async (req, res, next) => {
    req.body.createdBy = req.User._id;

    if (!req.files || Object.keys(req.files).length === 0) {
        return next(new ErrorHandler("Image is Mandatory", 404));
    }

    console.log('req.body', req.body)
    const newproductfolder = `Products/${req.body.name.trim()}`

    // create a list for getting images after storing on cloudinary
    const ProductImagelist = []

    const files = req.files.image;  // assuming 'image' is the field name in the frontend

    // Ensure files is an array (multiple files)
    const imagesArray = Array.isArray(files) ? files : [files];

    // Upload each image to Cloudinary
    for (const file of imagesArray) {
        const result = await cloudinary.v2.uploader.upload(file.tempFilePath, {
            folder: newproductfolder,
            width: 150,
            srop: 'scale'
        });
        ProductImagelist.push({
            public_id: result.public_id,
            url: result.secure_url,
        });
    }

    req.body.image = ProductImagelist

    const newproduct = await ProductSchema.create(req.body);
    return res.status(200).json({
        success: true,
        message: "New Product Created Successfully",
        response: newproduct
    })
})

//Get Product Details By Id
const ProductDetails = CatchAsyncError(async (req, res, next) => {
    const ProductId = req.params.id;
    const response = await ProductSchema.findById({ _id: ProductId });
    if (!response) {
        return next(new ErrorHandler("Product Details not found", 404));
    } else {
        return res.status(200).json({
            success: true,
            message: "Product Details Fetched Successfully",
            response
        })
    }
})

//Get all Products List
const AllProduct = CatchAsyncError(async (req, res, next) => {
    const resultperpage = 10;
    const result = new ApiFeatures(ProductSchema.find(), req.query).search().filter().pagination(resultperpage);
    const response = await result.query;
    const productsCount = await ProductSchema.countDocuments();
    if (!response) {
        return next(new ErrorHandler("No Product not found", 404));
    } else {
        return res.status(200).json({
            success: true,
            message: "Product List Fetched Successfully",
            response,
            productsCount
        })
    }
})

//Update Product Details ---Admin
const UpdateProduct = CatchAsyncError(async (req, res, next) => {
    const ProductId = req.params.id;
    console.log("req.body ", req.body, " re.files ", req.files)
    const result = await ProductSchema.findById(ProductId);
    if (!result) {
        return next(new ErrorHandler("Product Details not found", 404))
    }
    //check if body have file Image or not 
    if (req.files || Object.keys(req.files).length > 0) {
        const newproductfolder = `Products/${result.name}`
        const ProductImagelist = []
        const files = req.files.image;
        // Ensure files is an array (multiple files)
        const imagesArray = Array.isArray(files) ? files : [files];
        // Upload each image to Cloudinary
        for (const file of imagesArray) {
            const result = await cloudinary.v2.uploader.upload(file.tempFilePath, {
                folder: newproductfolder,
                width: 150,
                srop: 'scale'
            });
            ProductImagelist.push({
                public_id: result.public_id,
                url: result.secure_url,
            });
        }
        req.body.image = ProductImagelist
    }

    const response = await ProductSchema.findByIdAndUpdate(ProductId, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    })
    console.log("response ", response)
    return res.status(200).json({
        success: true,
        message: "Product Details Updated Successfully",
        response
    })
})

//Delete Product By Id ---Admin
const DeleteProduct = CatchAsyncError(async (req, res, next) => {
    const ProductId = req.params.id;
    const result = await ProductSchema.findById(ProductId);
    if (!result) {
        return next(new ErrorHandler("Product Details not found", 404))
    } else {
        const response = await ProductSchema.deleteOne({ _id: ProductId });
        return res.status(200).json({
            success: true,
            message: "Product Deleted Successfully",
            response
        })
    }
})


// Handing Product Review part

//Adding or Updating Existing Review to product
const AddUpdateReview = CatchAsyncError(async (req, res, next) => {
    // review
    const { name, rating, comment } = req.body;
    if (!name || !rating || !comment) {
        return next(new ErrorHandler("Please Enter Reqired Filled", 404))
    }
    const Reviewbody = {
        name,
        rating: Number(rating),
        Comment: comment,
        createdBy: req.User.id
    }
    const ProductId = req.params.id;
    const result = await ProductSchema.findById(ProductId);
    if (!result) {
        return next(new ErrorHandler("Product Details not found", 404))
    }
    //updation check
    let isReviewed = false;
    result.review.forEach((rev) => {
        if (rev.createdBy.toString() === req.User.id.toString()) {
            rev.name = name;
            rev.rating = Number(rating);
            rev.Comment = comment;
            isReviewed = true;
        }
    })

    //if review not added before then add it
    if (!isReviewed) {
        result.review.unshift(Reviewbody);
    }

    // update ratings and noOfreviews based on changes to review
    result.noOfreviews = result.review.length;
    let avg = 0;
    result.review.forEach((rev) => {
        avg += rev.rating;
    })
    result.ratings = avg / result.noOfreviews;
    console.log(result);

    await result.save({ validateBeforeSave: false });
    return res.status(200).json({
        success: true,
        message: "Review Maintained Successfully",
        response: result
    })

})

//Get Product Reviews
const ReviewList = CatchAsyncError(async (req, res, next) => {
    const ProductId = req.params.id;
    const result = await ProductSchema.findById(ProductId);
    if (!result) {
        return next(new ErrorHandler("Product Details not found", 404))
    }
    const ReviewList = result.review;
    return res.status(200).json({
        success: true,
        message: 'Review List Fetched Successfully',
        Count: ReviewList.length,
        response: ReviewList
    })
})

// Delete Review 
const DeleteReview = CatchAsyncError(async (req, res, next) => {
    const ProductId = req.params.id;
    const result = await ProductSchema.findById(ProductId);
    if (!result) {
        return next(new ErrorHandler("Product Details not found", 404))
    }
    let index = 0;
    result.review.forEach((rev) => {
        if (rev.createdBy.toString() === req.User.id.toString()) {
            index = rev;
        }
    })
    const deletediteam = result.review.splice(index, 1);

    result.noOfreviews = result.review.length;
    let avg = 0;
    result.review.forEach((rev) => {
        avg += rev.rating;
    })
    result.ratings = avg / result.noOfreviews;
    console.log(result);

    await result.save({ validateBeforeSave: false });
    return res.status(200).json({
        success: true,
        message: 'Review Deleted Successfully',
        response: deletediteam
    })
})

module.exports = { Home, CreateProduct, ProductDetails, AllProduct, UpdateProduct, DeleteProduct, AddUpdateReview, ReviewList, DeleteReview }