import { Link, useNavigate } from "react-router-dom"
import Logo from "../assets/Kart.com-1.png"
import { IoReorderThreeSharp } from "react-icons/io5";
import { FaLocationCrosshairs } from "react-icons/fa6";
import { MdAccountBox } from "react-icons/md";
import { FaSearch, FaShoppingCart } from "react-icons/fa";
import { FaFilter } from "react-icons/fa6";
import { FcLike } from "react-icons/fc";
import ClickButton from "./ClickButton";
import { useEffect, useState } from "react";
import { IoLogOutOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { LogoutUser } from "../Redux/Slicers/UserSlicer";
import { toast, ToastContainer } from "react-toastify";
import { OrderActions } from "../Redux/Slicers/OrderSlicer";



const Navbar = () => {
    const dispatch = useDispatch();
    const { isLoading, isAuthenticate, isError, Errmsg, User, isLogout } = useSelector(state => state.User)
    const [location, setLocation] = useState(''); // Default location
    const [serachvalue, setserachvalue] = useState('');
    const navigate = useNavigate()

    const Menu = [
        { name: 'Home', link: '/' },
        { name: 'Sale', link: '/' },
        { name: 'Special Deals', link: '/' },
        { name: 'Best Seller', link: '/' },
        { name: 'Fashion', link: '/product' },
        { name: 'Grocery', link: '/product' },
        { name: 'Electronics', link: '/product' },
        { name: 'Kitchen', link: '/product' },
        { name: 'Jewellery', link: '/product' },
        { name: 'Furniture', link: '/product' },
    ]

    const Icons = [
        { name: <FaShoppingCart size={25} />, link: '/cart' },
        { name: <MdAccountBox size={25} />, link: '/account' },
        { name: <FcLike size={25} />, link: '/wishlist' },
        { name: <FaFilter size={25} />, link: '/product' },
        {
            name: isAuthenticate ? <IoLogOutOutline size={25} onClick={() => handlelogout()} /> : '', link: ''
        }
    ]

    const handlelogout = async () => {
        console.log("Logout button clicked");
        try {
            await dispatch(LogoutUser()).then(() => toast.info("User Logged Out Successfully"));
            await dispatch(WishlistAction.clearWishList());
            await dispatch(CartActions.clearCart());
            await dispatch(OrderActions.clearOrders())
            setTimeout(() => {
                navigate("/login")
            }, 2000);
        } catch (error) {
            console.error("Logout failed:", error);
            toast.error(Errmsg)
        }
    };


    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(async (position) => {
                const { latitude, longitude } = position.coords;

                // Reverse geocoding API call
                const response = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`);
                const data = await response.json();

                if (data && data.address) {
                    // Extract city name from the address object
                    const city = data.address.city || data.address.town || data.address.village || "Unknown location";
                    setLocation(city);
                } else {
                    setLocation("Outside Location");
                }
            }, (error) => {
                console.error("Error retrieving location:", error);
                toast.info("Unable to retrieve your location. Please check your browser settings.");
            });
        } else {
            toast.error("Geolocation is not supported by this browser.");
        }

    }, [])


    return (
        <>
            <div className="w-full overflow-hidden flex flex-col box-border bg-black text-white sticky top-0 left-0 right-0 z-50">
                <div className="p-1 w-full flex max-md:flex-col max-sm:gap-2 justify-between">
                    <div className="flex gap-6 max-sm:gap-2 max-md:mx-auto p-2">
                        <div>
                            <Link to={'/'}><img className="w-20 h-20 max-sm:h-10 max-sm:w-10 rounded-full m-1" src={Logo} alt="Logo" /></Link>
                        </div>
                        <div className="flex items-center gap-2">
                            <FaLocationCrosshairs size={25} />
                            <span className="max-sm:text-sm">{location}</span>
                        </div>
                        <div className="flex items-center relative ">
                            <input type="text" value={serachvalue} onChange={(e) => setserachvalue(e.target.value)} placeholder="Search your needs......." className="w-full max-sm:w-24 py-2 px-2 text-pink-600 font-medium rounded-lg outline-none" />
                            <FaSearch size={25} className="absolute max-sm:top-3 top-8 right-4 text-pink-600" onClick={() => {
                                serachvalue ? navigate(`/product?keyword=${serachvalue.trim()}`) : navigate(`/product`)
                                setserachvalue('')
                            }} />
                        </div>
                    </div>
                    <div className="flex items-center gap-5 p-1 max-md:mx-auto">
                        {
                            Icons.map((e, id) => <Link to={e.link} key={id} className="hover:scale-105">{e.name}</Link>)
                        }
                        <Link to={`/login `}><ClickButton title="Login" /></Link>
                    </div>
                </div>
                <div className="flex border-t-2 border-pink-600 p-1">
                    <div className="w-12 ">
                        <IoReorderThreeSharp size={30} />
                    </div>
                    <div className="flex text-ellipsis overflow-auto items-center gap-10 pl-6 font-semibold text-base max-sm:text-sm max-sm:font-medium">
                        {
                            Menu.map((e, id) => <Link to={e.link} key={id} className="hover:text-pink-600">{e.name}</Link>)
                        }
                    </div>
                </div>
            </div>
        </>
    )
}
export default Navbar