import React, { useState } from 'react'
import { FaAddressCard, FaMapPin, FaPhone } from 'react-icons/fa6'
import { Country, State, City } from 'country-state-city';
import CartCheckoutTracker from './CartCheckoutTracker';
import { useDispatch, useSelector } from 'react-redux'
import { CartActions } from '../Redux/Slicers/CartSlicer';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { FaLocationDot, FaS } from "react-icons/fa6";
import AddressList from './AddressList';




const ShippingComponent = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { User } = useSelector(state => state.User)

    const [address1, setaddress1] = useState('')
    const [address2, setaddress2] = useState('')
    const [mycountry, setmycountry] = useState('')
    const [state, setstate] = useState('')
    const [mycity, setmycity] = useState('')
    const [pincode, setpincode] = useState('')
    const [phone, setphone] = useState('')



    const countrylist = Country.getAllCountries();
    const statelist = State.getStatesOfCountry(mycountry);
    const citylist = City.getCitiesOfState(mycountry, state);

    const shippingdata = {
        username: User.User.firstname + " " + User.User.lastname,
        email : User.User.email,
        country: mycountry,
        state,
        city: mycity,
        address: address1,
        blockaddress: address2,
        pincode,
        phone
    }
    const handleshipping = async (e) => {
        e.preventDefault();

        await dispatch(CartActions.AddShippingAddress(shippingdata))
        await dispatch(CartActions.ConfirmShippingAddress(shippingdata))
        toast.info('Shipping Address Saved Successfully')
        navigate('/confirmOrder')
    }
    return (
        <>
            <div className='w-full p-10'>
                <CartCheckoutTracker active={0} />

                {/* handling cart adress list */}
                <AddressList setaddress1={setaddress1}
                    setaddress2={setaddress2}
                    setmycity={setmycity}
                    setmycountry={setmycountry}
                    setstate={setstate}
                    setpincode={setpincode}
                    setphone={setphone} />

                <div>
                    <h2 className="text-3xl font-bold text-pink-600 m-4 p-4 text-center border-b-4 border-green-600 border-dashed">Shipping Details</h2>
                </div>
                <div>
                    <form
                        className="w-full flex flex-col gap-2"
                        onSubmit={(e) => handleshipping(e)}
                    >
                        <div className='relative'>
                            <select name="country" id="country" value={mycountry} className='w-full text-center outline-none p-2 border-2 rounded-2xl' onChange={(e) => {
                                console.log(e.target.value)
                                setmycountry(e.target.value)
                            }}>
                                <option>Select Country</option>
                                {
                                    countrylist.map((item, id) => <option key={id} value={item.isoCode}>{item.name}</option>)
                                }
                            </select>
                        </div>

                        <div className='relative'>
                            <select name="country" id="country" value={state} className='w-full text-center outline-none p-2 border-2 rounded-2xl' onChange={(e) => setstate(e.target.value)} disabled={!mycountry}>
                                <option>Select State or Province</option>
                                {
                                    statelist.map((item, id) => <option key={id} value={item.isoCode}>{item.name}</option>)
                                }
                            </select>
                        </div>

                        <div className='relative'>
                            <select name="country" id="country" value={mycity} className='w-full text-center outline-none p-2 border-2 rounded-2xl' onChange={(e) => setmycity(e.target.value)} disabled={!state}>
                                <option>Select City</option>
                                {
                                    citylist.map((item, id) => <option key={id} value={item.name}>{item.name}</option>)
                                }
                            </select>
                        </div>

                        <div className='relative'>
                            <FaAddressCard className="absolute top-3 left-5" size={25} />
                            <input
                                className='p-2 w-full outline-none border rounded-xl text-center'
                                type="text"
                                placeholder="Enter Address Line 1"
                                required
                                name="address1"
                                value={address1}
                                onChange={(e) => setaddress1(e.target.value)}
                            />
                        </div>

                        <div className='relative'>
                            <FaAddressCard className="absolute top-3 left-5" size={25} />
                            <input
                                className='p-2 w-full outline-none border rounded-xl text-center'
                                type="text"
                                placeholder="Enter Address Line 2"
                                required
                                name="address2"
                                value={address2}
                                onChange={(e) => setaddress2(e.target.value)}
                            />
                        </div>

                        <div className='relative'>
                            <FaMapPin className="absolute top-3 left-5" size={25} />
                            <input
                                className='p-2 w-full outline-none border rounded-xl text-center'
                                type="number"
                                placeholder="Enter Pincode"
                                required
                                name="Pincode"
                                value={pincode}
                                onChange={(e) => setpincode(e.target.value)}
                            />
                        </div>

                        <div className='relative'>
                            <FaPhone className="absolute top-3 left-5" size={25} />
                            <input
                                className='p-2 w-full outline-none border rounded-xl text-center'
                                type="number"
                                placeholder="Enter Contact Number"
                                required
                                name="Phone number"
                                value={phone}
                                onChange={(e) => setphone(e.target.value)}
                            />
                        </div>

                        <input type="submit" value="Save" className="bg-pink-600 p-2 rounded-xl border outline-none text-white cursor-pointer" />
                    </form>

                </div>
            </div>
        </>
    )
}

export default ShippingComponent
