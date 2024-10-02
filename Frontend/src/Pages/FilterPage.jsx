import React from 'react'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import ProductFilter from '../Components/ProductFilter'
import { useSelector } from 'react-redux'
import { DNA } from 'react-loader-spinner'
import CategoryList from "../Components/CategoryList"


const FilterPage = () => {
    const { isLoading, product } = useSelector(state => state.Products)
    return (
        <>
            <Navbar />
            <ProductFilter />
            <div>
                <h2 className="text-3xl font-bold text-pink-600 m-4 p-4 text-center ">Similar Products</h2>
            </div>
            {
                isLoading ? <center>
                    <DNA visible={true}
                        width="400"
                        color="#4fa94d"
                        ariaLabel="infinity-spin-loading" />
                </center> : <CategoryList Title="Trending Products" product={product} />
            }
            <Footer />
        </>
    )
}

export default FilterPage
