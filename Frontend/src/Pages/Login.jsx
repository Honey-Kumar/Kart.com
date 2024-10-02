import Footer from "../Components/Footer"
import Navbar from "../Components/Navbar"
import { DNA } from 'react-loader-spinner'
import logo from '../assets/Kart.com-1.png'
import { Link, useNavigate } from "react-router-dom"
import { ToastContainer, toast } from "react-toastify"
import ClickButton from "../Components/ClickButton"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from 'react-redux';
import { LoginUser } from "../Redux/Slicers/UserSlicer"
import { GetMyOrdersThunk } from "../Redux/Slicers/OrderSlicer"


const Loginpage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isLoading, isAuthenticate, isError, Errmsg, User } = useSelector(state => state.User)
    const [Emaildata, setEmaildata] = useState('')
    const [Passworddata, setPassworddata] = useState('')

    let handleSubmit = async (e) => {
        e.preventDefault();
        await dispatch(LoginUser({ email: Emaildata, password: Passworddata }));
        await dispatch(GetMyOrdersThunk());

    }

    useEffect(() => {
        if (isError && Errmsg) {
            toast.error(Errmsg);
        }
        if (User && isAuthenticate) {
            toast.info("User Logged In Successfully");
            setTimeout(() => {
                navigate('/account');
            }, 2000);
        }
    }, [isError, Errmsg, User, isAuthenticate, navigate]);
    return (
        <>
            <Navbar />
            <div className='w-full h-full flex max-sm:flex-col items-center p-5'>
                <ToastContainer />
                <div className='w-2/4 max-sm:w-full'>
                    <img src="https://img.freepik.com/free-vector/add-cart-concept-illustration_114360-1445.jpg?size=626&ext=jpg&uid=R100611644&ga=GA1.2.818596434.1688190770&semt=ais" alt="login_image" />
                </div>
                <div className='w-2/4 max-sm:w-full max-sm:border-t-4 max-sm:border-dotted max-sm:border-pink-600 max-sm:mt-6 flex flex-col justify-center items-center'>
                    {
                        isLoading ? <center>
                            <DNA visible={true}
                                width="400"
                                color="#4fa94d"
                                ariaLabel="infinity-spin-loading" />
                        </center> : <>
                            <span className='text-3xl text-pink-600 font-bold pb-5 text-center max-sm:mt-6'>Welcome To Kart.com</span>
                            <div className="flex items-center gap-2">
                                <span className="text-green-600 font-semibold">Verified By</span><span><img className="w-12 h-12 rounded-full" src={logo} alt="Logo" /></span>
                            </div>

                            <form method='POST' className='flex flex-col gap-3 justify-center text-center p-8 w-full relative' onSubmit={handleSubmit}>
                                <input className='relative p-2 text-center rounded-xl border outline-none' type="email" placeholder='Enter Email' value={Emaildata} onChange={(e) => setEmaildata(e.target.value)} autoComplete="email"
                                />
                                <span className='absolute top-10 left-10'></span>
                                <input className='relative p-2 text-center rounded-xl border outline-none' type="password" placeholder='Enter Password' value={Passworddata} autoComplete="current-password" onChange={(e) => setPassworddata(e.target.value)}
                                />
                                <span className='absolute left-10'></span>
                                <input className='bg-pink-600 p-2 rounded-xl border outline-none text-white cursor-pointer' type="submit" value="Submit" />
                            </form>

                            <Link to='/reset' className='text-blue-600 font-semibold'>Forgot password</Link>
                            <div className='flex items-center gap-6 pt-3'>
                                <span className='text-xl max-sm:text-sm text-pink-600 font-bold'>New To Kart.com </span>
                                <Link to={'/register'}><ClickButton title="Sign Up" animate="true" /></Link>
                            </div>
                        </>
                    }
                </div>
            </div>
            <Footer />
        </>
    )
}
export default Loginpage