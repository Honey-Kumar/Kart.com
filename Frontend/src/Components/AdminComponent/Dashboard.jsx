import React, { useState } from 'react'
import { MdOutlineKeyboardArrowRight } from 'react-icons/md'
import { Link } from 'react-router-dom'
import { HashLink } from 'react-router-hash-link'
import GraphDashboard from './GraphDashboard'
import AdminProductcomponent from './AdminProductcomponent'
import Orderboard from './Orderboard'
import Userboard from './Userboard'

const Dashboard = () => {
    const [expression, setexpression] = useState('Dashboard');

    const Dashbordlist = [
        {
            name: 'Dashboard', link: '', action: () => {
                setexpression('Dashboard')
            }
        },
        {
            name: 'Products', link: '', action: () => {
                setexpression('Products')
            }
        },
        {
            name: 'Orders', link: '', action: () => {
                setexpression('Orders')
            }
        },
        {
            name: 'Users', link: '', action: () => {
                setexpression('Users')
            }
        }
    ]

    const renderContent = () => {
        switch (expression) {
            case 'Dashboard':
                return <GraphDashboard />;
            case 'Products':
                return <AdminProductcomponent />;
            case 'Orders':
                return <Orderboard />;
            case 'Users':
                return <Userboard />;
            default:
                return <GraphDashboard />;
        }
    };


    return (
        <>
            <div className='w-full flex flex-wrap max-sm:flex-col'>
                <div className='w-1/4 max-sm:w-full max-md:w-full flex flex-col gap-4 p-4 shadow-2xl'>
                    <div className='my-5'>
                        <Link to={'/'} className="flex font-bold items-center justify-center">
                            <span className="text-pink-600 text-4xl hover:scale-2.5 text-center">
                                Kart <span className="text-blue-600 text-4xl">.com</span>
                            </span>
                        </Link>
                        <p className='font-semibold text-center text-blue-600 mt-4'>A Platform For All Your Needs</p>
                    </div>
                    <div className='border-b-4 border-green-600 mb-4'>
                        <h2 className="text-2xl max-md:text-xl font-bold text-pink-600 m-2 p-4 text-center ">Admin Dashboard</h2>
                    </div>
                    {
                        Dashbordlist.map((e, id) => <HashLink key={id} to={e.link} onClick={() => e.action()} className='transition-all hover:border-4 rounded-lg hover:shadow-2xl hover:bg-blue-600 hover:text-white p-3 flex justify-between text-wrap'>
                            <span className='text-xl font-semibold'>{e.name}</span><MdOutlineKeyboardArrowRight size={30} />
                        </HashLink>)

                    }
                </div>
                <div className='w-3/4 max-sm:w-full max-md:w-full'>
                    {
                        renderContent()
                    }
                </div>
            </div>
        </>
    )
}

export default Dashboard
