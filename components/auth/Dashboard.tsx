import 'react';
import Link from 'next/link';

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

export default function Dashboard() {
    return (
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
    )

}