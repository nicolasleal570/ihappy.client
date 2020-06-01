import React from 'react';

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

export default function Reviews() {
    return (
        <div className="flex">
            <div className="w-1/5 bg-purple-700 h-screen">
                <div className="flex-col pt-10 bg-purple-700">
                    <img className='mx-auto' src='assets/icons/male_avatar.svg/' alt='profile' height="200" width="200" />
                    <h1 className="font-bold capitalize text-xl text-center text-white py-8">WELCOME BACK!</h1>
                    <hr className='border-solid border-1' ></hr>
                    <h2 className="font-bold capitalize text-l text-center text-white py-6">ACCOUNT OVERVIEW</h2>
                    <h2 className="font-bold capitalize text-l text-center text-white py-6">MY PAYMENTS</h2>
                    <h2 className="font-bold capitalize text-l text-center text-white py-6">MAKE AN APPOINTMENT</h2>
                    <div className='absolute bottom-0 h-10 pl-10'>
                        <div className='flex flex-auto'>
                            <h4 className="font-bold capitalize text-l text-white">Help</h4>
                            <div className='flex flex-align ml-40'>
                                <div className='flex content-around'>
                                    <img className='mr-3' src='/assets/icons/discord.png/' height='25' width='25' />
                                    <img src='/assets/icons/gmail.webp/' height='25' width='30' />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-4/5 bg-white h-screen">
                <div className='flex flex-col'>
                    <div className='container mx-auto bg-gray-500'>
                        <div className='flex flex-align mt-10'>
                            <Psychologists
                                name='Dr. Luis Silva'
                                imgUrl='/assets/icons/profile.svg'
                            />
                            <h1 className="font-bold capitalize text-xl text-left mr-64">Biografia</h1>
                            <div className='container mr-64 bg-gray-500'>
                            </div>
                        </div>
                    </div>
                    <div className='container bg-gray-400'>
                        <h1 className="font-bold capitalize text-xl mt-10 ml-10">Reseñas</h1>
                        <div className='container mx-auto mt-10 px-10'>
                            <div className='container border border-purple-400 rounded-lg bg-gray-300 h-64'>
                                {/* <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Delectus voluptatum aliquam excepturi accusantium at rerum quod quaerat, fugit aperiam deserunt sit. Tempora ipsam eaque commodi nostrum tempore, sapiente exercitationem dolor!
                                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptas maxime explicabo laborum ex dolor perspiciatis labore id voluptatem, fugiat illo aliquid magni deleniti! Nobis optio at explicabo aspernatur ut delectus.
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio et labore, impedit mollitia, neque quasi sit dolore delectus consectetur deserunt dolorem magnam ratione pariatur, excepturi voluptate obcaecati molestiae aperiam repellendus.
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis quod ex veniam rerum assumenda provident, asperiores recusandae nesciunt placeat expedita dolorem aspernatur nihil quibusdam velit, qui corporis hic beatae perspiciatis.
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim dolorem quidem nisi facilis nostrum ducimus aspernatur fugit aut, delectus est rem id deserunt ullam amet, consectetur modi veritatis numquam ipsum?
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aliquid ipsum iusto tempora, inventore repellendus eum suscipit, quam quisquam maxime neque velit magni autem sequi. Asperiores, officiis excepturi! Saepe, inventore quae?
                                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quisquam laudantium consequuntur blanditiis nobis. Necessitatibus nulla facere, corporis provident magnam perferendis molestias nemo earum aspernatur eius architecto hic sapiente placeat deleniti.
                                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Debitis distinctio, dolore est fuga expedita adipisci quasi voluptatum ducimus reiciendis architecto? Temporibus alias cum rerum quas, ipsa sit a aliquid voluptas
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam eveniet vero maiores aspernatur necessitatibus, aliquid sapiente eum vitae. Officiis, pariatur vero facere harum iure rem similique quidem doloribus ratione voluptatum.
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam ratione, voluptate similique labore quisquam dolore voluptatem molestias doloremque sunt consequatur, laudantium voluptatum cupiditate iusto fuga laborum dolorem possimus dignissimos vero?
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad, quas ea. Quidem praesentium, laudantium amet magni optio excepturi, aliquam distinctio non magnam repudiandae at facere adipisci odit sit voluptate soluta.
                                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iusto cupiditate laboriosam illo quasi accusamus vel ipsam laudantium sapiente voluptatum. Dolorum dolores tempora deserunt itaque voluptas natus consequuntur veniam. Incidunt, ad!
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem totam at sapiente temporibus eos similique quisquam ipsa doloremque odit, error dolorem commodi rerum ullam reprehenderit, veniam accusantium hic architecto culpa.
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae quos necessitatibus tempore laboriosam earum aspernatur eaque soluta libero ex debitis veritatis eius, dolores neque rem, quod exercitationem, id aut? Necessitatibus?
                                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ducimus inventore iste consectetur esse veritatis labore ab delectus eligendi, laudantium quasi architecto et impedit minima illo quod dolor mollitia deleniti. Consequatur.
                                </p> */}
                            </div>
                        </div>
                        <div className='flex'>
                            <div className='flex py-10 px-5'>
                                <input size={100} className="inline-block ml-5 pr-5 py-2 h-10 transition duration-300 ease-in-out bg-transparent border-2 border-purple-600 hover:bg-transparent hover:border-purple-800 rounded "></input>
                                <div className='ml-5'>
                                <span className="inline-block px-6 py-2 transition duration-300 ease-in-out bg-transparent border-2 border-purple-600 hover:bg-purple-800 hover:border-purple-800 rounded cursor-pointer ">Comenta</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}