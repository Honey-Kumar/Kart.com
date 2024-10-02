import React, { useEffect, useState } from 'react'
import Navbar from "../Components/Navbar"
import Footer from "../Components/Footer"
import { useDispatch, useSelector } from 'react-redux'
import { DNA } from 'react-loader-spinner';
import logo from '../assets/Kart.com-1.png'
import { FaEye, FaEyeSlash } from 'react-icons/fa6';
import { Link, useNavigate, useParams } from 'react-router-dom';
import ClickButton from '../Components/ClickButton';
import { ResetPasswordThunk } from '../Redux/Slicers/UserSlicer';
import { toast, ToastContainer } from 'react-toastify';



const ResetPasswordPage = () => {
    const { token } = useParams();
    console.log(token)
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const { User, isUpdated, isLoading, isError, Errmsg, isLogout, isDeleted, message, isforget, isResetPass } = useSelector(state => state.User)

    const [password, setpassword] = useState('')
    const [confirmpassword, setconfirmpassword] = useState('')

    //handle show and hide password
    const [showprev, setshowprev] = useState(false)
    const [shownew, setshownew] = useState(false)

    const handlereset = async (e) => {
        e.preventDefault()
        try {
            const myform = new FormData();
            myform.append("password", password)
            myform.append("confirmPassword", confirmpassword)

            await dispatch(ResetPasswordThunk({ data: myform, token }));
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (isError || Errmsg) {
            toast.error(Errmsg)
        }
        if (isResetPass) {
            toast.info(message?.message)
            setTimeout(() => {
                navigate('/account')
            }, 2000);
        }

    }, [isError, Errmsg, isResetPass, message])

    return (
        <>
            <Navbar />
            <div className='w-full h-full flex max-sm:flex-col items-center p-5'>
                <ToastContainer />
                <div className='w-2/4 max-sm:w-full max-sm:border-t-4 max-sm:border-dotted max-sm:border-pink-600 max-sm:mt-6 flex flex-col justify-center items-center'>
                    {
                        isLoading ? <center>
                            <DNA visible={true}
                                width="400"
                                color="#4fa94d"
                                ariaLabel="infinity-spin-loading" />
                        </center> : <>
                            <span className='text-3xl text-pink-600 font-bold pb-5 text-center max-sm:mt-6'>Reset Password</span>
                            <div className="flex items-center gap-2">
                                <span className="text-green-600 font-semibold">Verified By</span><span><img className="w-12 h-12 rounded-full" src={logo} alt="Logo" /></span>
                            </div>

                            <form method='PUT' className='flex flex-col gap-3 justify-center text-center p-8 w-full relative' onSubmit={(e) => handlereset(e)}>
                                <input className='relative p-2 text-center rounded-xl border outline-none' name='password' type={`${showprev ? 'text' : "password"}`} placeholder='Enter New Password' value={password} onChange={(e) => setpassword(e.target.value)} autoComplete="password"
                                />
                                <span onClick={() => showprev ? setshowprev(false) : setshowprev(true)} className='absolute top-10 left-10'>{showprev ? <FaEye size={25} /> : <FaEyeSlash size={25} />}</span>
                                <input className='relative p-2 text-center rounded-xl border outline-none' name='confirmpassword' type={`${shownew ? 'text' : 'password'}`} placeholder='Enter Confirm Password' value={confirmpassword} autoComplete="confirmpassword" onChange={(e) => setconfirmpassword(e.target.value)}
                                />
                                <span onClick={() => shownew ? setshownew(false) : setshownew(true)} className='absolute left-10'>{shownew ? <FaEye size={25} /> : <FaEyeSlash size={25} />}</span>
                                <input className='bg-pink-600 p-2 rounded-xl border outline-none text-white cursor-pointer' type="submit" value="Change" />
                            </form>

                        </>
                    }
                </div>

                <div className='w-2/4 max-sm:w-full'>
                    <img src="https://img.freepik.com/free-vector/ecommerce-web-page-concept-illustration_114360-8204.jpg?t=st=1727102942~exp=1727106542~hmac=b59b22b3486522c3aa9f53668d2ccf7ffd51fe912aa8dbb6d827d2b015377bba&w=996" alt="login_image" />
                </div>
            </div>
            <Footer />
        </>
    )
}

export default ResetPasswordPage
