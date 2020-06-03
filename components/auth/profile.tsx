import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { updateUser } from '../../store/actions/authAction'
import { profile, avatar, getUsers } from '../../utils/endpoints';

export default function Profile() {
    const [equipo, setEquipo] = React.useState(null)
    const [nombre, setNombre] = React.useState('')
    const [apellido, setApellido] = React.useState('')
    const [cedula, setCedula] = React.useState('')
    const [direccion, setDireccion] = React.useState('')
    const [biografia, setBiografia] = React.useState('')
    const [archivo, setArchivo] = React.useState<File>()
    const { user } = useSelector((state: any) => state.auth)

    useEffect(() => {
        obtenerDatos()
        setNombre(user?.first_name)
        setApellido(user?.last_name)
        setCedula(user?.cedula)
        setDireccion(user?.address)
        setBiografia(user?.bio)
        setArchivo(user?.avatar)
    }, [])

    const dispatch = useDispatch();

    const enviarDatos = async () => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }
        axios.put(profile, {
            'first_name': nombre,
            'last_name': apellido,
            'cedula': cedula,
            'address': direccion,
            'bio': biografia

        }, config
        )
            .then((res) => {
                console.log(res.data);
                dispatch(updateUser(res.data.data))
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const enviarFoto = async (formData: any) => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }
        axios.put(avatar, formData, config
        )
            .then((res) => {
                console.log(res.data);
                dispatch(updateUser(res.data.data))
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const obtenerDatos = async () => {
        const res = await axios.get(getUsers, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        })
        console.log(res)
        const userData = await res.data.data
        console.log(userData)
    }

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        enviarDatos();

    }

    const onHandle = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let formdata = new FormData()
        formdata.append('image', archivo as any)
        enviarFoto(formdata);
    }

    return (
        <div className='flex bg-gray-300'>
            <div className='w-1/5'>
            </div>
            <div className='flex w-5/5 ml-20 mt-10'>
                <form method="PUT" onSubmit={onSubmit} className='ml-10 mt-5'>
                    <h1 className="font-bold capitalize text-xl text-center py-4">Account Overview</h1>
                    <div className='flex'>
                        <div className=''>
                            <div className="w-full py-1 md:w-1/2 px-2 mb-6 md:mb-0">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
                                    First Name </label>
                                <input id='Nombre' onChange={e => setNombre(e.target.value)} value={nombre} size={50} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" type="text" />
                            </div>
                            <div className="w-full py-1 md:w-1/2 px-2">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                                    Last Name </label>
                                <input id='Apellido' onChange={e => setApellido(e.target.value)} value={apellido} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text" placeholder={apellido} />
                            </div>
                            <div className="w-full py-1 md:w-1/2 px-2 mb-6 md:mb-0">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-cedula">
                                    Cedula </label>
                                <input id='cedula' onChange={e => setCedula(e.target.value)} value={cedula} size={20} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" type="number" placeholder={cedula} />
                            </div>
                            {/* <div className="w-full py-1 md:w-1/2 px-2 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-cedula">
                                Carga tu avatar </label>
                            <input id='avatar' onChange={e => setArchivo(e.target.files![0])} size={20} className=""  type="file" />
                        </div> */}
                            <div className="w-full py-1 md:w-1/2 px-2 mb-6 md:mb-0">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-cedula">
                                    Direccion </label>
                                {/* <input id='direccion' onChange={e => setDireccion(e.target.value)} value={direccion} size={20} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 mb-3 px-2 leading-tight focus:outline-none focus:bg-white"  type="text" placeholder={direccion} /> */}
                                <textarea id='direccion' onChange={e => setDireccion(e.target.value)} value={direccion} className="flex inline-block p-2 transition h-50 bg-gray-200 h-40 ease-in-out bg-transparent border-2 border-purple-600 hover:bg-transparent hover:border-purple-800 rounded" placeholder={direccion}></textarea>
                            </div>
                            {/* <div className="ml-2 mr-56 py-1">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-cedula">Role</label>
                            <select className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
                                <option>Elige</option>
                                {
                                localStorage.getItem('role')
                                }
                            <option></option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"></div>
                        </div> */}
                            {/* <div className="ml-2 mr-56 py-1">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-cedula">Especialidad</label>
                            <select className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
                                <option>Elige</option>
                                <option></option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"></div>
                        </div> */}
                        </div>
                        <div className="w-full md:w-1/2 py-3 px-2 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-bio">
                                Biografia </label>
                            <textarea id='Biografia' onChange={e => setBiografia(e.target.value)} value={biografia} className="flex inline-block p-2 transition h-full ease-in-out bg-transparent border-2 border-purple-600 hover:bg-transparent hover:border-purple-800 rounded" placeholder={biografia}></textarea>
                        </div>

                    </div>
                    <div className='mt-10 ml-64'>
                        <button type='submit' className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-full">Guardar</button>
                    </div>
                </form>
                <div className='mt-40'>
                    <form encType='multipart/form-data' onSubmit={onHandle} method="PUT">
                        <div className="w-full py-1 md:w-1/2 px-2 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-imagen">
                                Carga tu avatar </label>
                            <input id='image' onChange={e => setArchivo(e.target.files![0])} size={20} className="" type="file" />
                        </div>
                        <button type='submit' className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 mt-2 ml-2 px-4 rounded-full">Guardar foto</button>
                    </form>
                </div>
            </div>
        </div>


    )
}
