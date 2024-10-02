import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AdminAllProduct } from '../../Redux/Slicers/AdminSlicer'
import { toast, ToastContainer } from 'react-toastify'
import { DNA } from 'react-loader-spinner'
import ProductCard from '../ProductCard'
import { Link } from 'react-router-dom'
import { ImBin2 } from "react-icons/im";
import { IoMdAddCircle } from "react-icons/io";
import { FiExternalLink } from "react-icons/fi";
import ConfirmDialog from '../ConfirmDialog'
import { DeleteProduct } from '../../Redux/Slicers/Products'
import Pagination from '../Pagination'
import NoFound from '../NoFound'
import { FaEdit } from "react-icons/fa";


const AllProductscomponent = ({ changeexpression }) => {
    const dispatch = useDispatch()
    const { ProductList, loading, Error, Errormsg } = useSelector(state => state.Admin)
    const { isdeleted, isError, Errmsg, isLoading } = useSelector(state => state.Products)

    const [showpop, setshowpop] = useState('invisible')
    const [confirm, setconfirm] = useState(false)
    const [cancel, setcancel] = useState(false)
    const [showloading, setshowloading] = useState(false)
    const [Idtodelete, setIdtodelete] = useState('')

    // handle pagination
    const [currpage, setcurrpage] = useState(1)

    const handledeleteProduct = async (id) => {
        console.log(id)

        setIdtodelete(id)
        //first show confirm pop up
        setshowpop('visible')
        setcancel(false)
        setconfirm(false)
    }

    useEffect(() => {
        dispatch(AdminAllProduct({ page: currpage }))

        if (ProductList) {
            toast.info('All Product Fetch Successfully')
        }
        if (Error) {
            toast.error(Errormsg)
        }
        if (isError) {
            toast.error(Errmsg)
        }
    }, [Error, Errormsg, isError, Errmsg, isdeleted, dispatch, currpage])

    useEffect(() => {
        if (cancel) {
            setshowpop('visible')
        }
        if (confirm) {
            setshowloading(true)
            dispatch(DeleteProduct(Idtodelete))

            setshowloading(false);
            setshowpop('invisible');
        }
        if (isdeleted) {
            toast.info('Product Deleted Successfully')
        }
    }, [cancel, confirm, dispatch, Idtodelete])

    return (
        <div>
            <ToastContainer />
            <div className='flex items-center justify-between bg-blue-600 text-white p-6'>
                <span className='flex items-center gap-2 text-xl max-sm:text-base max-sm:font-base font-semibold cursor-pointer text-wrap text-center' onClick={() => changeexpression('Create Product')}><IoMdAddCircle size={30} /> Add Product </span>
                <span className='flex items-center gap-2 text-xl max-sm:text-base max-sm:font-base font-semibold cursor-pointer text-wrap text-center' onClick={() => changeexpression('Update Product')}><FaEdit size={30} /> Update Product </span>
            </div>
            {
                loading || isLoading || showloading ? <center className='my-1/2'><DNA
                    visible={true}
                    width="400"
                    color="#4fa94d"
                    ariaLabel="infinity-spin-loading"
                /></center> : <div>
                    {
                        showpop === 'visible' && <ConfirmDialog dialog={showpop} confirm={(confirm) => setconfirm(confirm)} cancel={(cancel) => setcancel(cancel)} closedialog={(pop) => setshowpop(pop)} />
                    }
                    {
                        ProductList.length > 0 ? ProductList.map((e, id) => <div className='relative' key={id} to={`/product/${e?._id}`}>
                            <ProductCard
                                headline={e?.name}
                                description={e?.description}
                                image={e?.image?.at(0)?.url}
                                ratings={e?.ratings}
                                price={e?.price}
                                id={e?._id}
                                showheart={false}
                                btntitle={<ImBin2 size={25} />}
                                btnaction={() => handledeleteProduct(e?._id)}
                            />
                            <Link to={`/product/${e?._id}`} className='absolute top-4 left-6 text-pink-600'><FiExternalLink size={25} /></Link>
                        </div>) : <NoFound message={`No Product Found at Page ${currpage}`} showbtn={false} />
                    }
                </div>
            }
            <Pagination currentpage={currpage} updatepage={(value) => setcurrpage(value)} />
        </div>
    )
}

export default AllProductscomponent
