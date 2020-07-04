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
    const [sendingPhoto, setSendingPhoto] = React.useState(false)
    const [sendingInfo, setSendingInfo] = React.useState(false)

    const { user, loading, error } = useSelector((state: any) => state.auth)

    useEffect(() => {
        // obtenerDatos()
        setNombre(user?.first_name)
        setApellido(user?.last_name)
        setCedula(user?.cedula)
        setDireccion(user?.address)
        setBiografia(user?.bio)
        setArchivo(user?.avatar)
    }, [user])

    const dispatch = useDispatch();

    const enviarDatos = async () => {
        const config = {
            withCredentials: true
        }
        setSendingInfo(true);
        axios.put(profile, {
            'first_name': nombre,
            'last_name': apellido,
            'cedula': cedula,
            'address': direccion,
            'bio': biografia

        }, config).then((res) => {

            console.log(res.data);
            dispatch(updateUser(res.data.data))
            if (!loading) {
                setSendingInfo(false);
            }

        }).catch((err) => {

            console.log(err);
            setSendingInfo(false);

        })
    }

    const enviarFoto = async (formData: any) => {
        const config = {
            withCredentials: true
        }
        setSendingPhoto(true);
        axios.put(avatar, formData, config
        )
            .then((res) => {
                console.log(res.data);
                dispatch(updateUser(res.data.data))
                setArchivo(undefined);
                setSendingPhoto(false);
            })
            .catch((err) => {
                console.log(err);
                setSendingPhoto(false);
            })
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
        <div className='flex bg-cover bg-top bg-no-repeat h-screen' style={{ backgroundImage: `url('https://res.cloudinary.com/deekenjr3/image/upload/v1593848152/assets/chill2_pgwlqs.png')` }}>
            <div className='w-1/5'>
            </div>
            <div className='w-5/5 mr-64'>
                <form method="PUT" onSubmit={onSubmit} className='mt-24'>
                    <div className='flex'>
                        <div className=''>
                            <div className="w-full py-1 md:w-1/2 px-2 mb-6 md:mb-0">
                                <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="grid-first-name">
                                    First Name </label>
                                <input id='Nombre' onChange={e => setNombre(e.target.value)} value={nombre} size={80} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" type="text" />
                            </div>
                            <div className="w-full py-1 md:w-1/2 px-2">
                                <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="grid-last-name">
                                    Last Name </label>
                                <input id='Apellido' onChange={e => setApellido(e.target.value)} value={apellido} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text" placeholder={apellido} />
                            </div>
                            <div className="w-full py-1 md:w-1/2 px-2 mb-6 md:mb-0">
                                <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="grid-first-cedula">
                                    Cedula </label>
                                <input id='cedula' onChange={e => setCedula(e.target.value)} value={cedula} size={20} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" type="number" placeholder={cedula} />
                            </div>
                            {/* <div className="w-full py-1 md:w-1/2 px-2 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-cedula">
                            Carga tu avatar </label>
                        <input id='avatar' onChange={e => setArchivo(e.target.files![0])} size={20} className=""  type="file" />
                    </div> */}
                            <div className="w-full py-1 md:w-1/2 px-2 mb-6 md:mb-0">
                                <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="grid-first-cedula">
                                    Direccion </label>
                                {/* <input id='direccion' onChange={e => setDireccion(e.target.value)} value={direccion} size={20} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 mb-3 px-2 leading-tight focus:outline-none focus:bg-white"  type="text" placeholder={direccion} /> */}
                                <textarea id='direccion' onChange={e => setDireccion(e.target.value)} value={direccion} className="appearance-none block w-full h-32 bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" placeholder={direccion}></textarea>
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
                            <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="grid-first-bio">
                                Biografia </label>
                            <textarea id='Biografia' onChange={e => setBiografia(e.target.value)} value={biografia} className="appearance-none block w-full h-64 bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" placeholder={biografia}></textarea>
                            <button type='submit'
                                className={`
                                        inline-block px-6 py-2 transition duration-300 ease-in-out rounded cursor-pointer mt-4 
                                        ${sendingInfo ? 'border-2 border-gray-400 bg-gray-400 text-gray-600 cursor-not-allowed'
                                        : 'border-2 border-purple-600 hover:bg-purple-800 hover:border-purple-800 bg-purple-600 text-white cursor-pointer'}
                            `}
                                disabled={sendingInfo}
                            >Guardar Datos</button>
                        </div>
                    </div>
                </form>
                <div className=''>
                    <form encType='multipart/form-data' onSubmit={onHandle} method="PUT">
                        <div className="w-full py-1 md:w-1/2 px-2 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="grid-first-imagen">
                                Carga tu avatar </label>
                            <input id='image' onChange={e => setArchivo(e.target.files![0])} size={20} className="" type="file" />
                        </div>
                        <button type='submit' className={
                            `
                            inline-block px-3 py-1 ml-2 transition duration-300 ease-in-out rounded cursor-pointer text-sm mt-4
                            ${sendingPhoto ? 'border-2 border-gray-400 bg-gray-400 text-gray-600 cursor-not-allowed'
                                : 'border-2 border-purple-600 hover:bg-purple-800 hover:border-purple-800 bg-purple-600 text-white cursor-pointer'}
                            `}
                            disabled={sendingPhoto}
                        >Guardar foto</button>
                    </form>
                </div>
            </div>
        </div>


    )
}