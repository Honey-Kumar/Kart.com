import React, { useEffect, useState } from 'react'
import pic from "../assets/profilepic.png"
import { useDispatch, useSelector } from 'react-redux'
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { Link, useNavigate } from 'react-router-dom';
import { HashLink } from "react-router-hash-link"
import { MdEdit } from "react-icons/md";
import { FaClock, FaLocationDot, FaS } from "react-icons/fa6";
import ClickButton from './ClickButton';
import UpdateUser from './UpdateUser';
import ChangeCurrentPassword from './ChangeCurrentPassword';
import { DeleteUser, LogoutUser } from '../Redux/Slicers/UserSlicer';
import { DNA } from 'react-loader-spinner';
import { toast, ToastContainer } from 'react-toastify';
import ConfirmDialog from './ConfirmDialog';
import ForgetPassword from './ForgetPassword';
import { Country, State, City } from 'country-state-city';
import NoFound from './NoFound';
import AddressList from './AddressList';
import { WishlistAction } from '../Redux/Slicers/WishlistSlicer';
import { CartActions } from '../Redux/Slicers/CartSlicer';
import { GetMyOrdersThunk, OrderActions } from '../Redux/Slicers/OrderSlicer';



const AccountComponent = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [toupdate, settoupdate] = useState(false)

    // handling confirmdialog
    const [showpop, setshowpop] = useState('invisible')
    const [isconfirm, setisconfirm] = useState(false)
    const [iscancel, setiscancel] = useState(false)
    const [newload, setnewload] = useState(false)


    //handle forget password
    const [showforget, setshowforget] = useState(false)


    //handle editing
    const enableediting = () => {
        toupdate ? settoupdate(false) : settoupdate(true)
    }

    const { User, isUpdated, isLoading, isError, Errmsg, isLogout, isDeleted, message, isforget } = useSelector(state => state.User)
    const { product } = useSelector(state => state.Products)
    const { shippingDetails } = useSelector(state => state.Cart)
    const { OrderList, OrderErrmsg, OrderError } = useSelector(state => state.Order)

    const Userdataget = User?.response || User?.User;

    // handling creation date
    const joining = Userdataget?.createdAt
    const joiningdate = joining ? new Date(joining).toISOString().substr(0, 10) : 'N/A';

    //handling change current password
    const [showcurrpass, setshowcurrpass] = useState(false)
    const [accountmenu, setaccountmenu] = useState([
        { name: "Basic Details", link: "#details", action: () => { } },
        { name: "New Orders", link: "#Orders", action: () => { } },
        { name: "Order History", link: "", action: () => { } },
        { name: "Wishlist", link: "/wishlist", action: () => { } },
        { name: "Transaction", link: "", action: () => { } },
        { name: "Setting", link: "", action: () => { } },
        {
            name: "Logout", link: "", action: async () => {
                try {
                    await dispatch(LogoutUser()).then(async () => {
                        console.log("User logout")
                        await dispatch(WishlistAction.clearWishList());
                        await dispatch(CartActions.clearCart());
                        await dispatch(OrderActions.clearOrders());
                        setTimeout(() => {
                            navigate('/login')
                        }, 2000);
                    })
                } catch (error) {

                }
            }
        },
        { name: "Change Current Password", link: "#currpass", action: () => { setshowcurrpass(prev => !prev) } },
        {
            name: "Forget Password", link: "#forgetpass", action: () => {
                setshowforget(prev => !prev)
            }
        },
        {
            name: "Delete Account", link: "", action: async () => {
                console.log("Delete Account is called....")
                // set showpop true to show confirmation dialogbox
                setshowpop('visible')
                setiscancel(false)
                setisconfirm(false)
            }
        },
    ])

    useEffect(() => {
        if (isforget || message) {
            toast.info(message)
        }
        if (isLogout) {
            toast.info("User Logout Successfully")
        }
        if (isDeleted) {
            toast.info("User Account Deleted Successfully")
        }
        if (isError) {
            toast.error(Errmsg)
        }
        if (Userdataget?.role === 'admin') {
            const updatedMenu = accountmenu.filter((item, index) => index < 1 || index > 3);
            const newupdatedmenu = [{ name: "Dashboard", link: "/admin", action: () => { } }, ...updatedMenu]
            setaccountmenu(newupdatedmenu);
        }

        if (OrderError) {
            toast.error(OrderErrmsg)
        }

        const getmyorder = async () => {
            await dispatch(GetMyOrdersThunk());
        }
        getmyorder()

    }, [isDeleted, isError, Errmsg, isLogout, Userdataget, isforget, message, dispatch])


    useEffect(() => {
        if (iscancel) {
            setshowpop('invisible');
        }
        if (isconfirm) {
            setnewload(true);
            dispatch(DeleteUser(Userdataget?._id)).then(() => {
                setnewload(false);
                setshowpop('invisible');
                toast.info("User Account Deleted Successfully")
            }).catch((error) => {
                setnewload(false);
                console.error(error);
                toast.error(error);
            });
        }
    }, [iscancel, isconfirm, dispatch, Userdataget]);

    //calculate total reviews
    let myreviews = 0
    product?.response?.map(e =>
        e?.review?.map(i => {
            if (i?.createdBy === User?.User?._id) myreviews += 1
        })
    )
    return (
        <div className='w-full flex max-md:flex-col truncate'>
            {
                showpop === 'visible' && <ConfirmDialog dialog={showpop} closedialog={(close) => { setshowpop(close) }} confirm={(confirm) => { setisconfirm(confirm) }} cancel={(cancel) => { setiscancel(cancel) }} />
            }
            <ToastContainer />
            <div className='w-1/4 max-md:w-full flex flex-col gap-4 p-4 border-r-4 max-md:border-r-0 max-md:border-b-4 max-md:pb-6 border-dotted border-pink-600'>
                <div className='my-5'>
                    <Link to={'/'} className="flex font-bold items-center justify-center">
                        <span className="text-pink-600 text-4xl hover:scale-2.5 text-center">
                            Kart <span className="text-blue-600 text-4xl">.com</span>
                        </span>
                    </Link>
                    <p className='font-semibold text-center text-blue-600 mt-4'>A Platform For All Your Needs</p>
                </div>
                <div className='border-b-4 border-green-600 mb-4'>
                    <h2 className="text-2xl max-md:text-xl font-bold text-pink-600 m-2 p-4 text-center ">Account Menu</h2>
                </div>
                {
                    accountmenu.map((e, id) => <HashLink key={id} to={e.link} onClick={() => e.action()} className='transition-all hover:border-4 rounded-lg hover:shadow-2xl hover:bg-blue-600 hover:text-white p-3 flex justify-between text-wrap'>
                        <span className='text-xl font-semibold'>{e.name}</span><MdOutlineKeyboardArrowRight size={30} />
                    </HashLink>)
                }
            </div>
            {
                isLoading || newload ? <center className='mx-auto my-auto'>
                    <DNA visible={true}
                        width="400"
                        color="#4fa94d"
                        ariaLabel="infinity-spin-loading" />
                </center> : <>
                    <div className='w-3/4 max-md:w-full p-4'>
                        {
                            toupdate ? <UpdateUser settoupdate={settoupdate} /> : <div id='details' className='border-4 rounded-lg shadow-2xl p-6 max-sm:p-2 flex flex-col flex-wrap justify-between mt-6 relative overflow-clip'>
                                <div className='text-wrap box-border w-full'>
                                    <img className='w-44 h-44 rounded-full' src={Userdataget?.avatar?.url ? Userdataget?.avatar?.url : pic} alt="Profile" />
                                    <h2 className='text-2xl max-sm:text-xl py-2 font-semibold text-pink-600'>{Userdataget?.firstname + " " + Userdataget?.lastname}</h2>
                                    <div className="text-xl max-sm:text-base font-semibold max-sm:font-light max-sm:flex-col max-sm:flex-wrap max-sm:items-center max-sm:justify-center">
                                        <span className="text-pink-600">Candidate Id</span><span className="ml-8 text-blue-600">{Userdataget?._id}</span>
                                    </div>
                                    <div className="text-xl max-sm:text-base font-semibold max-sm:font-light max-sm:flex-col max-sm:flex-wrap max-sm:items-center max-sm:justify-center">
                                        <span className="text-pink-600">Email</span><span className="ml-8 text-blue-600">{Userdataget?.email}</span>
                                    </div>
                                    <div className="text-xl max-sm:text-base font-semibold max-sm:font-light max-sm:flex-col max-sm:flex-wrap max-sm:items-center max-sm:justify-center">
                                        <span className="text-pink-600">Role</span><span className="ml-8 text-blue-600 text-green-600">{Userdataget?.role}</span>
                                    </div>
                                    <div className="text-xl max-sm:text-base font-semibold max-sm:font-light max-sm:flex-col max-sm:flex-wrap max-sm:items-center max-sm:justify-center">
                                        <span className="text-pink-600">Account Creation</span><span className="ml-8 text-blue-600">{joiningdate}</span>
                                    </div>
                                </div>
                                <div className='flex justify-between flex-wrap w-full mt-6'>
                                    <div className='h-full'>
                                        <div className='flex items-center gap-2'>
                                            <span className='text-4xl max-sm:text-2xl font-semibold text-blue-600'>{OrderList.length}</span><span><MdOutlineKeyboardArrowRight size={30} /></span>
                                        </div>
                                        <span className='pt-1 text-lg max-sm:text-base font-semibold text-blue-600'>Total Orders</span>
                                    </div>
                                    <div className='h-full'>
                                        <div className='flex items-center gap-2'>
                                            <span className='text-4xl max-sm:text-2xl font-semibold text-blue-600'>{myreviews}</span><span><MdOutlineKeyboardArrowRight size={30} /></span>
                                        </div>
                                        <span className='pt-1 text-lg max-sm:text-base font-semibold text-blue-600'>Total Reviews</span>
                                    </div>
                                </div>
                                <div className='absolute top-4 right-4' onClick={() => enableediting()}>
                                    <MdEdit size={35} />
                                </div>
                            </div>
                        }


                        {
                            showcurrpass ? <div id='currpass'><ChangeCurrentPassword setshowcurrpass={() => setshowcurrpass()} showcurrpass={showcurrpass} /></div> : <AddressList />
                        }


                        {
                            showforget ? <div id='forgetpass'><ForgetPassword setshowforget={setshowforget} /></div> : <>
                                <div id='Orders' className='w-full'>
                                    <h2 className="text-3xl font-bold text-pink-600 m-2 p-4 text-center border-b-4 border-green-600 border-dotted">My Orders</h2>
                                    {
                                        OrderList.length > 0 ?
                                            <div className='w-full p-4 max-sm:p-0 m-2 max-sm:m-0 border-4 rounded-lg shadow-2xl box-border overflow-clip relative'>
                                                <div className='w-full flex flex-wrap gap-2 items-center justify-center'>
                                                    {
                                                        OrderList.map((e) => (
                                                            e?.order?.map((i, id) => <Link to={`/order/${e._id}`} key={id} className='w-full shadow-2xl mx-4 p-4 max-sm:p-1 max-sm:m-0 '>
                                                                <div className='w-full'>
                                                                    <div className='w-36 mx-auto'>
                                                                        <img src={i?.image} alt={i?.name} className="w-full h-48 object-contain rounded-md mb-4" />
                                                                    </div>
                                                                    <div>
                                                                        <h2 className="text-lg text-pink-600 font-semibold">{i?.name}</h2>
                                                                        <table className="text-base font-semibold w-full text-wrap">
                                                                            <tbody>
                                                                                <tr>
                                                                                    <th className='pr-6 text-start text-pink-600'>Product Id</th>
                                                                                    <td className="mx-8 text-clip">{i?.productData}</td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </div>
                                                                    <div>
                                                                        <table className="text-base font-semibold w-full text-wrap">
                                                                            <tbody>
                                                                                <tr>
                                                                                    <th className='pr-6 text-start text-pink-600'>Payment Id</th>
                                                                                    <td className="mx-8 text-wrap">{e?.payment?.id}</td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <th className='pr-6 text-start text-pink-600'>Status</th>
                                                                                    <td className="mx-8 text-wrap">{e?.payment?.status}</td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <th className='pr-6 text-start text-pink-600'>Method</th>
                                                                                    <td className="mx-8 text-wrap">{e?.payment?.method}</td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <th className='pr-6 text-start text-pink-600'>Order Status</th>
                                                                                    <td className="mx-8 text-wrap">{e?.orderStatus}</td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </div>
                                                                </div>
                                                            </Link>)
                                                        )
                                                        )
                                                    }
                                                </div>
                                                <div className='w-full mt-12'>
                                                    <div className='flex text-pink-600 gap-2 items-center justify-center'>
                                                        <FaClock size={30} />
                                                        <p className="text-xl font-bold p-4">Cart Summary</p>
                                                    </div>
                                                    <div className='mt-12 max-sm:mt-4'>
                                                        <div className='flex gap-2 items-center justify-between text-xl max-sm:text-base font-semibold px-6 mt-2'>
                                                            <span>Total Price</span>
                                                            <span>₹{OrderList?.at(0)?.itemPrice}</span>
                                                        </div>
                                                        <div className='flex gap-2 items-center justify-between text-xl max-sm:text-base font-semibold px-6 mt-2'>
                                                            <span>Shipping Charges</span>
                                                            <span>₹{OrderList?.at(0)?.shippingCost.toFixed(2)}</span>
                                                        </div>
                                                        <div className='flex gap-2 items-center justify-between text-xl max-sm:text-base font-semibold px-6 mt-2'>
                                                            <span>Tax</span>
                                                            <span>₹{OrderList?.at(0)?.tax?.toFixed(2)}</span>
                                                        </div>
                                                        <div className='flex gap-2 items-center justify-between text-xl max-sm:text-base font-semibold px-6 border-t-2 border-b-2 mx-2 p-2 mt-10'>
                                                            <span>Grand Total</span>
                                                            <span className='text-pink-600 font-semibold text-2xl max-sm:text-xl'>₹{OrderList?.at(0)?.totalprice}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div> : <NoFound message={'No Order Placed Yet'} />
                                    }
                                </div>
                            </>
                        }
                    </div>
                </>
            }
        </div>
    )
}

export default AccountComponent
