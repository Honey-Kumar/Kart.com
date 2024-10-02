import { Link } from 'react-router-dom'
import ReactStars from 'react-stars'
import logo from '../assets/Kart.com-1.png'
import { FaHeart, FaPencil, FaRegHeart } from 'react-icons/fa6';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { WishlistAction } from '../Redux/Slicers/WishlistSlicer';
import { toast, ToastContainer } from 'react-toastify';
import { ImCross } from "react-icons/im";


const ProductCard = ({ description, headline, image, ratings, width = "", id, fav = false, price, btntitle, btnaction = () => { }, showheart = true, showclose = false, quantity, closeaction, showpencil = false, pencilaction = () => { } }) => {
    const dispatch = useDispatch();

    const truncateDescription = (description, wordLimit) => {
        const words = description.split(' ');
        if (words.length > wordLimit) {
            return words.slice(0, wordLimit).join(' ') + '...';
        }
        return description;
    };
    const [favourite, setfavourite] = useState(fav)

    const Addtofavourite = async () => {
        try {
            const iteam = { id, headline, description, image, ratings, price }
            favourite ? setfavourite(false) : setfavourite(true)
            await dispatch(WishlistAction.addtolist(iteam))
            toast.info("Product Added to WishList")
        } catch (error) {
            toast.error("Error occured ", err)
        }

    }
    return (
        <>
            <ToastContainer />
            <div className={`${width} p-4 m-2 border rounded-lg shadow-2xl box-border overflow-clip relative`}>
                <img
                    src={image}
                    alt={headline}
                    className="w-full h-48 object-contain rounded-md mb-4"
                />
                <h2 className="text-xl font-semibold mb-2">{headline}</h2>
                <p className="text-gray-600">{truncateDescription(description, 10)}</p>
                <div className="text-base font-semibold mt-4 overflow-clip">
                    <span className="text-pink-600">Id</span><span className="ml-2 text-clip">{id}</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-green-600 font-semibold">Verified By</span><span><img className="w-12 h-12 rounded-full" src={logo} alt="Logo" /></span>
                </div>
                <ReactStars
                    count={5}
                    value={ratings}
                    half={true}
                    size={30}
                    color2={'#ffd700'}
                    edit={false}
                />
                <div className="flex flex-wrap items-center justify-between gap-2 pt-4">
                    <span className="text-2xl font-bold text-pink-600 dark:text-white">₹{price}</span>
                    {
                        quantity ? <div className="text-xl font-semibold mt-4 overflow-clip">
                            <span className="text-pink-600">Quantity</span><span className="ml-2 text-clip text-blue-600">{quantity}</span>
                        </div> : ''
                    }
                    {
                        btntitle && <button onClick={() => btnaction()} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 max-sm:px-3 max-sm:py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">{btntitle}</button>
                    }
                </div>
                {
                    showheart === true ? <div className='absolute top-5 right-5 p-1' onClick={Addtofavourite}>
                        {
                            favourite ?
                                <FaHeart size={30} color='red' /> :
                                <FaRegHeart size={30} color='red' />
                        }
                    </div> : ''
                }
                {
                    showclose === true ? <div className='absolute top-5 left-5 p-1' >
                        <ImCross size={25} onClick={() => closeaction(id)} />
                    </div> : ''
                }
                {
                    showpencil === true ? <div className='absolute top-5 right-5 p-1' onClick={pencilaction}>
                        <FaPencil size={25} />
                    </div> : ''
                }
            </div>

        </>
    )
}
export default ProductCard