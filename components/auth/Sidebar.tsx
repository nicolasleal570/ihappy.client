import { useState, useEffect } from 'react';
import Link from 'next/Link';
import { authCheckState, logout } from '../../store/actions/authAction';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
interface Psychologists {
    name: String;
    imgUrl: string;
}

const Psychologists = ({ name, imgUrl }: Psychologists) => (
    <div className='container'>
        <div className="flex flex-col">
            <img src={imgUrl} className="w-48 ml-10" alt="Doctors" />
            <h3 className="font-bold capitalize ml-20">{name}</h3>
        </div>
    </div>
);



export default function Sidebar() {
    const [toggled, toggle] = useState(false)


    const { user } = useSelector((state: any) => state.auth)
    const dispatch = useDispatch();
    const router = useRouter();

    useEffect(() => {
        dispatch(authCheckState())
    }, [])

    const handleLogout = () => {
        dispatch(logout());
        router.push('/');
    }

    return (
        <div className="flex">
            <div className="w-1/5">
                {/* <div className="flex-col pt-10 bg-purple-700">
                    <img className='mx-auto' src='assets/icons/male_avatar.svg/' alt='profile' height="200" width="200" />
                    <h1 className="font-bold capitalize text-xl text-center text-white pt-8">Welcome Back</h1>
                    <h1 className="font-bold capitalize text-xl text-center text-white pb-4">User</h1>
                    <hr className='border-solid border-1' ></hr>
                    <h2 className="font-semibold capitalize text-l text-center text-white py-4">Account Overview</h2>
                    <h2 className="font-semibold capitalize text-l text-center text-white py-4">My Payments</h2>
                    <h2 className="font-semibold capitalize text-l text-center text-white py-4">Make an Appointment</h2>
                    <div className='absolute bottom-0 h-10 pl-10'>
                        <div className='flex flex-auto'>
                            <h4 className="font-bold capitalize text-l text-white">Help</h4>
                            <div className='flex flex-align ml-24'>
                                <div className='flex content-around'>
                                    <img className='mr-2' src='/assets/icons/discord.png/' height='25' width='25' />
                                    <img className='mr-32' src='/assets/icons/gmail.webp/' height='25' width='30' />
                                </div>
                            </div>
                        </div>
                    </div>
                </div> */}
            </div>
            <div className="w-4/5 ml-20 bg-white">
                {/* <div className='absolute top-0 right-0 mr-5 mt-5'>
                    <button onClick={() => toggle(toggled => !toggled)} className='block rounded-full overflow-hidden border-2 border-white focus:outline-none focus:border-purple-600'>
                        <img className='mx-auto object-cover' src='assets/icons/male_avatar.svg/' alt='profile' height="40" width="40" />
                    </button>
                    <div className='py-2 mt-2 bg-gray-400 rounded-lg shadow-xl'> {toggled && <> <a href='#' className='block px-4 py-2 text-gray-800 hover:bg-purple-400 hover:text-white'>Account Overview</a>
                        <a href='#' className='block px-4 py-2 text-gray-800 hover:bg-purple-400 hover:text-white'>Support</a>
                        <a href='#' onClick={handleLogout} className='block px-4 py-2 text-gray-800 hover:bg-purple-400 hover:text-white cursor-pointer'>Log out</a>
                    </>}
                    </div>
                </div> */}
                <div className='flex flex-column'>
                    <div className='container mx-auto'>
                        <div className='flex flex-align mt-10'>
                            <h1 className="font-bold capitalize text-xl text-left pl-6 py-2">Connect: </h1>
                            <input className="inline-block ml-5 pr-5 py-2 transition duration-300 ease-in-out bg-transparent border-2 border-purple-600 hover:bg-transparent hover:border-purple-800 rounded "></input>
                            <img src='/assets/icons/lupa.png/' className='w-8 h-8 ml-5 mt-2 cursor-pointer' />
                        </div>
                        <div className='container mx-auto mt-10 ml-5'>
                            <Link href='/reviews'>
                                <h1 className="font-bold capitalize text-xl text-left ml-2 py-8">Online Psychologists</h1>
                            </Link>
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
                </div>
            </div>
            <div className="w-1/5">
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


            </div>
        </div>
    )

}