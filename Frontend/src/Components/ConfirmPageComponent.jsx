import React from 'react'
import CartCheckoutTracker from './CartCheckoutTracker'
import { useDispatch, useSelector } from 'react-redux'
import OrderSummary from './OrderSummary'
import { FaLocationDot } from 'react-icons/fa6'
import { RequestURL } from '../Redux/RequestData'
import { VITE_RazorpayApi } from '../../dataconfig'
import { toast } from 'react-toastify'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { CreateOrderThunk } from '../Redux/Slicers/OrderSlicer'
import { CartActions } from '../Redux/Slicers/CartSlicer'

const ConfirmPageComponent = () => {
    const dispatch = useDispatch();
    const { CartIteams, shippingDetails, confirmShipping } = useSelector(state => state.Cart)
    const navigate = useNavigate();

    const handlePayment = async (amount) => {
        console.log('amount', amount)
        try {
            // Create order
            const response = await axios.post(`${RequestURL}/payment/create/order`, {
                amount, // Amount in paise
            }, {
                withCredentials: true,
                credentials: 'include'
            });

            console.log(response)
            const { id } = response.data;

            // Setup Razorpay options
            const options = {
                key: VITE_RazorpayApi, // Replace with your Razorpay key_id
                amount: amount * 100, // Amount in paise
                currency: "INR",
                name: "Kart.com",
                description: "A platform For All your Needs",
                order_id: id,
                handler: async (response) => {
                    // Verify payment
                    try {
                        const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = response;
                        console.log('Printing payment response', razorpay_payment_id, razorpay_order_id, razorpay_signature)

                        if (razorpay_payment_id && razorpay_order_id && razorpay_signature) {
                            const result = await axios.post(`${RequestURL}/payment/verify`, {
                                razorpay_paymentID: razorpay_payment_id,
                                razorpay_orderID: razorpay_order_id,
                                razorpay_signature: razorpay_signature,
                            }, {
                                withCredentials: true,
                                credentials: 'include'
                            });

                            const { status, method } = result.data.payment
                            // creating order for Customer in backend
                            const paymentData = {
                                razorpay_payment_id: razorpay_payment_id,
                                method: method,
                                status: status
                            }
                            await CreateProductOrder(paymentData);

                            toast.info('Payment successful!');
                            console.log(result)
                            navigate('/payment/success')
                        }

                    } catch (error) {
                        toast.error(`Payment verification failed due to ${error.message}`);

                    }
                },
                prefill: {
                    name: confirmShipping.username,
                    email: confirmShipping.email,
                    contact: confirmShipping.phone,
                },
                theme: {
                    color: "#F37254",
                },
            };

            const rzp = new window.Razorpay(options);
            rzp.open();
        } catch (error) {
            console.error('Error creating order:', error);
        }
    };

    const CreateProductOrder = async (paymentData) => {
        try {
            const orderData = {
                shippingInfo: {
                    address: confirmShipping.address + " " + confirmShipping.blockaddress,
                    city: confirmShipping.city,
                    state: confirmShipping.state,
                    country: confirmShipping.country,
                    pincode: confirmShipping.pincode,
                    phone: confirmShipping.phone,
                    email: confirmShipping.email,
                },
                order: CartIteams.map(item => ({
                    name: item.iteam.response.name,
                    price: item.iteam.response.price,
                    quantity: item.quantity,
                    image: item.iteam.response.image.at(0).url,
                    productData: item.iteam.response._id,
                })),
                payment: {
                    id: paymentData.razorpay_payment_id,
                    method: paymentData.method,
                    status: paymentData.status,
                },
                itemPrice: calculateTotalPrice(),  // Implement price calculation function
                tax: calculateTax(),  // Implement tax calculation
                shippingCost: calculateShipping(),  // Implement shipping calculation
                totalprice: calculateTotalAmount(),  // Total amount with shipping and tax
            };

            // Dispatch order details to Redux
            await dispatch(CreateOrderThunk(orderData));

            let OrderProductList = CartIteams.map(e => e.iteam.response._id);

            await dispatch(CartActions.clearCartIteams(OrderProductList));

        } catch (error) {
            console.error('Error creating order:', error);
        }
    }

    // Price calculation functions
    const calculateTotalPrice = () => {
        return CartIteams.reduce((acc, item) => acc + item.iteam.response.price * item.quantity, 0);
    };

    const calculateTax = () => {
        return calculateTotalPrice() * 0.18; // Example: 18% tax
    };

    const calculateShipping = () => {
        return calculateTotalPrice() * 0.01; // Flat shipping rate, can be dynamic
    };

    const calculateTotalAmount = () => {
        return calculateTotalPrice() + calculateTax() + calculateShipping();
    };

    return (
        <>
            <div className='w-full overflow-hidden'>
                <CartCheckoutTracker active={1} />
                <div>
                    <h2 className="text-3xl font-bold text-pink-600 m-4 p-4 text-center border-b-4 border-green-600 border-dashed">Confirm Order</h2>
                </div>
                <div className='w-full flex max-md:flex-col iteam-center text-white mt-12'>
                    <div className='w-1/2 max-md:w-full bg-pink-600'>
                        <div>
                            <h2 className="text-3xl font-bold m-4 p-4 text-center border-b-4 border-green-600 border-dashed">Products</h2>
                        </div>
                        {
                            CartIteams.map((item, id) =>
                                <div key={id} className={`p-4 m-2 mt-6 border rounded-lg shadow-2xl box-border overflow-clip relative`}>
                                    <img
                                        src={item.iteam.response.image.at(0).url}
                                        alt={item.iteam.response.name}
                                        className="w-full h-48 object-contain rounded-md mb-4"
                                    />
                                    <p className="text-xl font-semibold mb-2">{item.iteam.response.name}</p>
                                    <div className="flex flex-wrap items-center justify-between gap-2 pt-4 px-6">
                                        <span className="text-2xl font-bold ">₹{item.iteam.response.price}</span>
                                        <div className="text-xl font-semibold overflow-clip">
                                            <span>Quantity</span><span className="ml-2 text-clip">{item.quantity}</span>
                                        </div>
                                    </div>
                                </div>
                            )
                        }

                        <div className='w-full p-4'>
                            <div>
                                <h2 className="text-3xl font-bold m-4 p-4 text-center border-b-4 border-green-600 border-dashed">Shipping Address</h2>
                            </div>
                            <div className='border-2 rounded-lg shadow-2xl p-6 max-md:w-full overflow-clip'>
                                <FaLocationDot size={30} />
                                <div className='mt-1'>
                                    <table className="text-xl font-semibold px-2">
                                        <tbody>
                                            <tr>
                                                <th className='pr-6 text-start'>Name</th>
                                                <td className="mx-8 text-clip ">{confirmShipping.username}</td>
                                            </tr>
                                            <tr>
                                                <th className='pr-6 text-start'>Email</th>
                                                <td className="mx-8 text-clip ">{confirmShipping.email}</td>
                                            </tr>
                                            <tr>
                                                <th className='pr-6 text-start'>Address</th>
                                                <td className="mx-8 text-clip ">{confirmShipping.address}</td>
                                            </tr>
                                            <tr>
                                                <th className='pr-6 text-start'>Block</th>
                                                <td className="mx-8 text-clip ">{confirmShipping.blockaddress}</td>
                                            </tr>
                                            <tr>
                                                <th className='pr-6 text-start'>City</th>
                                                <td className="mx-8 text-clip ">{confirmShipping.city}</td>
                                            </tr>
                                            <tr>
                                                <th className='pr-6 text-start'>State</th>
                                                <td className="mx-8 text-clip ">{confirmShipping.state}</td>
                                            </tr>
                                            <tr>
                                                <th className='pr-6 text-start'>Country</th>
                                                <td className="mx-8 text-clip ">{confirmShipping.country}</td>
                                            </tr>
                                            <tr>
                                                <th className='pr-6 text-start'>PinCode</th>
                                                <td className="mx-8 text-clip ">{confirmShipping.pincode}</td>
                                            </tr>
                                            <tr>
                                                <th className='pr-6 text-start'>Contact Number</th>
                                                <td className="mx-8 text-clip ">{confirmShipping.phone}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div >
                    <div className='w-1/2 max-md:w-full bg-green-600'>
                        <OrderSummary showpromo={false} btntitle={`pay`} payfun={handlePayment} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default ConfirmPageComponent
