import React, { useEffect } from 'react'
import { DNA } from 'react-loader-spinner'
import { useDispatch, useSelector } from 'react-redux'
import { AdminAllOrder } from '../../Redux/Slicers/AdminSlicer'
import { toast, ToastContainer } from 'react-toastify'
import AdminOrderList from './AdminOrderList'

const Orderboard = () => {
  const dispatch = useDispatch()
  const { OrderList, loading, Error, Errormsg } = useSelector(state => state.Admin)

  useEffect(() => {
    dispatch(AdminAllOrder());

    if (Error) {
      toast.error(Errormsg)
    }
    if (OrderList) {
      toast.success('All Orders Fetched Successfully')
    }
  }, [dispatch, Error, Errormsg])
  return (
    <div className='w-full'>
      <ToastContainer />
      <div className="bg-blue-600 text-white py-4 px-6 mb-8">
        <h2 className="text-2xl font-semibold text-center">Order Dashboard</h2>
      </div>
      <div>
        {
          loading ? <center><DNA
            visible={true}
            width="400"
            color="#4fa94d"
            ariaLabel="infinity-spin-loading"
          /></center> : <AdminOrderList OrderList={OrderList} />
        }
      </div>
    </div>
  )
}

export default Orderboard
