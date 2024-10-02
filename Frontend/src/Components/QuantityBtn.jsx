import React, { useState } from 'react'
import { useSelector } from 'react-redux'

const QuantityBtn = ({ sendqty }) => {
  const productdata = useSelector(state => state.Products.productdetails)
  const { CartIteams, Loading, Errormsg, Errors, iteamadded } = useSelector(state => state.Cart)

  // handling quantitity 
  const [qty, setqty] = useState(1)

  const qtydecrease = () => {
    if (qty > 1) {
      const newQty = qty - 1;
      setqty(newQty);
      sendqty(newQty);
    }
  };

  const qtyincrease = () => {
    if (qty < productdata?.response?.stock) {
      const newQty = qty + 1;
      setqty(newQty);
      sendqty(newQty);
    }
  };

  return (
    <>
      <div className="flex justify-center gap-6 max-md:gap-4 mt-6 max-md:mt-2 items-center w-full text-white font-semibold">
        <button className="px-8 max-md:px-6 py-2 bg-blue-600 rounded-lg text-xl" onClick={() => qtyincrease()}>+</button>
        <div className="px-10 max-md:px-6 py-2 border-4 rounded-lg text-pink-600 text-xl shadow-2xl">{qty}</div>
        <button className="px-8 max-md:px-6 py-2 bg-blue-600 rounded-lg text-xl" onClick={() => qtydecrease()}>-</button>
      </div>
    </>
  )
}

export default QuantityBtn
