import React from 'react'
import {useSelector} from 'react-redux';
import Link from 'next/Link';

const Navbar = () => {
    const {user} = useSelector((state: any) => state.auth)
    
    return (
        <nav>
<div className="flex">
            <div className="fixed w-1/5 bg-purple-700 h-screen">
                <div className="flex-col pt-10 bg-purple-700">
                    <img className='mx-auto' src={user.avatar} alt='profile' height="200" width="200" />
                    <h1 className="font-bold capitalize text-xl text-center text-white pt-4">Welcome Back</h1>
                    <h1 className="font-bold capitalize text-xl text-center text-white pb-4">{user.first_name}</h1>
                    <hr className='border-solid border-1' ></hr>
                    <Link href='/profile'>
                    <h2 className="font-semibold capitalize text-l text-center text-white py-4"><span className='cursor-pointer'>Account Overview</span></h2>
                    </Link>
                    <h2 className="font-semibold capitalize text-l text-center text-white py-4">My Payments</h2>
                    <h2 className="font-semibold capitalize text-l text-center text-white py-4">Make an Appointment</h2>
                    <div className='absolute bottom-0 h-10 pl-10'>
                        <div className='flex flex-auto'>
                            <h4 className="font-bold capitalize text-l text-white">Help</h4>
                            <div className='flex flex-align ml-40'>
                                <div className='flex content-around'>
                                    <img className='mr-3' src='/assets/icons/discord.png/' height='25' width='25' />
                                    <img className='mr-32' src='/assets/icons/gmail.webp/' height='25' width='30' />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <div className="w-4/5 ml-5 bg-white h-screen"> */}
                {/* <div className='flex flex-column'>
                    <div className='container mx-auto'>
                        <div className='flex flex-align mt-10'>
                            <h1 className="font-bold capitalize text-xl text-left pl-6 py-2">Connect: </h1>
                            <input className="inline-block ml-5 pr-5 py-2 transition duration-300 ease-in-out bg-transparent border-2 border-purple-600 hover:bg-transparent hover:border-purple-800 rounded "></input>
                            <img src='/assets/icons/lupa.png/' className='w-8 h-8 ml-5 mt-2 cursor-pointer' />
                        </div>
                        <div className='container mx-auto mt-10 ml-5'>
                            <h1 className="font-bold capitalize text-xl text-left ml-2 py-8">Online Psychologists</h1>
                            <div className='flex'>
                                <Psychologists
                                    name='Dr. Luis Silva'
                                    imgUrl='/assets/icons/profile.svg'
                                />
                                <Psychologists
                                    name='Dr. Luis Silva'
                                    imgUrl='/assets/icons/profile.svg'
                                />
                                <Psychologists
                                    name='Dr. Luis Silva'
                                    imgUrl='/assets/icons/profile.svg'
                                />
                                <Psychologists
                                    name='Dr. Luis Silva'
                                    imgUrl='/assets/icons/profile.svg'
                                />
                            </div>
                            <h1 className="font-bold capitalize text-xl text-left ml-2 py-8" >Charts</h1>
                            <div className='flex'>
                                <img src='/assets/icons/chart.png' className='w-70 h-40' />
                                <img src='/assets/icons/chart.png' className='w-70 h-40 pl-10' />
                                <img src='/assets/icons/chart.png' className='w-70 h-40' />
                            </div>
                        </div>
                    </div>
                </div> */}
            {/* </div> */}
            {/* <div className="w-1/5"> */}
                {/* <div className='bg-gray-300 mt-10 mr-5'>
                    <h1 className="font-bold capitalize text-xl text-center ">Activities of the Week</h1>
                    <hr className='border border-solid'></hr>
                    <h2 className="font-bold capitalize text-xl text-left ml-5 py-5">Read</h2>
                    <img src='/assets/img/tasty_pride.jpg' className='w-150 pd-5' />
                    <h2 className="font-bold capitalize text-xl text-left ml-5">Excercise</h2>
                    <div className="bg-blue-400">
                        <h2 className="font-bold capitalize antialiased text-xl text-left ml-10 pl-10">WITH</h2>
                    </div>
                    <img src='/assets/img/runtastic.png' />
                    <h2 className="font-bold capitalize antialiased text-xl text-left ml-10 pt-2">Play</h2>
                <img src='/assets/img/cod.jpg' className='w-25 h-40' /> */}
                {/* </div> */}


            {/* </div> */}
        </div>
        </nav>
    )
}

export default Navbar
