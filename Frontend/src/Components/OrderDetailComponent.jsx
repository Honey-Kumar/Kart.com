import React, { useState } from 'react'
import { FaClock } from 'react-icons/fa6'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import PaymentReceipt from './PaymentReceipt'
import ReviewForm from './ReviewForm'
import { toast } from 'react-toastify'

const OrderDetailComponent = () => {
    const { OrderDetail } = useSelector(state => state.Order)
    const { User } = useSelector(state => state.User)
    const [seeReceipt, setseeReceipt] = useState('invisible');
    const [productId, setproductId] = useState('')
    const [selectedpid, setselectedpid] = useState('')

    console.log('order detail id is ', productId)
    return (
        <>
            <div className='w-full flex max-md:flex-col item-center shadow-2xl box-border'>
                <div className='w-full w-3/4 max-md:w-full border-r-2 px-2 text-wrap'>
                    <h2 className="text-3xl max-sm:text-base max-sm:font-base font-bold m-4 p-4 text-center border-b-4 border-blue-600 border-dashed text-pink-600">#{OrderDetail._id} Details</h2>
                    <div className='my-10'>
                        <Link to={'/'} className="flex font-bold items-center justify-center">
                            <span className="text-pink-600 text-4xl hover:scale-2.5">
                                Kart <span className="text-blue-600 text-4xl">.com</span>
                            </span>
                        </Link>
                        <p className='font-semibold text-center text-blue-600 mt-4'>A Platform For All Your Needs</p>
                    </div>

                    <div>
                        <p className="text-3xl max-sm:text-xl max-sm:font-base font-bold m-4 p-4 text-pink-600">Products</p>
                        <div className='w-full flex gap-4 iteam-center flex-wrap p-4 max-sm:p-0 text-pretty'>
                            {
                                OrderDetail?.order?.map((i, id) => <div key={id} className={`${i?.productData === productId && selectedpid} w-full p-2 border-2 shadow-2xl rounded-2xl`} onClick={() => {
                                    setselectedpid('bg-slate-200')
                                    setproductId(i.productData)
                                }}>
                                    <div className='w-36 max-sm:w-full mx-auto'>
                                        <img src={i?.image} alt={i?.name} className="w-full h-48 object-contain rounded-md mb-4" />
                                    </div>
                                    <div className='w-full'>
                                        <h2 className="text-lg text-pink-600 font-semibold">{i?.name}</h2>
                                        <table className="text-lg max-sm:text-base font-semibold w-full text-wrap">
                                            <tbody>
                                                <tr>
                                                    <th className='pr-4 text-start text-pink-600 text-wrap'>Product Id</th>
                                                    <td className="mx-8">{i?.productData}</td>
                                                </tr>
                                                <tr>
                                                    <th className='pr-4 text-start text-pink-600'>Price</th>
                                                    <td className="mx-8">{i?.price}</td>
                                                </tr>
                                                <tr>
                                                    <th className='pr-4 text-start text-pink-600'>Quantity</th>
                                                    <td className="mx-8">{i?.quantity}</td>
                                                </tr>
                                                <tr>
                                                    <th className='pr-4 text-start text-pink-600'>Order Status</th>
                                                    <td className="mx-8">{OrderDetail.orderStatus}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>)
                            }
                        </div>
                    </div>

                    {
                        User?.User?.role !== 'admin' && <div className='mt-6'>
                            <p className='text-xl font-bold text-blue-600 m-2 p-4 text-center cursor-pointer' onClick={() => setseeReceipt(seeReceipt === 'visible' ? 'invisible' : 'visible')}>Click For Payment Receipt Vision</p>
                            <PaymentReceipt showreceipt={seeReceipt} />
                        </div>
                    }

                    {
                        User?.User?.role !== 'admin' &&
                        <div className='mt-10'>
                            <h2 className="text-3xl max-sm:text-xl max-sm:font-base font-bold m-4 p-4 text-center border-b-4 border-blue-600 border-dashed text-pink-600">Add Review</h2>

                            <ReviewForm id={productId} />
                        </div>
                    }
                </div>
                <div className='flex flex-col flex-wrap iteam-center w-1/4 max-md:w-full bg-blue-600 text-white max-md:p-4'>
                    <div className='flex flex-wrap iteam-center justify-between w-full overflow-clip'>
                        <div className='p-2 w-full'>
                            <span className="text-xl max-sm:font-base font-bold text-pink-600">Shipped To</span>
                            <div className='text-base max-sm:text-base font-semibold'>
                                <p>{OrderDetail?.shippingInfo?.email}</p>
                                <p>{OrderDetail?.shippingInfo?.phone}</p>
                                <p>{OrderDetail?.shippingInfo?.address}</p>
                                <p>{OrderDetail?.shippingInfo?.city}</p>
                                <p>{OrderDetail?.shippingInfo?.state}</p>
                                <p>{OrderDetail?.shippingInfo?.country}</p>
                                <p>{OrderDetail?.shippingInfo?.pincode}</p>
                            </div>
                        </div>
                        <div className='mt-4 p-2'>
                            <span className="text-xl max-sm:font-base font-bold text-pink-600">Payment Data</span>
                            <table className="text-base max-sm:font-base font-semibold px-2 text-pretty	">
                                <tbody>
                                    <tr>
                                        <th className='pr-4 text-start text-pink-600'>Id</th>
                                        <td className="mx-8 max-sm:mx-0 text-pretty	">{OrderDetail?.payment?.id}</td>
                                    </tr>
                                    <tr>
                                        <th className='pr-4 text-start text-pink-600'>Status</th>
                                        <td className="mx-8 max-sm:mx-0 text-pretty	">{OrderDetail?.payment?.status}</td>
                                    </tr>
                                    <tr>
                                        <th className='pr-4 text-start text-pink-600'>Method</th>
                                        <td className="mx-8 max-sm:mx-0 text-pretty">{OrderDetail?.payment?.method}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className='w-full mt-4'>
                        <div className='flex text-pink-600 items-center px-2'>
                            <FaClock size={30} />
                            <p className="text-xl font-bold p-4">Cart Summary</p>
                        </div>
                        <div className='mt-4'>
                            <div className='flex gap-2 items-center justify-between text-xl font-semibold px-2 mt-2'>
                                <span>Total Price</span>
                                <span>₹{OrderDetail?.itemPrice}</span>
                            </div>
                            <div className='flex gap-2 items-center justify-between text-xl font-semibold px-2 mt-2'>
                                <span>Shipping Charges</span>
                                <span>₹{OrderDetail?.shippingCost?.toFixed(2)}</span>
                            </div>
                            <div className='flex gap-2 items-center justify-between text-xl font-semibold px-2 mt-2'>
                                <span>Tax</span>
                                <span>₹{OrderDetail?.tax?.toFixed(2)}</span>
                            </div>
                            <div className='flex gap-2 items-center justify-between text-xl font-semibold px-2 border-t-2 border-b-2 mx-2 p-2 mt-10'>
                                <span>Grand Total</span>
                                <span className='text-pink-600 font-semibold text-xl'>₹{OrderDetail?.totalprice}</span>
                            </div>
                        </div>
                    </div>

                    <div>
                        <div className='flex gap-2 items-center justify-between text-base font-semibold px-2 mx-2 p-2 mt-10'>
                            <span>Order Status</span>
                            <span className='text-pink-600 font-semibold text-xl'>{OrderDetail?.orderStatus}</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default OrderDetailComponent
