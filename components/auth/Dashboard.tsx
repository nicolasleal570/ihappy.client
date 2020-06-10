import React from 'react';
import Link from 'next/link';
import Axios from 'axios';
import { getDoctors } from '../../utils/endpoints';
import DoctorCard from './partials/DoctorCard';
import { BigLoader } from '../Loader';

export default function Dashboard() {
    const [loading, setLoading] = React.useState(false);
    const [doctors, setDoctors] = React.useState<Array<any>>([]);

    React.useEffect(() => {
        const config = {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        }
        setLoading(true);

        const getDoctorsData = async () => {
            const res = await Axios.get(getDoctors(4), config);
            setDoctors(res.data.data);
            setLoading(false);
        }

        getDoctorsData();
        console.log(doctors);
    }, []);

    return (
        <div className='flex flex-column bg-gray-200 h-full text-gray-800'>
            <div className='w-full px-6'>
                <h1 className="font-semibold capitalize text-xl text-left py-6">Online Psychologists</h1>

                <div className='w-full grid grid-cols-4 gap-4'>

                    {loading && <div className="relative w-full h-32 bg-white rounded col-span-4 flex items-center justify-center">
                        <BigLoader />
                    </div>}

                    {!loading && doctors.map((doctor: any) => (
                        <DoctorCard
                            key={doctor._id}
                            firstName={doctor.first_name}
                            lastName={doctor.last_name}
                            username={doctor.username}
                            avatar={doctor.avatar}
                            slug={doctor.slug}
                            role={doctor.role}
                            specialities={doctor.speciality}
                        />
                    ))}
                </div>

                <h1 className="font-semibold capitalize text-xl text-left py-6">Charts</h1>
                <div className='flex'>
                    <img src='/assets/icons/chart.png' className='w-70 h-40' />
                    <img src='/assets/icons/chart.png' className='w-70 h-40 pl-10' />
                    <img src='/assets/icons/chart.png' className='w-70 h-40' />
                </div>
            </div>
        </div>
    )

}