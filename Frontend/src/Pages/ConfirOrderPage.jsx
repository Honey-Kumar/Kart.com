import React from 'react'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import ConfirmPageComponent from '../Components/ConfirmPageComponent'

const ConfirOrderPage = () => {
    return (
        <>
            <Navbar />
            {/* ConfirmOrder Component for Showing Confirm page */}
            <ConfirmPageComponent />
            <Footer />
        </>
    )
}

export default ConfirOrderPage
