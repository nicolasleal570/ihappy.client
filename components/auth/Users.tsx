import React from 'react';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import Axios from 'axios';
import SettingsIcon from '@material-ui/icons/Settings';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import HelpIcon from '@material-ui/icons/Help';
import SidebarLink from './partials/SidebarLink';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import DashboardIcon from '@material-ui/icons/Dashboard';
import SearchIcon from '@material-ui/icons/Search';
import ForumIcon from '@material-ui/icons/Forum';
import Link from 'next/link';
import { Divider } from '@material-ui/core';
import { getPacients, getDoctors, getSpecialty } from '../../utils/endpoints';
import AdminCard from './partials/AdminCard';
import { BigLoader } from '../Loader';

const Users = () => {
  const [pacientes, setPacientes] = React.useState<Array<any>>([]);
  const [specialty, setSpecialty] = React.useState<Array<any>>([]); //Este trae todas las especialidades
  const [lookFor, setLookFor] = React.useState<any>(''); //Este indica cual es la que quiere el usuario
  const [psico, setPsico] = React.useState<Array<any>>([]);
  const [psicoAll, setPsicoAll] = React.useState<any>([]); //Este siempre tiene todos para no tener que hace mil peticiones al backend
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    };

    Axios.get(getPacients, config)
      .then((response) => {
        const data_role = response.data.data;

        console.log(data_role);
        setPsico(data_role);
        setPsicoAll(data_role);
      })
      .catch((e) => {
        // Podemos mostrar los errores en la consola
        console.log(e);
      });
  }, []);

  React.useEffect(() => {
    setLoading(true);
    Axios.get(getSpecialty)
      .then((response) => {
        const data_role = response.data.data;

        setSpecialty(data_role);
        setLoading(false);
      })
      .catch((e) => {
        // Podemos mostrar los errores en la consola
        console.log(e);
        setLoading(false);
      });
  }, []);

  const psica =
    psico.length > 0 && !loading ? (
      psico.map((doctor: any) => (
        <AdminCard
          firstName={doctor.first_name}
          lastName={doctor.last_name}
          username={doctor.username}
          avatar={doctor.avatar}
          slug={doctor.slug}
          specialities={doctor.speciality}
          disabled={doctor.disabled}
        />
      ))
    ) : (
      <div className="col-span-4 p-6">
        <p className="block w-full text-center font-bold text-xl text-gray-500">
          No hay psicologos para esta especialidad.
        </p>
      </div>
    );

  return (
    <div className="relative flex flex-col">
      <hr></hr>

      {(loading || specialty.length <= 0) && (
        <div className="col-span-4 p-6">
          <BigLoader />
        </div>
      )}

      {!loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8 px-6">{psica}</div>
      )}
    </div>
  );
};

export default Users;

