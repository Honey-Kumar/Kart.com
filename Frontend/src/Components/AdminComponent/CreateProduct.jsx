import React, { useState, useCallback, useEffect } from 'react';
import { AiFillProduct } from "react-icons/ai";
import { IoPricetag } from "react-icons/io5";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { IoCloseCircleOutline } from 'react-icons/io5';
import ReactStars from 'react-stars';
import { toast, ToastContainer } from 'react-toastify';
import { useDropzone } from 'react-dropzone';
import { IoMdAddCircle, IoMdRemoveCircle } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import { CreateNewProduct } from '../../Redux/Slicers/Products';
import { DNA } from 'react-loader-spinner';

const CreateProduct = () => {
    const dispatch = useDispatch();
    const { isLoading, isError, Errmsg } = useSelector(state => state.Products)
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [images, setImages] = useState([]);
    const [imagePreviews, setImagePreviews] = useState([]);
    const [price, setPrice] = useState('');
    const [ratings, setRatings] = useState(1);
    const [categories, setCategories] = useState([]);
    const [categoryInput, setCategoryInput] = useState('');
    const [stock, setStock] = useState('');

    // Handle drag and drop image upload
    const onDrop = useCallback((acceptedFiles) => {
        const filePreviews = acceptedFiles.map(file => {
            const preview = URL.createObjectURL(file);
            return { file, preview };
        });

        setImages(prev => [...prev, ...acceptedFiles]);
        setImagePreviews(prev => [...prev, ...filePreviews]);
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: 'image/*',
        multiple: true,
    });

    // Remove image
    const removeImage = (index) => {
        const updatedImages = images.filter((_, imgIndex) => imgIndex !== index);
        const updatedPreviews = imagePreviews.filter((_, imgIndex) => imgIndex !== index);

        setImages(updatedImages);
        setImagePreviews(updatedPreviews);
    };

    // Handle category addition
    const handleCategoryInputKeyDown = (e) => {
        if (e.key === 'Enter' && categoryInput.trim()) {
            e.preventDefault();
            setCategories((prev) => [...prev, categoryInput.trim()]);
            setCategoryInput('');
        }
    };

    // Remove category
    const removeCategory = (categoryToRemove) => {
        setCategories(categories.filter(category => category !== categoryToRemove));
    };

    // Submit form
    const submitCreateForm = async (e) => {
        e.preventDefault();
        if (!name || !description || !price || !stock || categories.length === 0 || images.length === 0) {
            toast.error("Please fill all required fields and upload at least one image.");
            return;
        }

        const productData = new FormData();
        productData.append('name', name);
        productData.append('description', description);
        productData.append('price', price);
        productData.append('stock', stock);
        productData.append('ratings', ratings);
        categories.forEach(category => productData.append('category', category));
        images.forEach(image => {
            productData.append('image', image);
        });

        await dispatch(CreateNewProduct(productData));

        toast.success('Product created successfully!');
    };

    useEffect(() => {
        if (isError) {
            toast.error(Errmsg)
        }
    }, [])
    return (
        <div className="max-w-4xl max-sm:w-full mx-auto p-6">
            <ToastContainer />
            <div className="bg-blue-600 text-white p-4 text-center">
                <h2 className="text-2xl font-semibold">Create New Product</h2>
            </div>
            {
                isLoading ? <center><DNA
                    visible={true}
                    width="400"
                    color="#4fa94d"
                    ariaLabel="infinity-spin-loading"
                /></center> : <form
                    className="w-full flex flex-col gap-6 p-8 shadow-lg rounded-lg"
                    encType="multipart/form-data"
                    onSubmit={submitCreateForm}
                >
                    {/* Product Name */}
                    <div className="relative">
                        <AiFillProduct className="absolute top-3 left-5" size={25} />
                        <input
                            className="p-3 w-full outline-none border rounded-xl pl-12"
                            type="text"
                            placeholder="Enter Product Name"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    {/* Product Description */}
                    <div className="relative">
                        <AiFillProduct className="absolute top-3 left-5" size={25} />
                        <textarea
                            className="p-3 w-full outline-none border rounded-xl pl-12"
                            placeholder="Enter Product Description"
                            required
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>

                    {/* Product Price */}
                    <div className="relative">
                        <IoPricetag className="absolute top-3 left-5" size={25} />
                        <input
                            className="p-3 w-full outline-none border rounded-xl pl-12"
                            type="number"
                            placeholder="Enter Product Price"
                            required
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                    </div>

                    {/* Ratings */}
                    <div className="flex items-center gap-4">
                        <label className="text-lg">Ratings:</label>
                        <ReactStars
                            count={5}
                            value={ratings}
                            onChange={(e) => setRatings(e)}
                            half={true}
                            size={30}
                            color2={'#ffd700'}
                        />
                    </div>

                    {/* Categories Input */}
                    <div className="relative">
                        <BiSolidCategoryAlt className="absolute top-3 left-5" size={25} />
                        <input
                            className="p-3 w-full outline-none border rounded-xl pl-12"
                            type="text"
                            placeholder="Enter Category (e.g. Electronics, Apple, iPhone) and press Enter"
                            value={categoryInput}
                            onChange={(e) => setCategoryInput(e.target.value)}
                            onKeyDown={handleCategoryInputKeyDown}
                        />
                    </div>

                    {/* Display Categories */}
                    <div className="flex flex-wrap gap-2">
                        {categories.map((category, index) => (
                            <div key={index} className="bg-gray-200 rounded-full px-4 py-2 flex items-center gap-2">
                                {category}
                                <IoCloseCircleOutline
                                    className="cursor-pointer text-red-500"
                                    size={20}
                                    onClick={() => removeCategory(category)}
                                />
                            </div>
                        ))}
                    </div>

                    {/* Product Stock */}
                    <div className="relative">
                        <AiFillProduct className="absolute top-3 left-5" size={25} />
                        <input
                            className="p-3 w-full outline-none border rounded-xl pl-12"
                            type="number"
                            placeholder="Enter Product Stock"
                            required
                            value={stock}
                            onChange={(e) => setStock(e.target.value)}
                        />
                    </div>

                    {/* Drag and Drop Image Upload */}
                    <div {...getRootProps()} className={`border-dashed border-2 p-6 text-center cursor-pointer ${isDragActive ? 'bg-blue-100' : ''}`}>
                        <input {...getInputProps()} />
                        {isDragActive ? (
                            <p>Drop the files here ...</p>
                        ) : (
                            <p>Drag and drop some images here, or click to select images</p>
                        )}
                    </div>

                    {/* Image Preview */}
                    <div className="flex gap-2 flex-wrap">
                        {imagePreviews.map((img, index) => (
                            <div key={index} className="relative w-24 h-24">
                                <img
                                    src={img.preview}
                                    alt="Product Preview"
                                    className="w-full h-full object-cover rounded-lg"
                                />
                                <IoMdRemoveCircle
                                    className="absolute top-0 right-0 text-red-500 cursor-pointer"
                                    size={24}
                                    onClick={() => removeImage(index)}
                                />
                            </div>
                        ))}
                    </div>

                    <button
                        type="submit"
                        className="bg-pink-600 p-3 rounded-xl text-white font-semibold hover:bg-pink-700 transition-all"
                    >
                        Create Product
                    </button>
                </form>
            }
        </div>
    );
};

export default CreateProduct;

