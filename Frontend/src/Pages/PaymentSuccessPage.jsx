import React from 'react'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import CartCheckoutTracker from '../Components/CartCheckoutTracker'
import OrderPlacedPop from '../Components/OrderPlacedPop'

const PaymentSuccessPage = () => {
    return (
        <div className='w-full overflow-hidden'>
            <Navbar />
            <CartCheckoutTracker active={2} />
            <OrderPlacedPop />
            <Footer />
        </div>
    )
}

export default PaymentSuccessPage
