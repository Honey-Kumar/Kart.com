import React, { useEffect, useState } from 'react'
import { ImCross } from 'react-icons/im';
import { MdEmail } from 'react-icons/md';
import { DNA } from 'react-loader-spinner'
import { useDispatch, useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify'
import { ForgetPassThunk } from '../Redux/Slicers/UserSlicer';

const ForgetPassword = ({ setshowforget }) => {
    const dispatch = useDispatch();
    const { isLoading, User, isError, Errmsg, message, isforget } = useSelector(state => state.User)
    const [email, setemail] = useState('')

    const handleform = async (e) => {
        const myform = new FormData();
        myform.append('email', email);
        e.preventDefault()
        try {
            await dispatch(ForgetPassThunk(myform))
        } catch (error) {
            console.log(error)
        }
        setemail('')
    }

    useEffect(() => {
        if (isError) {
            toast.error(Errmsg)
        }
        if (isforget) {
            toast.info(message?.message)
        }
    }, [isError, Errmsg, message, isforget])

    return (
        <div>
            <div className='border-4 rounded-lg shadow-2xl p-6 flex flex-col flex-wrap justify-between mt-6 relative overflow-clip'>
                <ToastContainer />
                {
                    isLoading ? <center>
                        <DNA visible={true}
                            width="400"
                            color="#4fa94d"
                            ariaLabel="infinity-spin-loading" />
                    </center> : <>
                        <h2 className="text-3xl font-bold text-pink-600 p-4 text-center">Forget Password</h2>
                        <p className="text-xl font-semibold text-pink-600 p-4 text-center">An Email will send to you for Reset Your Password</p>
                        <form method='PUT' className='flex flex-col gap-3 justify-center text-center p-8 w-full relative' onSubmit={(e) => handleform(e)}>
                            <input className='relative p-2 text-center rounded-xl border outline-none' name='email' type="email" placeholder='Enter Email Address' value={email} onChange={(e) => setemail(e.target.value)} autoComplete="email"
                            />
                            <span className='absolute top-10 left-10'><MdEmail size={30} /></span>
                            <input className='bg-pink-600 p-2 rounded-xl border outline-none text-white cursor-pointer' type="submit" value="Reset" />
                        </form>
                    </>
                }
                <div className='absolute top-4 right-4' onClick={() => setshowforget(false)}>
                    <ImCross size={30} />
                </div>
            </div>
        </div>
    )
}

export default ForgetPassword
