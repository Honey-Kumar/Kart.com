import React from 'react'
import { FaShippingFast } from "react-icons/fa";
import { GiConfirmed } from "react-icons/gi";
import { MdOutlinePayment } from "react-icons/md";


const CartCheckoutTracker = ({ active }) => {
    console.log(active)
    const Tracker = [
        {
            icon: <FaShippingFast size={window.innerWidth < 600 ? 25 : 35} />, name: "Shipping"
        },
        {
            icon: <GiConfirmed size={window.innerWidth < 600 ? 25 : 35} />, name: "Confirm Order"
        },
        {
            icon: <MdOutlinePayment size={window.innerWidth < 600 ? 25 : 35} />, name: "Payment"
        }
    ]
    return (
        <>
            <div className='flex iteam-center justify-between mx-12 max-sm:mx-0 p-6 relative overflow-clip'>
                {
                    Tracker.map((i, key) => <div key={key} className={`${active.toString() === key.toString() ? 'text-pink-600' : 'text-slate-600'} z-10 text-center`}>
                        <span className='z-50'>{i.icon}</span>
                        <span className={`font-semibold text-lg max-sm:text-base mt-4`}>{i.name}</span>
                    </div>)
                }
                <div className='absolute top-12 left-0 right-0 border-b-4 border-blue-600 border-dotted w-full z-0'>
                </div>
            </div >
        </>
    )
}

export default CartCheckoutTracker
