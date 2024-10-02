import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { FetchProductDetails } from "../Redux/Slicers/Products";
import { useParams } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import "react-multi-carousel/lib/styles.css";
import Logo from "../assets/Kart.com-1.png"
import { FaEdit, FaStar } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
import ReactStars from "react-stars";
import ClickButton from "../Components/ClickButton";
import { ToastContainer, toast } from 'react-toastify';
import { AddtoCart } from "../Redux/Slicers/CartSlicer";
import { DNA } from 'react-loader-spinner'
import QuantityBtn from "../Components/QuantityBtn";


const ProductDetail = () => {
    const dispatch = useDispatch();
    const productdata = useSelector(state => state.Products.productdetails)
    const { CartIteams, Loading, Errormsg, Errors, iteamadded } = useSelector(state => state.Cart)
    console.log(productdata)
    const { id } = useParams()

    //handling Addtocart
    const [getqty, setgetqty] = useState(1)
    const handleAddtocart = async () => {
        console.log('Add to cart button clicked')
        try {
            await dispatch(AddtoCart({ id, quantity: getqty }))
        } catch (error) {
            console.log(error)
        }
    }

    // handling productdetail images
    const [ProductDetailImg, SetProductDetailImg] = useState('');

    useEffect(() => {
        dispatch(FetchProductDetails(id))
            .catch((error) => console.error('Fetch failed', error));
    }, [dispatch, id]);

    //handling addtocart 
    useEffect(() => {
        if (Errors) {
            toast.error(Errormsg)
        }
        if (iteamadded) {
            toast.info("Product Added to Cart Successfully")
        }
    }, [Errors, Errormsg, iteamadded])

    // Update image URL whenever productdata changes
    useEffect(() => {
        if (productdata?.response?.image) {
            const imgurl = productdata?.response?.image[0]?.url || '';
            SetProductDetailImg(imgurl);
            console.log('Image URL updated:', imgurl);
        }
    }, [productdata]);

    const imgref = useRef('');
    useEffect(() => {
        const scrollimage = () => {
            const scrolldata = imgref.current;
            if (!scrolldata) return; // Check if ref is set

            if (scrolldata.scrollLeft >= (scrolldata.scrollWidth - scrolldata.clientWidth)) {
                scrolldata.scrollLeft = 0; // Reset scroll to start
            }
            scrolldata.scrollBy(100, 0);
        };

        const scrollInterval = setInterval(scrollimage, 2000);
        return () => clearInterval(scrollInterval);
    }, [])
    return (
        <>
            <Navbar />
            {Loading && <center>
                <DNA visible={true}
                    width="400"
                    color="#4fa94d"
                    ariaLabel="infinity-spin-loading" />
            </center>}
            <div className="w-full flex max-md:flex-col max-md:items-center gap-8 p-10 text-ellipsis relative">
                <ToastContainer />
                <div className="w-1/2 max-md:w-full flex gap-12 flex-col gap-4 items-center border-r-4 border-dotted max-md:border-b-4 max-md:border-r-0 max-md:pb-6 max-md:border-pink-600">
                    <div className="w-4/5 border-4 shadow-2xl">
                        <img className="w-full max-md:object-contain mx-auto p-2 object-cover" src={ProductDetailImg} alt="image" />
                    </div>

                    <div ref={imgref} className="w-auto h-40 object-contain border-4 p-4 m-2 flex items-center gap-4 overflow-auto no-scrollbar">
                        {productdata?.response?.image?.map((e, id) => <img key={id} onClick={() => SetProductDetailImg(e.url)} className="w-full h-24 max-sm:h-20 object-cover" src={e.url} alt={id} />)}
                    </div>

                    <QuantityBtn sendqty={(setgetqty)} />

                    <div className="flex flex-wrap justify-center gap-8 mt-10 max-md:mt-4 items-center w-full">
                        <ClickButton title="Add To Cart" animate="true" onclickfun={() => handleAddtocart()} />
                        <ClickButton title="Buy Now" animate="true" />
                    </div>
                </div>
                <div className="w-1/2 max-md:w-full">
                    <div className="overflow-hidden">
                        <h2 className="font-semibold text-2xl max-md:text-xl text-pink-600">{productdata?.response?.name}</h2>
                        <div className="flex gap-6 text-xl font-semibold flex-wrap mt-1 items-center">
                            <div className="flex items-center gap-1 px-2 bg-green-600 text-white rounded-xl">
                                {productdata?.response?.ratings} <FaStar color="#ffff" size={25} />
                            </div>
                            <div>{productdata?.response?.ratings} Rating and {productdata?.response?.review?.length} Reviews</div>
                            <div className="flex items-center gap-2">
                                <span className="text-green-600">Verified By</span><span><img className="w-12 h-12 rounded-full" src={Logo} alt="Logo" /></span>
                            </div>
                        </div>
                        <div className="flex items-center gap-6 flex-wrap mt-2 border-b-4 pb-2 border-pink-600 border-dotted">
                            <p className="text-3xl font-semibold text-pink-600">₹{productdata?.response?.price}</p>
                            <del className="text-xl font-semibold">₹{((productdata?.response?.price * 140) / 100)}</del>
                            <p className="text-xl font-semibold text-green-600" >14% OFF</p>
                        </div>
                        <div className="text-xl font-semibold mt-4">
                            <span className="text-pink-600">Product Id</span><span className="ml-8 text-clip">{productdata?.response?._id}</span>
                        </div>
                        <div className="mt-4 border-b-4 pb-4 border-pink-600 border-dotted">
                            <span className="text-pink-600 text-xl font-semibold">Description</span>
                            <p className="mt-2 text-base">{productdata?.response?.description}</p>
                        </div>
                        <div className="text-xl font-semibold mt-4">
                            <span className="text-pink-600">Categories</span>
                            <ol className="mt-4 flex items-center gap-6 flex-wrap text-green-600">
                                {
                                    productdata?.response?.category?.map((e, id) => <li key={id}>{e}</li>)
                                }
                            </ol>
                        </div>
                        <div className="text-xl font-semibold mt-4 border-b-4 pb-4 border-pink-600 border-dotted">
                            <span className="text-pink-600">Stock</span>
                            <span className="ml-8">
                                {
                                    productdata?.response?.stock > 0 ? <span className="text-green-600">In Stock</span>
                                        : <span className="text-red-600">Out Of Stock</span>
                                }
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            {
                productdata?.response?.review.length > 0 && <div className="border-t-4 pb-4 border-pink-600 border-dotted mt-8">
                    <div>
                        <h2 className="text-3xl font-bold text-pink-600 m-4 p-4 text-center ">Rating and Reviews</h2>
                    </div>
                    <div className="flex items-center justify-around overflow-x-scroll no-scrollbar">
                        {
                            productdata?.response?.review?.map((e, id) =>
                                <div key={id} className="w-1/3 max-sm:w-full max-md:w-1/2 m-3 p-3 border-4 rounded-lg shadow-2xl text-base font-normal overflow-clip">
                                    <div className="w-full flex flex-col items-center justify-center">
                                        <div className="w-full">
                                            <FaUserCircle color="#d81b60" size={60} className="mx-auto" />
                                        </div>
                                        <div className="w-full">
                                            <div className="mt-1">
                                                <span className="text-pink-600 overflow-ellipsis">Review Id</span><span className="ml-8 text-clip">{e._id}</span>
                                            </div>
                                            <div className=" mt-1">
                                                <span className="text-pink-600 overflow-ellipsis">User Id</span><span className="ml-8 text-clip">{e.createdBy}</span>
                                            </div>
                                            <div className="mt-1">
                                                <span className="text-pink-600">User Name</span><span className="ml-8 text-clip">{e.name}</span>
                                            </div>
                                            <ReactStars
                                                count={5}
                                                value={e.rating}
                                                half={true}
                                                size={30}
                                                color2={'#ffd700'}
                                                edit={false}
                                            />
                                            <div className="mt-4">
                                                <span className="text-pink-600  overflow-ellipsis">Comment</span>
                                                <p className="mt-2 text-base">{e.Comment}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </div>
            }
            {/* <div className="border-t-4 border-dotted mt-12 border-pink-600">
                <AddReview />
            </div> */}
            <Footer />
        </>
    )
}
export default ProductDetail



