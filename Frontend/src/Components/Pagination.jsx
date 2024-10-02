import React, { useEffect, useState } from 'react'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa6'
import { useDispatch, useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify'
import { FetchProduct } from '../Redux/Slicers/Products';

const Pagination = ({ currentpage, updatepage }) => {
    // const dispatch = useDispatch()
    const { isLoading, product } = useSelector(state => state.Products);
    // const [curpage, setcurpage] = useState(currentpage)

    // useEffect(() => {
    //     const fetchProducts = async () => {
    //         try {
    //             // console.log("updating page....", curpage, typeof (curpage))
    //             await dispatch(FetchProduct({ keyword: '', page: curpage }));
    //         } catch (err) {
    //             toast.error(err);
    //         }
    //     };

    //     fetchProducts();
    // }, [dispatch, curpage])

    const notify = () => toast("No previous page exists")

    const prevpage = () => {
        if (currentpage > 1) updatepage(value => value - 1);
        else notify()

    }
    const nextpage = () => {
        if (currentpage > 0) updatepage(value => value + 1);
    }
    return (
        <>
            <div className='flex flex-wrap items-center justify-center gap-5 p-4 mt-5 w-full'>
                <ToastContainer />
                <button onClick={() => prevpage()} className='px-12 py-2 max-sm:px-4 flex flex-wrap items-center gap-2 bg-pink-600 text-white rounded-lg hover:bg-blue-600'><span><FaArrowLeft /></span> prev</button>
                <div className='px-8 py-2 max-sm:px-4 bg-blue-600 text-white rounded-lg font-semibold'>{currentpage}</div>
                <button onClick={() => nextpage()} className='px-12 py-2 max-sm:px-4 flex flex-wrap items-center gap-2 bg-pink-600 text-white rounded-lg hover:bg-blue-600'>next <span><FaArrowRight /></span></button>
            </div>
        </>
    )
}

export default Pagination
