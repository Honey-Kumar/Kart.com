import React, { useEffect, useState } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa6';
import { useDispatch, useSelector } from 'react-redux'
import { toast, ToastContainer } from 'react-toastify';
import { UpdateUserData } from '../Redux/Slicers/UserSlicer';
import { DNA } from 'react-loader-spinner';
import { ImCross } from 'react-icons/im';

const ChangeCurrentPassword = ({ setshowcurrpass, showscurrpass }) => {
    const dispatch = useDispatch();
    const { isLoading, User, isUpdated, isError, Errmsg } = useSelector(state => state.User)
    const [prevpassword, setprevpassword] = useState('')
    const [newpassword, setnewpassword] = useState('')

    //handle show and hide password
    const [showprev, setshowprev] = useState(false)
    const [shownew, setshownew] = useState(false)

    const handleupdate = async (e) => {
        e.preventDefault();
        console.log("Form submitted"); // Debugging line
        const formdata = new FormData();
        formdata.append("prevpassword", prevpassword);
        formdata.append("password", newpassword);

        try {
            if (isUpdated) {
                toast.info("Please Re-login to make New Updation")
            }
            const myid = User?.User._id || User?.response?._id;
            console.log("dispatching UpdateUserData........");
            await dispatch(UpdateUserData({ userdata: formdata, id: myid }));
        } catch (error) {
            toast.error(error);
        }
    };

    useEffect(() => {
        if (isError) {
            toast.error(Errmsg);
        }
        if (isUpdated) {
            toast.info("User Current Password Changed Successfully");
        }
    }, [isError, Errmsg, isUpdated]);
    return (
        <div className='border-4 rounded-lg shadow-2xl p-6 flex flex-col flex-wrap justify-between mt-6 relative overflow-clip'>
            <ToastContainer />
            {
                isLoading ? <center>
                    <DNA visible={true}
                        width="400"
                        color="#4fa94d"
                        ariaLabel="infinity-spin-loading" />
                </center> : <>
                    <h2 className="text-3xl font-bold text-pink-600 p-4 text-center">Change Current Password</h2>
                    <form method='PUT' className='flex flex-col gap-3 justify-center text-center p-8 w-full relative' onSubmit={(e) => handleupdate(e)}>
                        <input className='relative p-2 text-center rounded-xl border outline-none' name='prevpassword' type={`${showprev ? 'text' : "password"}`} placeholder='Enter Current Password' value={prevpassword} onChange={(e) => setprevpassword(e.target.value)} autoComplete="prevpassword"
                        />
                        <span onClick={() => showprev ? setshowprev(false) : setshowprev(true)} className='absolute top-10 left-10'>{showprev ? <FaEye size={25} /> : <FaEyeSlash size={25} />}</span>
                        <input className='relative p-2 text-center rounded-xl border outline-none' name='newpassword' type={`${shownew ? 'text' : 'password'}`} placeholder='Enter New Password' value={newpassword} autoComplete="current-password" onChange={(e) => setnewpassword(e.target.value)}
                        />
                        <span onClick={() => shownew ? setshownew(false) : setshownew(true)} className='absolute left-10'>{shownew ? <FaEye size={25} /> : <FaEyeSlash size={25} />}</span>
                        <input className='bg-pink-600 p-2 rounded-xl border outline-none text-white cursor-pointer' type="submit" value="Update" />
                    </form>
                </>
            }
            <div className='absolute top-4 right-4' onClick={() => showscurrpass ? setshowcurrpass(false) : setshowcurrpass(true)}>
                <ImCross size={30} />
            </div>
        </div>
    )
}

export default ChangeCurrentPassword
