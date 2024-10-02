import React from 'react'
import { useSelector } from 'react-redux'
import { FaLocationDot, FaS } from "react-icons/fa6";


const AddressList = ({ setaddress1,
    setaddress2,
    setmycity,
    setmycountry,
    setstate,
    setpincode,
    setphone }) => {
    const { shippingDetails } = useSelector(state => state.Cart)
    return (
        <>
            <div className='mb-4 w-full'>
                {
                    shippingDetails.length > 0 ? <>
                        <h2 className="text-3xl max-sm:text-xl font-bold text-pink-600 m-2 p-4 text-center border-b-4 border-green-600 border-dotted">Address</h2>
                        <div className='flex flex-wrap max-md:gap-4 items-center justify-around mt-10'>
                            {
                                shippingDetails.map((e, id) => <div key={id} className='border-4 rounded-lg shadow-2xl p-6 w-1/2 max-md:w-full overflow-clip' onClick={() => {
                                    console.log('shipping is called', e)
                                    setaddress1(e.address)
                                    setaddress2(e.blockaddress)
                                    setmycity(e.city)
                                    setmycountry(e.country)
                                    setstate(e.state)
                                    setpincode(e.pincode)
                                    setphone(e.phone)
                                }}>
                                    <FaLocationDot size={30} />
                                    <div className='mt-4'>
                                        <table className="text-xl max-sm:text-base font-semibold px-2 text-wrap">
                                            <tbody>
                                                <tr>
                                                    <th className='pr-4 text-start'>Address</th>
                                                    <td className="mx-8 text-clip ">{e.address}</td>
                                                </tr>
                                                <tr>
                                                    <th className='pr-4 text-start'>Block</th>
                                                    <td className="mx-8 text-clip ">{e.blockaddress}</td>
                                                </tr>
                                                <tr>
                                                    <th className='pr-4 text-start'>City</th>
                                                    <td className="mx-8 text-clip ">{e.city}</td>
                                                </tr>
                                                <tr>
                                                    <th className='pr-4 text-start'>State</th>
                                                    <td className="mx-8 text-clip ">{e.state}</td>
                                                </tr>
                                                <tr>
                                                    <th className='pr-4 text-start'>Country</th>
                                                    <td className="mx-8 text-clip ">{e.country}</td>
                                                </tr>
                                                <tr>
                                                    <th className='pr-4 text-start'>PinCode</th>
                                                    <td className="mx-8 text-clip ">{e.pincode}</td>
                                                </tr>
                                                <tr>
                                                    <th className='pr-4 text-start'>Contact Number</th>
                                                    <td className="mx-8 text-clip ">{e.phone}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>)
                            }
                        </div>
                    </> : " "
                }
            </div>
        </>
    )
}

export default AddressList
