import React, { useEffect, useState } from 'react'
import { FaEdit } from 'react-icons/fa'
import { FaClock } from 'react-icons/fa6'
import { FiExternalLink } from 'react-icons/fi'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import { ChangeOrderStatus } from '../../Redux/Slicers/OrderSlicer'
import { DNA } from 'react-loader-spinner'


const AdminOrderList = ({ OrderList }) => {
    console.log(OrderList)
    const dispatch = useDispatch();
    const { OrderLoading, OrderError, OrderErrmsg } = useSelector(state => state.Order)
    const [edit, setedit] = useState(false)
    const [OId, setOId] = useState('')
    const [changestatus, setchangestatus] = useState('Processing')

    const handlechangestatus = async () => {
        await dispatch(ChangeOrderStatus({ status: changestatus, id: OId }));
        toast.success('Order Status Change Successfully');
        setedit(false)
    }

    useEffect(() => {
        if (OrderError || OrderErrmsg) {
            toast.error(OrderErrmsg)
        }
    }, [OrderErrmsg, OrderError])
    return (
        <div className='w-full flex flex-col gap-4 p-2'>
            <ToastContainer />
            {
                OrderLoading ? <center><DNA
                    visible={true}
                    width="400"
                    color="#4fa94d"
                    ariaLabel="infinity-spin-loading"
                /></center> : <>
                    {
                        !edit ? <>
                            {
                                OrderList.map((order, id) => <div key={id} className='m-2 border-2 rounded-lg hover:shadow-2xl relative'>
                                    <h2 className="text-xl max-sm:text-base max-sm:font-base font-bold mx-2 p-2 text-pink-600">#{order._id}</h2>
                                    <div className="text-xl font-semibold overflow-clip ml-4">
                                        <span className="text-pink-600">Order Status</span><span className="ml-2 text-clip text-blue-600">{order?.orderStatus}</span>
                                    </div>
                                    <div className='w-full flex max-sm:flex-col gap-2 p-4'>
                                        <div className='w-1/2 max-sm:w-full border-2 rounded-lg p-2'>
                                            <p className='text-lg max-sm:text-base max-sm:font-base font-semibold text-blue-600'>Shipped To {order?.User?.firstname + " " + order?.User?.lastname}</p>
                                            <div className='flex flex-col text-lg'>
                                                {
                                                    Object.keys(order?.shippingInfo).map((key) => (
                                                        <span key={key}>
                                                            {order.shippingInfo[key]}
                                                        </span>
                                                    ))
                                                }
                                            </div>
                                        </div>
                                        <div className='w-1/2 max-sm:w-full border-2 rounded-lg p-2'>
                                            <p className='text-lg max-sm:text-base max-sm:font-base font-semibold text-blue-600'>Payment To {order?.User?.firstname + " " + order?.User?.lastname}</p>
                                            <div className='flex flex-col text-lg'>
                                                {
                                                    Object.keys(order?.payment).map((key) => (
                                                        <span key={key}>
                                                            {key} : {order.payment[key]}
                                                        </span>
                                                    ))
                                                }
                                            </div>
                                        </div>
                                    </div>

                                    <div className='w-full flex p-4 gap-2 max-sm:flex-col'>
                                        {
                                            order?.order?.map((i, id) => <div key={id} className='w-1/2 max-sm:w-full p-2 border-2 rounded-lg hover:shadow-2xl'>
                                                <img src={i.image} alt={i.name} className='w-32 h-32' />
                                                <div className='flex flex-col'>
                                                    <span className='text-lg max-sm:text-base max-sm:font-base font-semibold text-blue-600'>{i.name}</span>
                                                    <span className='text-lg max-sm:text-base max-sm:font-base font-semibold text-blue-600'>Product ID : {i.productData}</span>
                                                </div>
                                                <div className="flex flex-wrap items-center justify-between gap-2 pt-4">
                                                    <span className="text-2xl font-bold text-pink-600 dark:text-white">₹{i.price}</span>
                                                    <div className="text-xl font-semibold mt-4 overflow-clip">
                                                        <span className="text-pink-600">Quantity</span><span className="ml-2 text-clip text-blue-600">{i.quantity}</span>
                                                    </div>
                                                </div>
                                            </div>)
                                        }
                                    </div>

                                    <div className='w-full my-6'>
                                        <div className='flex text-pink-600 gap-2 items-center justify-center'>
                                            <FaClock size={30} />
                                            <p className="text-xl font-bold p-4">Cart Summary</p>
                                        </div>
                                        <div className='mt-12 max-sm:mt-4'>
                                            <div className='flex gap-2 items-center justify-between text-xl max-sm:text-base font-semibold px-6 mt-2'>
                                                <span>Total Price</span>
                                                <span>₹{order?.itemPrice}</span>
                                            </div>
                                            <div className='flex gap-2 items-center justify-between text-xl max-sm:text-base font-semibold px-6 mt-2'>
                                                <span>Shipping Charges</span>
                                                <span>₹{order?.shippingCost.toFixed(2)}</span>
                                            </div>
                                            <div className='flex gap-2 items-center justify-between text-xl max-sm:text-base font-semibold px-6 mt-2'>
                                                <span>Tax</span>
                                                <span>₹{order?.tax?.toFixed(2)}</span>
                                            </div>
                                            <div className='flex gap-2 items-center justify-between text-xl max-sm:text-base font-semibold px-6 border-t-2 border-b-2 mx-2 p-2 mt-10'>
                                                <span>Grand Total</span>
                                                <span className='text-pink-600 font-semibold text-2xl max-sm:text-xl'>₹{order?.totalprice}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <Link to={`/order/${order?._id}`} className='absolute top-4 right-6 text-pink-600'><FiExternalLink size={25} /></Link>
                                    <Link onClick={() => {
                                        setedit(prev => !prev)
                                        setOId(order?._id)
                                    }} className='absolute top-12 right-6 text-pink-600'><FaEdit size={25} /></Link>
                                </div>)
                            }
                        </> : <>
                            {
                                OrderLoading ? <center><DNA
                                    visible={true}
                                    width="400"
                                    color="#4fa94d"
                                    ariaLabel="infinity-spin-loading"
                                /></center> : <div className='w-full border-2 shadow-2xl p-4'>
                                    <div className="bg-blue-600 text-white p-4 text-center">
                                        <h2 className="text-2xl font-semibold">Change Order Status</h2>
                                    </div>
                                    <p className="text-2xl font-semibold px-2 my-2 mx-4">Select Status</p>
                                    <select className='w-full p-4 border-2 rounded-lg font-semibold outline-none' name="orderstatus" id="orderstatus" value={changestatus} onChange={e => setchangestatus(e.target.value)} >
                                        <option value="Processing">Processing</option>
                                        <option value="Shipped">Shipped</option>
                                        <option value="Delivered">Delivered</option>
                                    </select>
                                    <button onClick={() => handlechangestatus()} className='px-8 py-2 bg-blue-600 w-full mt-4 rounded-lg hover:bg-blue-900 transition-all text-white'>Change</button>
                                </div>
                            }
                        </>
                    }
                </>
            }
        </div>
    )
}

export default AdminOrderList
