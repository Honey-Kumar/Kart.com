import { ImCross } from "react-icons/im";
import React, { useEffect, useState } from 'react'
import { FaUser } from 'react-icons/fa6'
import { MdEmail } from 'react-icons/md'
import avatarPreview from "../assets/profilepic.png"
import { DNA } from 'react-loader-spinner'
import { useDispatch, useSelector } from "react-redux";
import pic from "../assets/profilepic.png"
import { UpdateUserData } from "../Redux/Slicers/UserSlicer";
import { toast } from "react-toastify";

const UpdateUser = ({ settoupdate }) => {
    const dispatch = useDispatch();
    const { isLoading, User, isUpdated, isError, Errmsg } = useSelector(state => state.User)

    const [firstname, setfirstname] = useState('')
    const [lastname, setlastname] = useState('')
    const [email, setemail] = useState('')
    const [showimg, setshowimg] = useState(avatarPreview)
    const [mypic, setmypic] = useState('')

    //changing showimg when mypic is uploaded
    const handlepicupload = (e) => {
        const reader = new FileReader();

        reader.onload = () => {
            if (reader.readyState === 2) {
                setshowimg(reader.result);
                setmypic(reader.result);
            }
        };

        reader.readAsDataURL(e.target.files[0]);
    }

    const submitform = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('firstname', firstname);
            formData.append('lastname', lastname);
            formData.append('email', email);
            if (mypic) {
                formData.append('avatar', mypic);
            }

            const myid = User?.User?._id;
            console.log(myid)
            await dispatch(UpdateUserData({ userdata: formData, id: myid }));

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (User) {
            const userdata = User?.response || User?.User;
            setfirstname(userdata?.firstname)
            setlastname(userdata?.lastname)
            setemail(userdata?.email)
            setshowimg(userdata?.avatar?.url || pic)
        }
        if (isUpdated) {
            toast.info("User Details Updated Successfully")
        }
        if (isError) {
            toast.error(Errmsg)
        }
    }, [User, isUpdated, isError, Errmsg])
    return (
        <>
            {
                isLoading ? <center>
                    <DNA visible={true}
                        width="400"
                        color="#4fa94d"
                        ariaLabel="infinity-spin-loading" />
                </center> : <div id='details' className='border-4 rounded-lg shadow-2xl p-6 flex flex-col flex-wrap justify-between mt-6 relative overflow-clip'>
                    <div>
                        <h2 className="text-3xl font-bold text-pink-600 m-4 p-4 text-center ">Update User</h2>
                    </div>

                    <div>
                        <form
                            className="w-full flex flex-col gap-2"
                            encType="multipart/form-data"
                            onSubmit={(e) => submitform(e)}
                        >
                            <div className='relative'>
                                <FaUser className="absolute top-3 left-5" size={25} />
                                <input
                                    className='p-2 w-full outline-none border rounded-xl text-center'
                                    type="text"
                                    placeholder="Enter First Name"
                                    required
                                    name="firstname"
                                    value={firstname}
                                    onChange={(e) => setfirstname(e.target.value)}
                                />
                            </div>
                            <div className='relative'>
                                <FaUser className="absolute top-3 left-5" size={25} />
                                <input
                                    className='p-2 w-full outline-none border rounded-xl text-center'
                                    type="text"
                                    placeholder="Enter Last Name"
                                    required
                                    name="lastname"
                                    value={lastname}
                                    onChange={(e) => setlastname(e.target.value)}
                                />
                            </div>
                            <div className='relative' >
                                <MdEmail className="absolute top-3 left-5" size={25} />
                                <input
                                    className='p-2 w-full outline-none border rounded-xl text-center'
                                    type="email"
                                    placeholder="Enter Email"
                                    required
                                    name="email"
                                    value={email}
                                    autoComplete="email"
                                    onChange={(e) => setemail(e.target.value)}
                                />
                            </div>

                            <div >
                                <img className='w-24 h-24 mb-2' src={showimg} alt="Avatar Preview" />
                                <input
                                    className='p-2 w-full outline-none border rounded-xl'
                                    type="file"
                                    name="avatar"
                                    accept="image/*"
                                    onChange={(e) => handlepicupload(e)}
                                />
                            </div>
                            <input type="submit" value="Update" className="bg-pink-600 p-2 rounded-xl border outline-none text-white cursor-pointer" />
                        </form>
                    </div>

                    <div className='absolute top-6 right-6' onClick={() => { settoupdate(false) }}>
                        <ImCross size={30} />
                    </div>
                </div>
            }
        </>
    )
}

export default UpdateUser
