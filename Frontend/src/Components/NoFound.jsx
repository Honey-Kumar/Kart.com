import React from 'react'
import { MdRemoveShoppingCart } from "react-icons/md";
import ClickButton from './ClickButton';
import { useNavigate } from 'react-router-dom';


const NoFound = ({ message, showbtn = true }) => {
    const navigate = useNavigate()
    return (
        <div className='w-full h-screen flex flex-col iteam-center justify-center gap-4 m-4 p-10'>
            <div className='mx-auto'>
                <MdRemoveShoppingCart size={100} className='text-pink-600' />
            </div>
            <div>
                <p className="text-3xl font-bold text-pink-600 m-4 p-4 text-center">{message}</p>
            </div>
            {
                showbtn && <ClickButton title={'View Products'} animate={true} onclickfun={() => navigate('/')} />
            }
        </div>
    )
}

export default NoFound
