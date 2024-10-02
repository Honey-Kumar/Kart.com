import React, { useEffect, useState } from 'react'
import logo from '../assets/Kart.com-1.png'
import { Link, useNavigate } from "react-router-dom"
import { ToastContainer, toast } from "react-toastify"
import { FaPassport, FaUser } from 'react-icons/fa6'
import { MdEmail } from 'react-icons/md'
import avatarPreview from "../assets/profilepic.png"
import ClickButton from '../Components/ClickButton'
import { useDispatch, useSelector } from 'react-redux'
import { RegisterUser } from '../Redux/Slicers/UserSlicer'
import { DNA } from 'react-loader-spinner'
import { GetMyOrdersThunk } from '../Redux/Slicers/OrderSlicer'


const SignupForm = () => {
    const dispatch = useDispatch();
    const { isLoading, isAuthenticate, isError, Errmsg, User } = useSelector(state => state.User)
    const navigate = useNavigate()

    // form data
    const [firstname, setfirstname] = useState('')
    const [lastname, setlastname] = useState('')
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    const [showimg, setshowimg] = useState(avatarPreview)
    const [mypic, setmypic] = useState('')

    console.log(firstname, lastname, email, password, showimg, mypic)

    //changing showimg when mypic is uploaded
    const handlepicupload = (e) => {
        const reader = new FileReader();

        reader.onload = () => {
            if (reader.readyState === 2) {
                setshowimg(reader.result);
                setmypic(reader.result);
            }
        };

        reader.readAsDataURL(e.target.files[0]);
    }

    //handling form submit
    const submitform = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('firstname', firstname);
            formData.append('lastname', lastname);
            formData.append('email', email);
            formData.append('password', password);
            if (mypic) {
                formData.append('avatar', mypic);
            }

            await dispatch(RegisterUser(formData));
            await dispatch(GetMyOrdersThunk());

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (isError && Errmsg) {
            toast.error(Errmsg);
        }
        if (User && isAuthenticate) {
            toast.info("User Registered Successfully");
            setTimeout(() => {
                navigate('/');
            }, 2000);
        }
    }, [isError, Errmsg, User, isAuthenticate, navigate])

    return (
        <div className='w-full h-full flex max-sm:flex-col items-center p-5'>
            <div className='w-2/4 max-sm:w-full'>
                <img src="https://img.freepik.com/free-vector/happy-people-shopping-online_74855-5865.jpg?size=626&ext=jpg&ga=GA1.2.1489342175.1688726843&semt=ais" alt="login_image" />
            </div>
            <div className='w-2/4 max-sm:w-full max-sm:border-t-4 max-sm:border-dotted max-sm:border-pink-600 max-sm:mt-6 flex flex-col gap-2 justify-center items-center'>
                <ToastContainer />
                <span className='text-3xl text-pink-600 font-bold pb-5 text-center mt-4'>Welcome To Kart.com</span>
                <div className="flex items-center gap-2">
                    <span className="text-green-600 font-semibold">Verified By</span><span><img className="w-12 h-12 rounded-full" src={logo} alt="Logo" /></span>
                </div>

                {
                    isLoading ? <center>
                        <DNA visible={true}
                            width="400"
                            color="#4fa94d"
                            ariaLabel="infinity-spin-loading" />
                    </center> : <form
                        className="w-full flex flex-col gap-2"
                        encType="multipart/form-data"
                        onSubmit={(e) => submitform(e)}
                    >
                        <div className='relative'>
                            <FaUser className="absolute top-3 left-5" size={30} />
                            <input
                                className='p-2 w-full outline-none border rounded-xl text-center'
                                type="text"
                                placeholder="Enter First Name"
                                required
                                name="firstname"
                                value={firstname}
                                onChange={(e) => setfirstname(e.target.value)}
                            />
                        </div>
                        <div className='relative'>
                            <FaUser className="absolute top-3 left-5" size={30} />
                            <input
                                className='p-2 w-full outline-none border rounded-xl text-center'
                                type="text"
                                placeholder="Enter Last Name"
                                required
                                name="lastname"
                                value={lastname}
                                onChange={(e) => setlastname(e.target.value)}
                            />
                        </div>
                        <div className='relative' >
                            <MdEmail className="absolute top-3 left-5" size={30} />
                            <input
                                className='p-2 w-full outline-none border rounded-xl text-center'
                                type="email"
                                placeholder="Enter Email"
                                required
                                name="email"
                                value={email}
                                autoComplete="email"
                                onChange={(e) => setemail(e.target.value)}
                            />
                        </div>
                        <div className='relative'>
                            <FaPassport className="absolute top-3 left-5" size={30} />
                            <input
                                className='p-2 w-full outline-none border rounded-xl text-center'
                                type="password"
                                placeholder="Enter Password"
                                required
                                name="password"
                                autoComplete="current-password"
                                value={password}
                                onChange={(e) => setpassword(e.target.value)}
                            />
                        </div>

                        <div >
                            <img className='w-24 h-24 mb-2' src={showimg} alt="Avatar Preview" />
                            <input
                                className='p-2 w-full outline-none border rounded-xl'
                                type="file"
                                name="avatar"
                                accept="image/*"
                                onChange={(e) => handlepicupload(e)}
                            />
                        </div>
                        <input type="submit" value="Register" className="bg-pink-600 p-2 rounded-xl border outline-none text-white cursor-pointer" />
                    </form>

                }
                <div className='flex items-center gap-6 pt-3'>
                    <span className='text-xl max-sm:text-sm text-pink-600 font-bold'>Existing to Kart.com</span>
                    <Link to={'/login'}><ClickButton title="Log In" animate="true" /></Link>
                </div>
            </div>
        </div>
    )
}

export default SignupForm
