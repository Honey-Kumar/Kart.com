import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast, ToastContainer } from 'react-toastify';
import { FetchProduct } from "../Redux/Slicers/Products"
import ProductCard from './ProductCard';
import { DNA } from 'react-loader-spinner';
import { Link, useLocation } from 'react-router-dom';
import Pagination from './Pagination';
import Slider from '@mui/material/Slider';
import NoFound from './NoFound';

const categories = [
    { name: "Electronics", link: "" },
    { name: "Fashion", link: "" },
    { name: "Grocery", link: "" },
    { name: "Kitchen", link: "" },
    { name: "Jewellery", link: "" },
    { name: "Furniture", link: "" }
]

const brands = [
    { name: "Tata", link: "" },
    { name: "Samsung", link: "" },
    { name: "Apple", link: "" },
    { name: "Vivo", link: "" },
    { name: "Gowardhan", link: "" },
    { name: "Nestle", link: "" }
]

const ProductFilter = () => {
    const [passwidth, setpasswidth] = useState('w-1/5')
    const dispatch = useDispatch();
    const { isLoading, product } = useSelector(state => state.Products);
    const { wishlist } = useSelector(state => state.Wishlist)

    // getting url queries
    const location = useLocation();
    const queryparams = new URLSearchParams(location.search);
    let keyword = queryparams.get('keyword') || '';

    // if (keyword === null || keyword === 'undefined') {
    //     keyword = ''
    // }

    console.log("keyword ", keyword)

    const [page, setpage] = useState(1)
    const [price, setprice] = useState([0, 100000])
    const [ratings, setratings] = useState(0)
    const [searchcategory, setsearchcategory] = useState('')

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 640) {
                setpasswidth('w-full');
            } else if (window.innerWidth < 840) {
                setpasswidth('w-1/2');
            }
            else if (window.innerWidth < 1250) {
                setpasswidth('w-1/3');
            } else {
                setpasswidth('w-1/4');
            }
        };
        handleResize();
        window.addEventListener('resize', handleResize);

        dispatch(FetchProduct({ keyword, page, price, category: searchcategory, ratings })).then(() => {
            console.log('data fetched')
        }).catch((err) => toast(err));

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [dispatch, keyword, price, page, searchcategory, ratings])

    console.log(product, page, keyword, price, searchcategory, ratings);

    const clearfilter = () => {
        try {
            keyword = ""
            setpage(1)
            setprice([0, 100000])
            setsearchcategory('')
            setratings(0)
            toast("Filters cleared successfully")
        } catch (error) {
            toast(err)
        }
    }
    return (
        <>
            <div className='w-full h-full border-4 p-2 flex max-sm:flex-col'>
                <ToastContainer />
                <div className='w-1/4 max-sm:w-full flex flex-col items-center gap-2'>
                    <div className='border-b-4 mb-1 mr-1 border-green-600 border-dotted flex items-center justify-around w-full'>
                        <h2 className="text-3xl font-bold text-pink-600 m-2 p-4 text-center ">Filters</h2>
                        <div className='bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg cursor-pointer' onClick={() => clearfilter()}>Clear Filters</div>
                    </div>
                    <div className='w-3/4 mt-2'>
                        <h2 className="text-xl font-bold text-pink-600">Price</h2>
                        <Slider
                            value={price}
                            onChange={(event) => setprice(event.target.value)}
                            valueLabelDisplay="on"
                            aria-labelledby="range-slider"
                            min={0}
                            max={100000}
                        />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-pink-600">Categories</h2>
                        <div className='flex flex-col'>
                            {
                                categories.map((e, id) => <Link key={id} to={e.link} className='p-1 font-semibold text-lg hover:text-blue-600' onClick={() => setsearchcategory(e.name)}>{e.name}</Link>)
                            }
                        </div>
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-pink-600">Brands</h2>
                        <div className='flex flex-col'>
                            {
                                brands.map((e, id) => <Link key={id} to={e.link} className='p-1 font-semibold text-lg hover:text-blue-600' onClick={() => setsearchcategory(e.name)}>{e.name}</Link>)
                            }
                        </div>
                    </div>
                    <div className='w-3/4 mt-2'>
                        <h2 className="text-xl font-bold text-pink-600">Ratings</h2>
                        <Slider
                            value={ratings}
                            onChange={(event) => setratings(event.target.value)}
                            valueLabelDisplay="on"
                            aria-labelledby="range-slider"
                            min={0}
                            max={5}
                        />
                    </div>

                </div>
                <div className='w-3/4 max-sm:w-full border-l-4 border-pink-600 border-dotted max-sm:border-t-4 max-sm:border-l-0'>
                    <div>
                        <h2 className="text-3xl font-bold text-pink-600 m-4 p-4 text-center ">All Best Deals</h2>
                    </div>
                    {
                        isLoading ? <center>
                            <DNA visible={true}
                                width="400"
                                color="#4fa94d"
                                ariaLabel="infinity-spin-loading" />
                        </center> : <>
                            {
                                product?.response?.length !== 0 ? <>
                                    <div className="w-full flex flex-wrap items-center justify-center overflow-auto ">
                                        {
                                            product?.response?.map((e, id) => <Link className={`${passwidth}`} key={id} to={`/product/${e._id}`}>
                                                <ProductCard headline={e?.name} description={e?.description} image={e?.image.at(0)?.url} ratings={e?.ratings} id={e?._id} fav={wishlist.some(i => i.id === e?._id) ? true : false} price={e.price} />
                                            </Link>)
                                        }
                                    </div>
                                </> : <NoFound message={`No Product Found at Page ${page}`} showbtn={false} />
                            }
                        </>
                    }

                    <div className='w-full'>
                        <Pagination currentpage={page} updatepage={(value) => { setpage(value) }} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProductFilter
