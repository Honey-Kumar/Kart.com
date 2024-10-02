import React, { useState } from 'react'
import { BiError } from "react-icons/bi";
import { ImCross } from "react-icons/im";


const ConfirmDialog = ({ dialog, confirm, cancel, closedialog }) => {
    return (
        <div className={`${dialog} shadow-2xl rounded-lg bg-green-600 p-4 text-white w-1/3 max-auto fixed top-1/2 inset-x-1/3 z-50`}>
            <h2 className="text-xl font-bold text-center ">Confirm Action</h2>
            <div className='mt-2 flex items-center gap-6 justify-center'>
                <BiError size={30} />
                <p className="text-xl font-bold text-center">Are you sure you want to proceed?</p>
            </div>
            <div className='flex justify-between mt-6'>
                <button className='px-6 py-2 bg-blue-600 shadow-xl rounded-lg' onClick={() => {
                    confirm(true)
                    closedialog('invisible')
                }}>Confirm</button>
                <button className='px-6 py-2 bg-blue-600 shadow-xl rounded-lg' onClick={() => {
                    cancel(true)
                    closedialog('invisible')
                }}>Cancel</button>
            </div>
            <div className='absolute top-4 right-4' onClick={() => dialog === 'visible' ? closedialog('invisible') : closedialog('visible')}>
                <ImCross size={25} />
            </div>
        </div>
    )
}

export default ConfirmDialog
