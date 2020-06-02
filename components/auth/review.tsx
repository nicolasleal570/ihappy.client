import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from '../../store/actions/postAction';

const PsychologistHeader = () => (
    <div className=''>
        <div className="flex px-6 pt-4">
            <img src="/assets/icons/profile.svg" className="w-32" alt="Doctors" />
            <div className="flex-1 bg-gray-600 px-4">
                <h3 className="font-bold capitalize text-3xl">Dr Jose Silva</h3>
                <ul>
                    <li>
                        <p className="text-lg font-bold">Education</p>
                    </li>
                    <li>
                        <p>Item 1</p>
                    </li>
                    <li>
                        <p>Item 2</p>
                    </li>
                    <li>
                        <p>Item 3</p>
                    </li>
                </ul>

            </div>
        </div>
    </div>
);

export default function Reviews() {

    const dispatch = useDispatch();
    const { posts } = useSelector((state: any) => state.post);
    React.useEffect(() => {
        dispatch(fetchPosts())
    }, [])

    return (
        <div className="flex text-gray-800">
            <div className="fixed w-1/5 bg-purple-700 h-screen">
                <div className="relative flex-col pt-10 h-full">
                    <img className='mx-auto' src='assets/icons/male_avatar.svg/' alt='profile' height="150" width="150" />
                    <h1 className="font-bold capitalize text-xl text-center text-white py-8">WELCOME BACK!</h1>
                    <hr className='border-solid border-1' ></hr>
                    <h2 className="font-bold capitalize text-l text-center text-white py-6">ACCOUNT OVERVIEW</h2>
                    <h2 className="font-bold capitalize text-l text-center text-white py-6">MY PAYMENTS</h2>
                    <h2 className="font-bold capitalize text-l text-center text-white py-6">MAKE AN APPOINTMENT</h2>
                    <div className='w-full absolute bottom-0 h-10 px-4'>
                        <div className='flex justify-between'>
                            <h4 className="font-bold capitalize text-l text-white">Help</h4>
                            <div className='flex'>
                                <img className='mr-3' src='/assets/icons/discord.png/' height='25' width='25' />
                                <img src='/assets/icons/gmail.webp/' height='25' width='30' />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full flex">
                <div className="w-1/5"></div> {/* Sirve de relleno porque el sidebar es fixed (es como absoluto) */}
                <div className="w-4/5 bg-white">
                    <div className='relative h-screen flex flex-col'>
                        {/* Medico Bio */}
                        <PsychologistHeader />

                        <div className="bg-red-400 py-20 px-6">
                            POSTS EXAMPLE REDUX
                            <ul>
                                {posts.map((element: any) => (<li>{JSON.stringify(element)}</li>))}
                            </ul>
                        </div>

                        <h1 className="font-bold capitalize text-4xl py-4 px-6 tracking-wide border-b border-400-gray leading-none">Reseñas</h1>

                        {/* Comentarios */}
                        <div className='overflow-y-auto pl-6' style={{ height: '318px' }}>
                            <div className="border-b border-gray-300 flex p-2">
                                <img src="/assets/icons/profile.svg" alt="" className="w-16 h-16 mx-auto mr-2" />
                                <div>
                                    <h3 className="text-font text-xl font-bold">Nicolás Leal</h3>
                                    <p className="text-base">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatum voluptate omnis corporis quos aliquid deserunt in dicta iusto impedit voluptatem.</p>
                                </div>
                            </div>
                            <div className="border-b border-gray-300 flex p-2">
                                <img src="/assets/icons/profile.svg" alt="" className="w-16 h-16 mx-auto mr-2" />
                                <div>
                                    <h3 className="text-font text-xl font-bold">Nicolás Leal</h3>
                                    <p className="text-base">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatum voluptate omnis corporis quos aliquid deserunt in dicta iusto impedit voluptatem.</p>
                                </div>
                            </div>
                            <div className="border-b border-gray-300 flex p-2">
                                <img src="/assets/icons/profile.svg" alt="" className="w-16 h-16 mx-auto mr-2" />
                                <div>
                                    <h3 className="text-font text-xl font-bold">Nicolás Leal</h3>
                                    <p className="text-base">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatum voluptate omnis corporis quos aliquid deserunt in dicta iusto impedit voluptatem.</p>
                                </div>
                            </div>
                            <div className="border-b border-gray-300 flex p-2">
                                <img src="/assets/icons/profile.svg" alt="" className="w-16 h-16 mx-auto mr-2" />
                                <div>
                                    <h3 className="text-font text-xl font-bold">Nicolás Leal</h3>
                                    <p className="text-base">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatum voluptate omnis corporis quos aliquid deserunt in dicta iusto impedit voluptatem.</p>
                                </div>
                            </div>
                            <div className="border-b border-gray-300 flex p-2">
                                <img src="/assets/icons/profile.svg" alt="" className="w-16 h-16 mx-auto mr-2" />
                                <div>
                                    <h3 className="text-font text-xl font-bold">Nicolás Leal</h3>
                                    <p className="text-base">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatum voluptate omnis corporis quos aliquid deserunt in dicta iusto impedit voluptatem.</p>
                                </div>
                            </div>
                            <div className="border-b border-gray-300 flex p-2">
                                <img src="/assets/icons/profile.svg" alt="" className="w-16 h-16 mx-auto mr-2" />
                                <div>
                                    <h3 className="text-font text-xl font-bold">Nicolás Leal</h3>
                                    <p className="text-base">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatum voluptate omnis corporis quos aliquid deserunt in dicta iusto impedit voluptatem.</p>
                                </div>
                            </div>
                            <div className="border-b border-gray-300 flex p-2">
                                <img src="/assets/icons/profile.svg" alt="" className="w-16 h-16 mx-auto mr-2" />
                                <div>
                                    <h3 className="text-font text-xl font-bold">Nicolás Leal</h3>
                                    <p className="text-base">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatum voluptate omnis corporis quos aliquid deserunt in dicta iusto impedit voluptatem.</p>
                                </div>
                            </div>
                            <div className="border-b border-gray-300 flex p-2">
                                <img src="/assets/icons/profile.svg" alt="" className="w-16 h-16 mx-auto mr-2" />
                                <div>
                                    <h3 className="text-font text-xl font-bold">Nicolás Leal</h3>
                                    <p className="text-base">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatum voluptate omnis corporis quos aliquid deserunt in dicta iusto impedit voluptatem.</p>
                                </div>
                            </div>
                        </div>
                        <div className='absolute bottom-0 right-0 w-full border-t border-gray-400 bg-white flex px-6 py-4' style={{ minHeight: '46px' }}>
                            <textarea className="flex-1 inline-block p-2 transition duration-300 ease-in-out bg-transparent border-2 border-purple-600 hover:bg-transparent hover:border-purple-800 rounded"></textarea>
                            <button className="inline-block px-4 py-2 transition duration-300 ease-in-out bg-purple-600 text-white border-2 border-purple-600 hover:bg-purple-800 hover:border-purple-800 rounded cursor-pointer ml-2">Comentar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}