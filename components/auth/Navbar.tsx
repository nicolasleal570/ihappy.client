import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { authCheckState, logout } from '../../store/actions/authAction';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import SettingsIcon from '@material-ui/icons/Settings';
import HelpIcon from '@material-ui/icons/Help';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

const Navbar = () => {

    const { user } = useSelector((state: any) => state.auth)
    const dispatch = useDispatch();
    const router = useRouter();
    const [toggled, toggle] = useState(false)
    const [toggled1, toggle1] = useState(false)
    const [toggled2, toggle2] = useState(false)
    const [toggled3, toggle3] = useState(false)
    const [toggled4, toggle4] = useState(false)

    React.useEffect(() => {
        dispatch(authCheckState())
    }, [])

    const handleLogout = () => {
        dispatch(logout());
        router.push('/');
    }



    return (
        <nav>
            <div className='fixed w-1/6 bg-purple-700 h-screen'>
                
            
            <div className='mt-10'>
            <img src='/assets/icons/logo1.png' className='mx-auto'
            height='200' width='200'/>
                <div className='flex flex-col'>
                    
                        <h1 className='font-mono bold text-center text-white py-4 text-5xl'>iHappy</h1>
                        <h1 className='cursor-pointer text-white semi-bold hover:bg-purple-500 py-2 text-center text-lg'
                            onClick={() => toggle1(toggled1 => !toggled1)}><AccountCircleIcon style={{ fill: 'white', paddingRight: 2, marginRight: 10, fontSize: 30 }} />Account Overview {<ArrowDropDownIcon style={{paddingRight:2}}/>}</h1>
                        {toggled1 && <><ul>
                            <li className='text-center px-3 pl-5 py-1 cursor-pointer text-white text-md hover:bg-purple-500 hover:text-white'> <a href='/profile'>My Account</a></li>
                        </ul></>}
                    </div>
                    <div className=''>
                        <h1 className='cursor-pointer text-white semi-bold hover:bg-purple-500 py-2 text-center text-lg'
                            onClick={() => toggle2(toggled2 => !toggled2)}><AccountBalanceIcon style={{ fill: 'white', paddingRight: 2, marginRight: 10, fontSize: 28 }} />Billing information  {<ArrowDropDownIcon style={{paddingRight:2}}/>}</h1>
                        {toggled2 && <><ul>
                            <li className='text-center px-3 pl-5 py-1 cursor-pointer text-white text-md hover:bg-purple-500 hover:text-white'>My Payments</li>
                        </ul></>}
                    </div>
                    <div className='hover:bg-purple-500'>
                        <h1 className='cursor-pointer text-white semi-bold hover:bg-purple-500 py-2 text-center mr-32 pl-4 text-lg'
                            onClick={() => toggle3(toggled3 => !toggled3)}><SettingsIcon style={{ fill: 'white', paddingRight: 2, marginRight: 10, fontSize: 28 }} />Settings</h1>
                        {toggled3 && <><ul>
                            {/* <li className='text-center px-3 pl-10 py-1 cursor-pointer text-white text-md hover:bg-purple-500 hover:text-white'></li> */}
                        </ul></>}
                    </div>
                    <div className='hover:bg-purple-500'>
                        <h1 className='cursor-pointer text-white semi-bold hover:bg-purple-500 py-2 text-center mr-32 pr-3 text-lg'
                            onClick={() => toggle4(toggled4 => !toggled4)}><HelpIcon style={{ fill: 'white', paddingRight: 2, marginRight: 10, fontSize: 28 }} />Help</h1>
                        {toggled4 && <><ul>
                            {/* <li className='text-center px-3 pl-10 py-1 cursor-pointer text-white text-md hover:bg-purple-500 hover:text-white'>Contact</li> */}
                        </ul></>}
                    </div>
                </div>
            </div>
            {/* <div className="flex">
                <div className="fixed w-1/5 bg-purple-700 h-screen">
                    <div className="relative h-full flex-col pt-10 bg-purple-700">
                        <div className="mx-auto bg-blue-400 rounded-full overflow-hidden w-32 h-32">
                            <img className='w-full' src={user?.avatar || ''} alt='profile' />
                        </div>
                        <h1 className="font-bold capitalize text-xl text-center text-white pt-4">Welcome Back </h1>
                        <h1 className="font-base capitalize text-xl text-center text-white pb-4">{user?.first_name || user?.username}</h1>
                        <div className="w-full mb-2">
                            <button
                                onClick={handleLogout}
                                type="button"
                                className="text-sm py-2 px-3 bg-red-600 rounded text-white text-center mx-auto block"
                            >Cerrar Sesión</button>
                        </div>
                        <hr className='border-solid border-1' ></hr>
                        <Link href='/profile'>
                            <h2 className="font-semibold capitalize text-l text-center text-white py-4"><span className='cursor-pointer'>Account Overview</span></h2>
                        </Link>
                        <h2 className="font-semibold capitalize text-l text-center text-white py-4">My Payments</h2>
                        <h2 className="font-semibold capitalize text-l text-center text-white py-4">Make an Appointment</h2>
                        <div className='absolute bottom-0 left-0 px-6 py-4 w-full flex justify-between'>
                            <h4 className="font-bold capitalize text-l text-white">Help</h4>
                            <div className='flex'>
                                <img className='mr-3' src='/assets/icons/discord.png/' height='25' width='25' />
                                <img className='' src='/assets/icons/gmail.webp/' height='25' width='30' />
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}
            <div className="w-4/5 ml-20 bg-white">
                <div className='absolute top-0 right-0 mr-5 mt-5'>
                    <button onClick={() => toggle(toggled => !toggled)} className='block rounded-full overflow-hidden border-2 border-white focus:outline-none focus:border-purple-600'>
                        <img className='mx-auto object-cover' src='assets/icons/male_avatar.svg/' alt='profile' height="40" width="40" />
                    </button>
                    <div className='py-2 mt-2 bg-gray-400 rounded-lg shadow-xl'> {toggled && <> <a href='/account' className='block px-4 py-2 text-gray-800 hover:bg-purple-400 hover:text-white'>Account Overview</a>
                        <a href='#' className='block px-4 py-2 text-gray-800 hover:bg-purple-400 hover:text-white'>Support</a>
                        <a href='#' onClick={handleLogout} className='block px-4 py-2 text-gray-800 hover:bg-purple-400 hover:text-white cursor-pointer'>Log out</a>
                    </>}
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
