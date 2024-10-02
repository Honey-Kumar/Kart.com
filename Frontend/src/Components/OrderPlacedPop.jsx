import React, { useState } from 'react'
import ClickButton from './ClickButton';
import { useNavigate } from 'react-router-dom';
import { FaCircleCheck } from 'react-icons/fa6';
import PaymentReceipt from './PaymentReceipt';

const OrderPlacedPop = () => {
    const navigate = useNavigate()
    const [showReceipt, setshowReceipt] = useState('invisible')
    return (
        <div className='w-full flex flex-col iteam-center justify-center gap-4 m-4 p-10 box-border overflow-clip'>
            <div className='mx-auto animate-bounce transition-all'>
                <FaCircleCheck size={100} className='text-pink-600' />
            </div>
            <div>
                <p className="text-3xl font-bold text-pink-600 m-4 p-4 text-center">Your Order is Placed Successfully</p>
            </div>
            <ClickButton title={'View Orders'} animate={true} onclickfun={() => navigate('/')} />
            <p className='text-xl font-bold text-blue-600 m-2 p-4 text-center cursor-pointer' onClick={() => setshowReceipt(showReceipt === 'visible' ? 'invisible' : 'visible')}>Click For Payment Receipt Vision</p>
            <PaymentReceipt showreceipt={showReceipt} />
        </div>
    )
}

export default OrderPlacedPop
