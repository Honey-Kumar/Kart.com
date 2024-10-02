import Background from "../Components/Background"
import ImageCarousel from "../Components/ImageCarousel"
import CategoryList from "../Components/CategoryList"
import Navbar from "../Components/Navbar"
import ProductCard from "../Components/ProductCard"
import Footer from "../Components/Footer"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { FetchProduct } from "../Redux/Slicers/Products"
import { DNA } from "react-loader-spinner"
import { ToastContainer } from "react-toastify"


const Homepage = () => {
    const dispatch = useDispatch();
    const { product, isLoading } = useSelector(state => state.Products)

    useEffect(() => {
        dispatch(FetchProduct())
            .then(() => console.log('Fetch successful'))
            .catch((error) => console.error('Fetch failed', error));
    }, [])
    console.log('Productdata is ', product)
    return (
        <>
            <Navbar />
            <ToastContainer />
            <Background />
            <ImageCarousel />
            {
                isLoading ? <center><DNA
                    visible={true}
                    width="400"
                    color="#4fa94d"
                    ariaLabel="infinity-spin-loading"
                /></center> : <>
                    <CategoryList Title="All Time Best Products" product={product} />
                    <CategoryList Title="Best Of Electronics" product={product} />
                    <CategoryList Title="Best Of Home & Appliances" product={product} />
                </>
            }
            <Footer />
        </>
    )
}
export default Homepage