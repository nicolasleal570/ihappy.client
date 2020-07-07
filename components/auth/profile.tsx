import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { updateUser } from '../../store/actions/authAction'
import { profile, putAvatar, getUsers, getSpecialty } from '../../utils/endpoints';
import Emoji from './partials/emoji';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { ToastContainer, toast } from 'react-toastify';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import BookmarksIcon from '@material-ui/icons/Bookmarks';
import ClearAllIcon from '@material-ui/icons/ClearAll';
export default function Profile() {
    const [equipo, setEquipo] = React.useState(null)
    const [nombre, setNombre] = React.useState('')
    const [apellido, setApellido] = React.useState('')
    const [cedula, setCedula] = React.useState('')
    const [direccion, setDireccion] = React.useState('')
    const [biografia, setBiografia] = React.useState('')
    const [username, setUsername] = React.useState('')
    const [avatar, setAvatar] = React.useState(<AccountCircleIcon />)
    const [archivo, setArchivo] = React.useState<File>()
    const [sendingPhoto, setSendingPhoto] = React.useState(false)
    const [sendingInfo, setSendingInfo] = React.useState(false)
    const [price, setPrice] = React.useState<number>(0)
    const { user, loading, error } = useSelector((state: any) => state.auth)
    const [role, setRole] = React.useState('')
    const [success, setSuccess] = React.useState(false)
    const [specialities, setSpecialities] = React.useState<Array<any>>([]);
    const [done, setDone] = React.useState(true)
    const [userSpecialities, setUserSpecialities] = React.useState<Array<any>>([])
    var [specialitiesIds, setSpecialitiesIds] = React.useState<Array<any>>([])
    const [loadSpecialities, setLoadSpecialities] = React.useState<Array<any>>([])
    const [quitarEspecialidades, setQuitarEspecialidades] = React.useState(false)

    useEffect(() => {
        // obtenerDatos()
        setNombre(user?.first_name)
        setApellido(user?.last_name)
        setCedula(user?.cedula)
        setDireccion(user?.address)
        setBiografia(user?.bio)
        setArchivo(user?.avatar)
        setPrice(user?.precioConsulta)
        setRole(user?.role.identification)
        setUsername(user?.username)
        setAvatar(user?.avatar)
        setLoadSpecialities(user?.speciality)
    }, [user])

    console.log(loadSpecialities)
    console.log(role)
    var userType;
    if(role==='psicologo' || role==='usuario'){
        userType= role
        console.log(userType)
    }
    const dispatch = useDispatch();
    toast.configure()
    const config = {
        withCredentials: true
    }

    const getSpecialities = async () => {
        const res = await axios.get(getSpecialty, config);
        setSpecialities(res.data.data)
        console.log(specialities)
        setDone(false)
        
    }

    if (done) {
        getSpecialities();
    }


    // var formatoData = function(specialitiesIds){
    //     return specialitiesIds.map(item => (
    //         var newObj = {};
    //         newObj['_id']= specialitiesIds.item
    //         return newObj;
    //     ));

    // };

    // var especialidades = formatoData(setSpecialitiesIds)

    // const empaquetarEspecialidades = (idEspecialidad:any[]) => {
    //     idEspecialidad.map(item=>{
    //         var newObj = {}
    //         newObj["_id"] = item
    //         return newObj
    //     }
    //     )
    // }
    // var especialidades = empaquetarEspecialidades(specialitiesIds)
    // console.log(especialidades)

    // Returns a new array of objects made up of full names.
    var empaquetarEspecialidades = function (especialidades: any) {
        return especialidades.map(function (especialidad: any) {
            // create a new object to store full name.
            var newObj = {};
            newObj["_id"] = especialidad;

            // return our new object.
            return newObj;
        });
    };
    var especialidades: any;
    const actualizarEspecialidades = () => {
        if (loadSpecialities) {
            loadSpecialities.map(eleme =>
                specialitiesIds = specialitiesIds.concat(eleme._id)
            )
            console.log(specialitiesIds)
            especialidades = empaquetarEspecialidades(specialitiesIds);
            console.log('Ya hay especialidades presentes, se agregaron al arreglo y tenemos este arreglo' + especialidades)
        } else {
            especialidades = empaquetarEspecialidades(specialitiesIds);
            console.log('No habian habilidades, se tiene este arreglo' + especialidades)
        }
    }
    const eliminarEspecialidades = () => {
        var emptyObject = null
        ;
        especialidades = emptyObject

        console.log('Se han eliminado'+especialidades)
    }

   

    actualizarEspecialidades();
    const enviarDatos = async () => {

        setSendingInfo(true);

        if (quitarEspecialidades) {
            eliminarEspecialidades()
        }
        axios.put(profile, {
            'first_name': nombre,
            'last_name': apellido,
            'cedula': cedula,
            'address': direccion,
            'bio': biografia,
            'precioConsulta': price,
            "speciality": especialidades


        }, config).then((res) => {
            console.log(especialidades)
            console.log(specialitiesIds)
            console.log(res.data);
            dispatch(updateUser(res.data.data))
            setSuccess(true)
            const notification = () => {
                if (success) {
                    toast.success('🦄 Se han guardado los cambios!', {
                        position: "top-right",
                        autoClose: 4948,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                }
            }
            notification()

            if (!loading) {
                setSendingInfo(false);
            }

        }).catch((err) => {

            console.log(err);
            setSendingInfo(false);
            if (!success) {
                toast('☹️Ups! Hubo un error'), {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                };
            }
        })
    }

    const enviarFoto = async (formData: any) => {
        const config = {
            withCredentials: true
        }
        setSendingPhoto(true);
        axios.put(putAvatar, formData, config
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
        e.preventDefault()

    }

    const submitForms = (e: any) => {
        onSubmit(e);
        onHandle(e);
        if(role==='psicologo' || role==='usuario'){
            userType=role
        }
        e.preventDefault();
    }

    const onHandle = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let formdata = new FormData()
        formdata.append('image', archivo as any)
        enviarFoto(formdata);
    }

    const handleChange = (event: any) => {
        var selectedSpecialities = Array.from(event.target.selectedOptions, (item: any) => item.text)
        var selectedSpecialitiesIds = Array.from(event.target.selectedOptions, (item: any) => item.value)

        setUserSpecialities(selectedSpecialities);
        setSpecialitiesIds(selectedSpecialitiesIds);
        setQuitarEspecialidades(false)
    }
    const clearAll = (event: any) => {
        event.preventDefault();
        setQuitarEspecialidades(true)
        event.preventDefault();

    }
    console.log(userSpecialities.length,quitarEspecialidades)
    return (
        <div className='h-full w-full ml-10 mt-10'>
            <h1 className='text-gray-900 text-3xl font-bold'>Perfil</h1>
            <p className='text-gray-600'>Tenga al tanto que parte de la información que coloque, puede ser visible para la comunidad de iHappy</p>
            <hr className='my-4 mr-20'></hr>
            <form className='max-w-3xl' method='PUT' onSubmit={onSubmit} id='myForm'>
                <p className='text-base text-gray-800 py-2 font-semibold'>Username</p>
                <input disabled className='focus:outline-none shadow-sm border py-1 border-gray-400 bg-gray-300 rounded text-center cursor-not-allowed' value={`@` + username}></input>
                <p className='text-base text-gray-800 py-2 mt-4 font-semibold'>Biografia</p>
                <textarea id='Biografia' onChange={e => setBiografia(e.target.value)} value={biografia} className="block w-full h-24 text-gray-700 border shadow-sm border-gray-400 rounded py-3 px-4 mb-2 leading-tight focus:outline-none focus:bg-white " placeholder={biografia}></textarea>
                <p className='text-gray-600'>Escribe algunas cosas interesantes acerca de ti <Emoji symbol="😃" label="happyFace" /></p>

            </form>
            <p className='text-base text-gray-800 mt-6 font-semibold'>Avatar</p>
            <form encType='multipart/form-data' className='flex py-2' onSubmit={onHandle} method="PUT">
                {avatar != null && (
                    <img className='bg-purple-700 w-12 h-12 rounded-full overflow-hidden flex justify-center items-center' src={avatar}></img>
                )}
                {avatar === null && (
                    <AccountCircleIcon className='mr-2 rounded-full overflow-hidden flex justify-center items-center' style={{ fill: '#a0aec0', fontSize: 58 }} />
                )}

                <div className="w-full pl-5">
                    <label className="block uppercase tracking-wide rounded text-xs font-bold" htmlFor="grid-first-imagen">
                        Carga tu avatar </label>
                    <input id='image' onChange={e => setArchivo(e.target.files![0])} size={15} className="focus:outline-none" type="file" />
                </div>
            </form>
            <form onSubmit={onSubmit}>
                { userType === "psicologo" && (
                    <div className='w-full'>
                        <div className='w-48 mt-5'>
                            <label className="text-base text-gray-800 py-2 mt-4 font-semibold" htmlFor="grid-precio">
                                Precio de consulta </label>
                            <input id='precioConsulta' onChange={e => setPrice(e.target.valueAsNumber)} value={price} size={20} className="appearance-none shadow-sm border-gray-400 rounded block w-full text-gray-700 border py-3 px-4 mb-1 leading-tight focus:outline-none focus:bg-white" type="number" />
                            <p className='text-gray-600 text-xs'>Tener el precio de consulta ayuda a atraer mas clientes<Emoji symbol='💸' label='Money' /></p>
                        </div>
                        <div className='flex flex-col w-full'>
                            <label className="text-base text-gray-800 py-2 font-semibold" htmlFor="grid-precio">Agrega especialidades a tu perfil</label>
                            <div className='flex'>
                                <select onChange={handleChange}
                                    multiple={true} className='shadow-sm border-gray-400 rounded block w-64 text-gray-700 border py-3 px-4 mb-1 leading-tight overflow-y-auto custom-scroll
                            focus:bg-white'>
                                    {specialities.map(speciality =>
                                        <option value={speciality._id} key={speciality._id}>
                                            {speciality.name}
                                        </option>
                                    )}
                                </select>
                                <div className='flex flex-col'>
                                    <div className='ml-3 px-2 py-2 w- full bg-purple-100 shadow border border-2'>
                                        <label className="flex flex-col text-sm text-center text-gray-800 text-center font-semibold" htmlFor="grid-info">
                                            Especialidades </label>
                                        <div className='flex float-right'>
                                            <hr className='bg-purple-800 mb-1'></hr>
                                            <button onClick={clearAll} className='outline-none border-none appareance-none' >
                                                <p className='text-xs text-right'></p><ClearAllIcon className='' style={{ fill: 'black', fontSize: 20 }}></ClearAllIcon>
                                            </button>
                                        </div>
                                        <hr className='bg-purple-700 mb-1'></hr>
                                        {loadSpecialities == null && (
                                            <div>
                                            <label className="text-xs text-gray-800 " htmlFor="grid-precio">
                                            No hay especialidades agregadas </label>
                                            </div>
                                        )}
                                        {quitarEspecialidades && (
                                            <div>
                                            <label className="text-xs text-gray-800 " htmlFor="grid-precio">
                                            Se han eliminado las especialidades </label>
                                            </div>
                                        )}
                                        
                                        {userSpecialities.length > 0 && !quitarEspecialidades && (
                                            <div>
                                                <label className='text-xs py-1'><AddCircleIcon style={{ fill: 'black', fontSize: 12 }} /> Agregar </label>
                                                {userSpecialities.map(item =>
                                                    <div className='px-2 py-1 text-xs bg-gray-200 mb-2 rounded capitalize border border-purple-300'>
                                                        {item}
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                        {loadSpecialities && (
                                            <div>
                                                
                                                {!quitarEspecialidades && (
                                                    <div>
                                                        <label className="text-xs py-2 text-gray-800 text-center py-1" htmlFor="grid-info">
                                                    <BookmarksIcon style={{ fill: 'black', fontSize: 12 }} /> Actuales </label>
                                                        {loadSpecialities.map(element =>
                                                            <div className='px-2 py-1 text-xs bg-purple-200 mb-1 rounded capitalize border border-purple-300'>
                                                                {element.name}
                                                            </div>
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                    {/* {specialitiesIds.map(item=>
                               <div className='ml-5 bg-purple-500 mb-2 rounded-full px-2 border border border-purple-600 text-gray-200'>
                                  {item}
                                  </div>
                                )} */}
                                </div>

                            </div>
                        </div>
                    </div>
                )}
            </form>
            <h1 className='text-gray-900 mt-10 text-3xl font-bold'>Información Personal</h1>
            <p className='text-gray-600'>Colocar su nombre y apellido puede ayudar a que lo reconozcan mejor</p>
            <hr className='my-4 mr-20'></hr>
            <form className="w-full max-w-lg py-2">
                <div className="flex flex-wrap -mx-3 mb-2">
                    <div className="w-full md:w-1/2 px-3 mb-2 md:mb-0">
                        <label className="block text-base text-gray-800 font-semibold mb-2" htmlFor="grid-first-name">
                            Nombre
                                    </label>
                        <input id='Nombre' onChange={e => setNombre(e.target.value)} className="appearance-none shadow-sm border-gray-400 rounded block w-full text-gray-700 border py-3 px-4 mb-1 leading-tight focus:outline-none focus:bg-white" value={nombre} type="text" placeholder={nombre} />
                    </div>
                    <div className="w-full md:w-1/2 px-3">
                        <label className="block text-base text-gray-800 font-semibold mb-2 " htmlFor="grid-last-name">
                            Apellido
                        </label>
                        <input id='Apellido' onChange={e => setApellido(e.target.value)} className="appearance-none shadow-sm border-gray-400 rounded block w-full text-gray-700 border py-3 px-4 mb-1 leading-tight focus:outline-none focus:bg-white" value={apellido} type="text" placeholder={apellido} />
                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-1">
                    <div className="w-full px-3">
                        <label className="block text-base text-gray-800 font-semibold mb-2 " htmlFor="grid-last-name">
                            Documento de identidad
                        </label>
                        <input id='cedula' onChange={e => setCedula(e.target.value)} value={cedula} className="appearance-none shadow-sm border-gray-400 rounded block w-full text-gray-700 border py-3 px-4 mb-1 leading-tight focus:outline-none focus:bg-white" type="number" placeholder={cedula} />
                        <p className="text-gray-600 text-xs italic"></p>
                    </div>
                </div>
                <p className='text-base text-gray-800 py-2 font-semibold'>Dirección</p>
                <textarea id='Direccion' onChange={e => setDireccion(e.target.value)} value={direccion} className="block w-full h-24 text-gray-700 border shadow-sm border-gray-400 rounded py-3 px-4 mb-2 leading-tight focus:outline-none focus:bg-white " placeholder={biografia}></textarea>
                <p className='text-gray-600'>Tu direccion es importante para realizar los pagos <Emoji symbol="🏡" label="house" /></p>
            </form>
            {/* { role === "psicologo" || role===undefined && (
                 <div>
                     <h1 className='text-gray-900 mt-10 text-3xl font-bold'>Perfil como Psicologico</h1>
            <p className='text-gray-600'>Aqui puedes ajustar tu precio por consulta y agregar informacion interesante para tus clientes</p>
            <hr className='my-4 mr-20'></hr>
            <div className='w-48 mt-5'>
                        <label className="text-base text-gray-800 py-2 mt-4 font-semibold" htmlFor="grid-precio">
                                     Precio de consulta </label>
                        <input id='precioConsulta' onChange={e => setPrice(e.target.value)} value={price} size={20} className="appearance-none shadow-sm border-gray-400 rounded block w-full text-gray-700 border py-3 px-4 mb-1 leading-tight focus:outline-none focus:bg-white" type="number" placeholder={price} />
                        <p className='text-gray-600 text-xs'>Tener el precio de consulta ayuda a atraer mas clientes<Emoji symbol='💸' label='Money'/></p>
                        </div>
                                <div className="w-full py-1 md:w-1/2 px-2 mb-6 md:mb-0">
                                    <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="grid-first-cedula">
                                        Precio </label>
                                    <input id='precioConsulta' onChange={e => setPrice(e.target.value)} value={price} size={20} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" type="number" placeholder={price} />
                                </div>
                                </div>
                                 ) } */}
            <button className={` inline-block px-4 py-2 transition duration-300 ease-in-out rounded cursor-pointer mt-4 mb-10
                    ${sendingInfo ? 'border-2 border-gray-400 bg-gray-400 text-gray-600 cursor-not-allowed'
                    : 'border-2 border-purple-600 hover:bg-purple-800 hover:border-purple-800 bg-purple-600 text-white cursor-pointer'}
                `} disabled={sendingInfo} type='submit' onClick={(e) => submitForms(e)}>Guardar</button>
        </div>


    )
}
// <div className='flex bg-cover bg-top bg-no-repeat h-screen' style={{ backgroundImage: `url('/assets/img/chill2.png')` }}>
        //     <div className='w-1/5'>
        //     </div>
        //     <div className='w-5/5 mr-64'>
        //         <form method="PUT" onSubmit={onSubmit} className='mt-24'>
        //             <div className='flex'>
        //                 <div className=''>
        //                     <div className="w-full py-1 md:w-1/2 px-2 mb-6 md:mb-0">
        //                         <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="grid-first-name">
        //                             First Name </label>
        //                         <input id='Nombre' onChange={e => setNombre(e.target.value)} value={nombre} size={80} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" type="text" />
        //                     </div>
        //                     <div className="w-full py-1 md:w-1/2 px-2">
        //                         <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="grid-last-name">
        //                             Last Name </label>
        //                         <input id='Apellido' onChange={e => setApellido(e.target.value)} value={apellido} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text" placeholder={apellido} />
        //                     </div>
        //                     <div className="w-full py-1 md:w-1/2 px-2 mb-6 md:mb-0">
        //                         <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="grid-first-cedula">
        //                             Cedula </label>
        //                         <input id='cedula' onChange={e => setCedula(e.target.value)} value={cedula} size={20} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" type="number" placeholder={cedula} />
        //                     </div>
        //                     { role === "psicologo" || role===undefined && (
        //                     <div className="w-full py-1 md:w-1/2 px-2 mb-6 md:mb-0">
        //                         <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="grid-first-cedula">
        //                             Precio </label>
        //                         <input id='precioConsulta' onChange={e => setPrice(e.target.value)} value={price} size={20} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" type="number" placeholder={price} />
        //                     </div>
        //                      ) }

        //                     <div className="w-full py-1 md:w-1/2 px-2 mb-6 md:mb-0">
        //                         <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="grid-first-cedula">
        //                             Direccion </label>
        //                         <textarea id='direccion' onChange={e => setDireccion(e.target.value)} value={direccion} className="appearance-none block w-full h-32 bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" placeholder={direccion}></textarea>
        //                     </div>
        //                 </div>
        //                 <div className="w-full md:w-1/2 py-3 px-2 mb-6 md:mb-0">
        //                     <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="grid-first-bio">
        //                         Biografia </label>
        //                     <textarea id='Biografia' onChange={e => setBiografia(e.target.value)} value={biografia} className="appearance-none block w-full h-64 bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" placeholder={biografia}></textarea>
        //                     <button type='submit'
        //                         className={`
        //                                 inline-block px-6 py-2 transition duration-300 ease-in-out rounded cursor-pointer mt-4 
        //                                 ${sendingInfo ? 'border-2 border-gray-400 bg-gray-400 text-gray-600 cursor-not-allowed'
        //                                 : 'border-2 border-purple-600 hover:bg-purple-800 hover:border-purple-800 bg-purple-600 text-white cursor-pointer'}
        //                     `}
        //                         disabled={sendingInfo}
        //                     >Guardar Datos</button>
        //                 </div>
        //             </div>
        //         </form>
        //         <div className=''>
        //             <form encType='multipart/form-data' onSubmit={onHandle} method="PUT">
        //                 <div className="w-full py-1 md:w-1/2 px-2 mb-6 md:mb-0">
        //                     <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="grid-first-imagen">
        //                         Carga tu avatar </label>
        //                     <input id='image' onChange={e => setArchivo(e.target.files![0])} size={20} className="" type="file" />
        //                 </div>
        //                 <button type='submit' className={
        //                     `
        //                     inline-block px-3 py-1 ml-2 transition duration-300 ease-in-out rounded cursor-pointer text-sm mt-4
        //                     ${sendingPhoto ? 'border-2 border-gray-400 bg-gray-400 text-gray-600 cursor-not-allowed'
        //                         : 'border-2 border-purple-600 hover:bg-purple-800 hover:border-purple-800 bg-purple-600 text-white cursor-pointer'}
        //                     `}
        //                     disabled={sendingPhoto}
        //                 >Guardar foto</button>
        //             </form>
        //         </div>
        //     </div>
        // </div>