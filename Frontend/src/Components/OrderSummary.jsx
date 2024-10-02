import React from 'react'
import { FaClock } from 'react-icons/fa6'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const OrderSummary = ({ showpromo = true, checkoutLink, btntitle = 'Checkout', payfun = () => { } }) => {
    console.log(checkoutLink)
    const { CartIteams } = useSelector(state => state.Cart)
    const dispatch = useDispatch()

    // calculating totals
    let total = 0
    const getTotal = () => {
        CartIteams.map(i => {
            console.log('price', i.iteam.response.price)
            console.log('quantitity', i.quantity)
            let eachtotal = i.iteam.response.price * i.quantity
            console.log('eachtotal', eachtotal)
            total += eachtotal
            console.log(total)
        })
    }
    getTotal()

    let shippingcost = (total * 1) / 100
    let taxcost = (total * 18) / 100
    let grandtotal = Math.round(total + shippingcost + taxcost)
    return (
        <>
            <div>
                <div>
                    <h2 className="text-3xl font-bold m-4 p-4 text-center border-b-4 border-blue-600 border-dashed">Products Total</h2>
                </div>
                <div>
                    <div className='flex gap-2 items-center justify-center'>
                        <FaClock size={30} />
                        <p className="text-2xl font-bold p-4">Cart Summary</p>
                    </div>
                    <div className='mt-12'>
                        <div className='flex gap-2 items-center justify-between text-2xl font-semibold pl-12 pr-12 mt-2'>
                            <span>Total Price</span>
                            <span>₹{total}</span>
                        </div>
                        <div className='flex gap-2 items-center justify-between text-2xl font-semibold pl-12 pr-12 mt-2'>
                            <span>Shipping Charges</span>
                            <span>₹{shippingcost}</span>
                        </div>
                        <div className='flex gap-2 items-center justify-between text-2xl font-semibold pl-12 pr-12 mt-2'>
                            <span>Tax</span>
                            <span>18% of ₹{total}</span>
                        </div>
                        <div className='flex gap-2 items-center justify-end text-2xl font-semibold pl-12 pr-12 mt-2'>
                            <span>= ₹{taxcost}</span>
                        </div>
                        <div className='flex gap-2 items-center justify-between text-2xl font-semibold pl-12 pr-12 border-t-2 border-b-2 mx-2 p-2 mt-10'>
                            <span>Grand Total</span>
                            <span className='text-pink-600 font-semibold text-3xl'>₹{grandtotal}</span>
                        </div>
                    </div>
                    <div className='border-t-4 border-blue-600 border-dashed mt-12'>
                        {
                            showpromo && <>
                                <div className='flex gap-2 items-center text-2xl font-semibold pl-12 pr-12 mx-2 mt-10'>
                                    <span>Apply Promo Code</span>
                                </div>
                                <div className='flex gap-2 items-center text-xl font-base pl-12 pr-12 mx-2 mt-4'>
                                    <p>Grab Maximium Discount You can??</p>
                                </div>
                                <div className='flex iteam-center justify-between mx-12 mt-6'>
                                    <input type="text" placeholder='Example = XYZ100' className='w-4/5 rounded-lg text-center outline-none text-black' />
                                    <Link to="#" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 max-sm:px-3 max-sm:py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Apply</Link>
                                </div>
                            </>
                        }
                        <div className='flex flex-col gap-2 items-center text-xl font-base pl-12 pr-12 mx-2 mt-10 border-b-4 border-pink-600 pb-10'>
                            {
                                checkoutLink ? <Link to={checkoutLink}><button className='w-full bg-blue-700 px-12 py-2 rounded-lg dark:focus:ring-blue-800' onClick={() => payfun(grandtotal)}>{btntitle}</button></Link> : <button className='w-full bg-blue-700 px-12 py-2 rounded-lg dark:focus:ring-blue-800' onClick={() => payfun(grandtotal)}>{btntitle}</button>
                            }
                            <p>By Continuing to Checkout You will agree to Our Terms & Conditions</p>
                        </div>
                        <div className="flex items-center justify-center gap-4 my-6 mx-10">
                            <Link to={'/'} className="flex title-font font-medium items-center md:justify-start justify-center text-gray-900">
                                <span className="text-pink-600 text-4xl hover:scale-2.5">
                                    Kart <span className="text-white text-4xl">.com</span>
                                </span>
                            </Link>
                            <p className="text-base text-pink-600 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-200 sm:py-2 sm:mt-0 mt-4">
                                © 2020 Kart.com — @Kart.com
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default OrderSummary
