import React from 'react'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import NoFound from '../Components/NoFound'

const PageNotFound = () => {
    return (
        <>
            <Navbar />
            <NoFound message={'Page No Found'} />
            <Footer />
        </>
    )
}

export default PageNotFound
