import React from 'react'
import ProductCard from './ProductCard'
import { useDispatch, useSelector } from 'react-redux'
import QuantityBtn from './QuantityBtn'
import { FaClock } from 'react-icons/fa6'
import ClickButton from './ClickButton'
import { Link } from 'react-router-dom'
import logo from '../assets/Kart.com-1.png'
import { CartActions } from '../Redux/Slicers/CartSlicer'
import { toast } from 'react-toastify'
import NoFound from './NoFound'
import OrderSummary from './OrderSummary'


const CartComponent = () => {
    const { CartIteams } = useSelector(state => state.Cart)
    const dispatch = useDispatch()

    //handling remove product from cart
    const removecartiteam = async (id) => {
        console.log(id)
        try {
            await dispatch(CartActions.removeProductFromCart(id))
            toast.info(`Cart Iteam with Id ${id} is removed from Cart Successfully`)
        } catch (error) {
            toast.error(error)
        }
    }
    return (
        <div className='w-full flex max-sm:flex-col'>
            {
                CartIteams.length <= 0 ? <NoFound message={"No Product Exists in Cart"} /> : <>
                    <div className='w-1/2 max-sm:w-full'>
                        <div>
                            <h2 className="text-3xl font-bold text-pink-600 m-4 p-4 text-center border-b-4 border-green-600 border-dashed">Cart Products</h2>
                        </div>
                        <div >
                            {
                                CartIteams.length >= 0 &&
                                <>
                                    {
                                        CartIteams.map((product, key) => <div key={key}>
                                            <ProductCard
                                                description={product.iteam.response.description}
                                                headline={product.iteam.response.name}
                                                image={product.iteam.response.image.at(0).url}
                                                ratings={product.iteam.response.ratings}
                                                id={product.iteam.response._id}
                                                fav={false}
                                                price={product.iteam.response.price}
                                                showheart={false}
                                                showclose={true}
                                                quantity={product.quantity}
                                                closeaction={() => removecartiteam(product.iteam.response._id)}
                                            />
                                        </div>)
                                    }
                                </>
                            }
                        </div>
                    </div>
                    <div className='w-1/2 bg-green-600 text-white max-sm:w-full max-sm:mt-10'>
                        <OrderSummary checkoutLink='/shipping' />
                    </div>
                </>
            }
        </div>
    )
}

export default CartComponent
