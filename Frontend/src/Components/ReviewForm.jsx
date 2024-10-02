import React, { useEffect, useState } from 'react'
import { FaUser } from 'react-icons/fa6'
import { useDispatch, useSelector } from 'react-redux'
import ReactStars from 'react-stars'
import { AddUpdateProductReview } from '../Redux/Slicers/Products'
import { toast } from 'react-toastify'

const ReviewForm = ({ id }) => {
    console.log('id is ', id)
    const dispatch = useDispatch()
    const { isReviewAdded, Errmsg, isError } = useSelector(state => state.Products)
    const [name, setname] = useState('')
    const [comment, setcomment] = useState('')
    const [rating, setrating] = useState(1)

    const addreview = async (e) => {
        e.preventDefault()
        try {
            const reviewdata = {
                name,
                rating,
                comment
            }
            await dispatch(AddUpdateProductReview({ reviewdata, id }))
            setname('')
            setcomment('')
            setrating(1)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (isError) {
            toast.error(Errmsg)
        }
        if (isReviewAdded) {
            toast.info('Review Maintained Successfully')
        }
        if (id === '') {
            toast.error("Please Select Product to Maintain Review")
        }
    }, [isError, Errmsg, isReviewAdded])

    return (
        <div>
            <form method='POST' className='flex flex-col gap-3 justify-center text-center p-8 w-full relative' onSubmit={(e) => addreview(e)}>
                <input className='relative p-2 text-center rounded-xl border outline-none' type="text" placeholder='Enter Your Name' value={name} onChange={(e) => setname(e.target.value)} autoComplete="name"
                />
                <span className='absolute top-10 left-10 text-pink-600'><FaUser size={25} /></span>
                <ReactStars
                    count={5}
                    value={rating}
                    onChange={(e) => setrating(e)}
                    half={true}
                    size={30}
                    color2={'#ffd700'}
                    edit={true}
                />
                <textarea className='relative p-2 text-center rounded-xl border outline-none' placeholder='Enter Comment' value={comment} onChange={(e) => setcomment(e.target.value)}
                />
                {
                    id === '' ? <input disabled className='bg-pink-600 p-2 rounded-xl border outline-none text-white cursor-pointer' type="submit" value="Submit" onClick={() => toast.error("Please Select Product to Maintain Review")} />
                        : <input className='bg-pink-600 p-2 rounded-xl border outline-none text-white cursor-pointer hover:bg-blue-600 transition-all' type="submit" value="Submit" />
                }
            </form>
        </div>
    )
}

export default ReviewForm
