import React, { useEffect } from 'react'
import Navbar from "../Components/Navbar"
import Footer from "../Components/Footer"
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { OrderDetailsThunk } from '../Redux/Slicers/OrderSlicer'
import { toast, ToastContainer } from 'react-toastify'
import OrderDetailComponent from '../Components/OrderDetailComponent'


const OrderDetailsPage = () => {
  const dispatch = useDispatch()
  const { OrderDetail, OrderError, OrderErrmsg } = useSelector(state => state.Order)
  const { id } = useParams()
  console.log(id)

  useEffect(() => {
    dispatch(OrderDetailsThunk(id));

    if (OrderError) {
      toast.error(OrderErrmsg)
    }
    if (OrderDetail) {
      toast.info("Order Details Fetched Successfully")
    }

  }, [OrderErrmsg, OrderError, dispatch])
  return (
    <>
      <ToastContainer />
      <Navbar />
      <OrderDetailComponent />
      <Footer />
    </>
  )
}

export default OrderDetailsPage
