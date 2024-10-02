import React, { useEffect } from 'react'
import { DNA } from 'react-loader-spinner'
import { useDispatch, useSelector } from 'react-redux'
import { AdminAllUser } from '../../Redux/Slicers/AdminSlicer'
import { toast, ToastContainer } from 'react-toastify'

const Userboard = () => {
  const dispatch = useDispatch()
  const { UserList, loading, Error, Errormsg } = useSelector(state => state.Admin)

  useEffect(() => {
    dispatch(AdminAllUser());

    if (Error) {
      toast.error(Errormsg)
    }
    if (UserList) {
      toast.success('All Orders Fetched Successfully')
    }
  }, [dispatch, Error, Errormsg])

  return (
    <div className='w-full'>
      <ToastContainer />
      <div className="bg-blue-600 text-white py-4 px-6 mb-8">
        <h2 className="text-2xl font-semibold text-center">User Dashboard</h2>
      </div>
      <div>
        {
          loading ? <center><DNA
            visible={true}
            width="400"
            color="#4fa94d"
            ariaLabel="infinity-spin-loading"
          /></center> : <div className='w-full flex flex-col p-2'>
            {
              UserList.map((e, id) => <div key={id} className='border-4 rounded-lg shadow-2xl p-6 flex flex-col flex-wrap justify-between mt-6 relative overflow-clip'>
                <div className='text-wrap box-border w-full'>
                  <img className='w-44 h-44 rounded-full' src={e?.avatar?.url} alt="Profile" />
                  <span className='text-2xl max-sm:text-xl py-2 font-semibold text-pink-600'>{e?.firstname + " " + e?.lastname}</span>
                  <div className="text-xl max-sm:text-base font-semibold max-sm:font-light max-sm:flex-col max-sm:flex-wrap max-sm:items-center max-sm:justify-center">
                    <span className="text-pink-600">Candidate Id</span><span className="ml-8 text-blue-600">{e?._id}</span>
                  </div>
                  <div className="text-xl max-sm:text-base font-semibold max-sm:font-light max-sm:flex-col max-sm:flex-wrap max-sm:items-center max-sm:justify-center">
                    <span className="text-pink-600">Email</span><span className="ml-8 text-blue-600">{e?.email}</span>
                  </div>
                  <div className="text-xl max-sm:text-base font-semibold max-sm:font-light max-sm:flex-col max-sm:flex-wrap max-sm:items-center max-sm:justify-center">
                    <span className="text-pink-600">Role</span><span className="ml-8 text-blue-600 text-green-600">{e?.role}</span>
                  </div>
                  <div className="text-xl max-sm:text-base font-semibold max-sm:font-light max-sm:flex-col max-sm:flex-wrap max-sm:items-center max-sm:justify-center">
                    <span className="text-pink-600">Account Creation</span><span className="ml-8 text-blue-600">{new Date(e?.createdAt).toISOString().substr(0, 10)}</span>
                  </div>
                </div>
              </div>)
            }
          </div>
        }
      </div>
    </div>
  )
}

export default Userboard