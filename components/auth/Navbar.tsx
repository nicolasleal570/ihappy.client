import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { logout } from '../../store/actions/authAction';

const Navbar = () => {

    const { user } = useSelector((state: any) => state.auth)
    const dispatch = useDispatch();
    const router = useRouter();

    const handleLogout = () => {
        router.push('/');
        dispatch(logout());
    }

    return (
        <nav className="relative">
            {/* <div className="bg-red-500">
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aspernatur repellat quaerat odit laboriosam sunt eaque obcaecati ratione! Sequi, quaerat? Temporibus!</p>
            </div> */}
            <div className="relative h-full flex-col pt-4 bg-purple-700 overflow-y-auto">
                <div className="flex justify-center items-center mx-auto bg-purple-600 rounded-full overflow-hidden w-24 h-24">
                    <img className='w-full h-full object-cover' src={user?.avatar} alt='profile' />
                </div>
                <h1 className="font-bold capitalize text-xl text-center text-white pt-4">Welcome Back</h1>
                <h1 className="font-base capitalize text-xl text-center text-white pb-4">{user?.first_name} {user?.last_name}</h1>

                {/* Btn logout */}
                <div className="w-full mb-4">
                    <button
                        onClick={handleLogout}
                        type="button"
                        className="text-sm py-2 px-3 bg-red-600 rounded text-white text-center mx-auto block cursor-pointer"
                    >Cerrar Sesión</button>
                </div>

                <hr className='border-solid border-1' ></hr>

                {/* Menu items */}
                <div className="">
                    <Link href='/dashboard'>
                        <h2 className="font-semibold capitalize text-l text-center text-white py-4"><span className='cursor-pointer'>Dashboard</span></h2>
                    </Link>

                    <Link href='/profile'>
                        <h2 className="font-semibold capitalize text-l text-center text-white py-4"><span className='cursor-pointer'>Account Overview</span></h2>
                    </Link>
                    <h2 className="font-semibold capitalize text-l text-center text-white py-4">My Payments</h2>
                    <h2 className="font-semibold capitalize text-l text-center text-white py-4">Make an Appointment</h2>
                </div>
                <div className="px-6 py-2 w-full flex justify-between items-center">
                    <h4 className="font-bold capitalize text-l text-white">Help</h4>
                    <div className='flex'>
                        <div className="w-8 h-8 mr-3 overflow-hidden">
                            <img className='w-auto h-full' src='/assets/icons/discord.png/' />
                        </div>
                        <div className="w-8 h-8 overflow-hidden">
                            <img className='w-full' src='/assets/icons/gmail.webp/' />
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
