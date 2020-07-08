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
    setLoading(true);

    const config = {
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token')
        }
    }

    const getDoctorsData = async () => {
      const res = await Axios.get(getDoctors(4), config);
      console.log(res.data);
      
      setDoctors(res.data.data);
      setLoading(false);
    };

    getDoctorsData();
  }, []);

  return (
    <div className="flex flex-column bg-gray-200 text-gray-800 pb-6 min-h-screen">
      <div className="w-full px-6">
        <h1 className="font-semibold capitalize text-xl text-left py-6">
          Online Psychologists
        </h1>

        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {loading && (
            <div className="relative w-full h-32 bg-white rounded col-span-4 flex items-center justify-center">
              <BigLoader />
            </div>
          )}

          {!loading &&
            doctors.map((doctor: any) => (
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
      </div>
    </div>
  );
}
