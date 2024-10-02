import React from 'react'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import CartCheckoutTracker from '../Components/CartCheckoutTracker'
import ShippingComponent from '../Components/ShippingComponent'

const ShippingPage = () => {
    return (
        <>
            <Navbar />
            <ShippingComponent />
            <Footer />
        </>
    )
}

export default ShippingPage
