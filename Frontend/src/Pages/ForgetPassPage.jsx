import React from 'react'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import ForgetPassword from '../Components/ForgetPassword'

const ForgetPasswordPage = () => {
    return (
        <>
            <Navbar />
            <div className='w-full h-screen p-10'>
                <ForgetPassword />
            </div>
            <Footer />
        </>
    )
}

export default ForgetPasswordPage
