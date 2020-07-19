import React from 'react'
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
import { getPacients, getDoctorsAdmin, getSpecialty } from '../../utils/endpoints';
import AdminCard from './partials/AdminCard';
import { BigLoader } from '../Loader';




const Psicologos = () => {

    const [pacientes, setPacientes] = React.useState<Array<any>>([]) 
    const [specialty, setSpecialty] = React.useState<Array<any>>([]) //Este trae todas las especialidades 
    const [lookFor, setLookFor] = React.useState<any>('') //Este indica cual es la que quiere el usuario
    const [psico, setPsico] = React.useState<Array<any>>([])
    const [psicoAll, setPsicoAll] = React.useState<any>([]) //Este siempre tiene todos para no tener que hace mil peticiones al backend 
    const [loading, setLoading] = React.useState(false)

    React.useEffect(() => {

        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }

        Axios.get(getDoctorsAdmin(), config)
            .then(response => {
                const data_role = response.data.data;

                setPsico(data_role);
                setPsicoAll(data_role);

            })
            .catch(e => {
                // Podemos mostrar los errores en la consola
            })
    }, [])

    React.useEffect(() => {
        setLoading(true)
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }
        Axios.get(getSpecialty, config)
            .then(response => {
                const data_role = response.data.data;

                setSpecialty(data_role);
                setLoading(false)

            })
            .catch(e => {
                // Podemos mostrar los errores en la consola
                setLoading(false)
            })
    }, [])

    const option = specialty.map((element: any) => (
        <option value={element._id}> {element.name} </option>)
    )

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!lookFor || lookFor === '') {
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
    }


    const psica = psico.length > 0 && !loading ? psico.map((doctor: any) => (
        <AdminCard
            firstName={doctor.first_name}
            lastName={doctor.last_name}
            username={doctor.username}
            avatar={doctor.avatar}
            slug={doctor.slug}
            specialities={doctor.speciality}
            disabled = {doctor.disabled}
        />
    )) : <div className="col-span-4 p-6">
            <p className="block w-full text-center font-bold text-xl text-gray-500">No hay psicologos para esta especialidad.</p>
        </div>

    return (
        <div className='relative flex flex-col'>
            <div className="flex justify-center my-8">
                <h1 className='text-center text-3xl'>Puede filtrar por especialidad si asi lo desea</h1>
            </div>

            <form method="POST" onSubmit={onSubmit}>

                <div className="flex justify-around mx-4 mt-4 mb-8 text-gray-800">

                    <div className="w-full flex flex-row items-center justify-center text-center px-6 h-12">
                        <select
                            className='flex-1 bg-white border-2 border-purple-600 rounded-l px-4 leading-tight focus:outline-none focus:border-purple-500 h-full'
                            onChange={e => setLookFor(e.target.value)}>

                            <option value="">Especialidades</option>
                            {option}

                        </select>

                        <button
                            className="flex-none shadow bg-purple-600 hover:bg-purple-500 hover:border-purple-500 focus:outline-none font-bold text-white px-6 rounded-r border-2 border-purple-600 h-full"
                            type="submit">
                            <SearchIcon />
                        </button>
                    </div>
                </div>

            </form>

            <hr></hr>

            {(loading || specialty.length <= 0) && <div className="col-span-4 p-6">
                <BigLoader />
            </div>}

            {!loading && <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8 px-6'>
                {psica}
            </div>}

        </div>
    )
};

export default Psicologos