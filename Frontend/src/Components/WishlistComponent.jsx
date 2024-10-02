import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ProductCard from './ProductCard'
import { Link } from 'react-router-dom'
import { ImCross } from "react-icons/im";
import { WishlistAction } from '../Redux/Slicers/WishlistSlicer';
import { toast, ToastContainer } from 'react-toastify';
import NoFound from "./NoFound"

function WishlistComponent() {
    const { wishlist } = useSelector(state => state.Wishlist)
    const dispatch = useDispatch();

    const removewish = (id) => {
        console.log(id)
        dispatch(WishlistAction.removefromlist(id));
        toast("Product deleted from Favourite Products List")
    }

    return (
        <div className='w-full'>
            <ToastContainer />
            <div>
                <h2 className="text-3xl font-bold text-pink-600 m-4 p-4 text-center border-b-4 border-green-600">My Favourite Products</h2>
            </div>
            {
                wishlist.length === 0 ? <NoFound message={"No Product Exists in Wishlist"} /> : <div className="flex items-center justify-around overflow-x-scroll no-scrollbar mt-6">
                    {
                        wishlist.map((e, eid) => <Link className='relative' key={eid} to={`/product/${e?.id}`}>
                            <ProductCard
                                description={e?.description}
                                headline={e?.headline}
                                image={e?.image}
                                ratings={e?.ratings}
                                id={e?.id}
                                fav={true}
                                price={e.price}
                                showclose={true}
                                closeaction={() => removewish(e.id)}
                            />
                            {/* <div className='absolute top-5 left-5 p-1' >
                                <ImCross size={25} onClick={() => removewish(e?.id)} />
                            </div> */}
                        </Link>)
                    }
                </div>
            }
        </div>
    )
}

export default WishlistComponent
