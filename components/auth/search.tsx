import React from 'react';
import { getSpecialty, getUsers, getDoctors } from '../../utils/endpoints';
import { useDispatch, useSelector } from 'react-redux';
import Axios from 'axios';
import DoctorCard from './partials/DoctorCard';
import SearchIcon from '@material-ui/icons/Search';
import { BigLoader } from '../Loader';

function search() {
  const [specialty, setSpecialty] = React.useState<Array<any>>([]); //Este trae todas las especialidades
  const [lookFor, setLookFor] = React.useState<any>(''); //Este indica cual es la que quiere el usuario
  const [psico, setPsico] = React.useState<Array<any>>([]); //Este muestra los que quiere el usuario
  const [psicoAll, setPsicoAll] = React.useState<any>([]); //Este siempre tiene todos para no tener que hace mil peticiones al backend
  const [loadingSpecialities, setLoadingSpecialities] = React.useState(false);
  const [loadingPsico, setLoadingPsico] = React.useState(false);

  React.useEffect(() => {
    setLoadingSpecialities(true);
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    };
    Axios.get(getSpecialty, config)
      .then((response) => {
        const data_role = response.data.data;

        setSpecialty(data_role);
        setLoadingSpecialities(false);
      })
      .catch((e) => {
        // Podemos mostrar los errores en la consola
        setLoadingSpecialities(false);
      });
  }, []);

  const getPsicologosFromAPI = () => {
    setLoadingPsico(true);
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    };

    Axios.get(getDoctors(100), config)
      .then((response) => {
        const data_role = response.data.data;

        setPsico(data_role);
        setPsicoAll(data_role);
        setLoadingPsico(false);
      })
      .catch((e) => {
        setLoadingPsico(false);
        // Podemos mostrar los errores en la consola
      });
  };

  React.useEffect(() => {
    getPsicologosFromAPI();
  }, []);

  const option = specialty.map((element: any) => (
    <option value={element._id} key={element._id}>
      {' '}
      {element.name}{' '}
    </option>
  ));

  const psica =
    psico.length > 0 ? (
      psico.map((doctor: any) => (
        <DoctorCard
          key={doctor._id}
          firstName={doctor.first_name}
          lastName={doctor.last_name}
          username={doctor.username}
          avatar={doctor.avatar}
          slug={doctor.slug}
          specialities={doctor.speciality}
        />
      ))
    ) : (
      <div className="col-span-4 p-6">
        <p className="block w-full text-center font-bold text-xl text-gray-500">
          No hay psicologos para esta especialidad.
        </p>
      </div>
    );

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (lookFor === '') {
      getPsicologosFromAPI();
      return;
    }
    var temp: Array<any> = [];

    for (let index = 0; index < psicoAll.length; index++) {
      if (psicoAll[index].role?.identification == 'psicologo') {
        for (let ind = 0; ind < psicoAll[index].speciality.length; ind++) {
          if (psicoAll[index].speciality[ind]._id == lookFor) {
            temp[temp.length] = psicoAll[index];
          }
        }
      }
    }

    setPsico(temp);
  };

  return (
    <div className="relative flex flex-col">
      <div className="flex justify-center my-8">
        <h1 className="text-center text-3xl">
          ¿Que Tipo de Psicologo Estas Buscando?
        </h1>
      </div>

      <form method="POST" onSubmit={onSubmit}>
        <div className="flex justify-around mt-4 mb-8 text-gray-800">
          <div className="w-full flex flex-row items-center justify-center text-center px-6 h-12">
            {!loadingSpecialities ? (
              <>
                <select
                  className="flex-1 bg-white border-2 border-purple-600 rounded-l px-4 leading-tight focus:outline-none focus:border-purple-500 h-full"
                  onChange={(e) => setLookFor(e.target.value)}
                >
                  <option value="">Especialidades</option>
                  {option}
                </select>

                <button
                  className="flex-none shadow bg-purple-600 hover:bg-purple-500 hover:border-purple-500 focus:outline-none font-bold text-white px-12 rounded-r border-2 border-purple-600 h-full"
                  type="submit"
                >
                  <SearchIcon />
                </button>
              </>
            ) : (
              <BigLoader />
            )}
          </div>
        </div>
      </form>

      <hr></hr>

      {!loadingSpecialities && !loadingPsico ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8 px-6">
          {psica}
        </div>
      ) : (
        <BigLoader />
      )}
    </div>
  );
}

export default search;
