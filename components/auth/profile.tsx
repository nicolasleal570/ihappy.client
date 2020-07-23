import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { updateUser } from '../../store/actions/authAction';
import { profile, putAvatar, getSpecialty } from '../../utils/endpoints';
import Emoji from './partials/Emoji';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { ToastContainer, toast } from 'react-toastify';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import BookmarksIcon from '@material-ui/icons/Bookmarks';
import ClearAllIcon from '@material-ui/icons/ClearAll';
export default function Profile() {
  const [equipo, setEquipo] = React.useState(null);
  const [nombre, setNombre] = React.useState('');
  const [apellido, setApellido] = React.useState('');
  const [cedula, setCedula] = React.useState('');
  const [direccion, setDireccion] = React.useState('');
  const [biografia, setBiografia] = React.useState('');
  const [username, setUsername] = React.useState('');
  const [avatar, setAvatar] = React.useState(<AccountCircleIcon />);
  const [archivo, setArchivo] = React.useState<File>();
  const [sendingPhoto, setSendingPhoto] = React.useState(false);
  const [sendingInfo, setSendingInfo] = React.useState(false);
  const [price, setPrice] = React.useState<number>(0);
  const { user, loading, error } = useSelector((state: any) => state.auth);
  const [role, setRole] = React.useState('');
  const [success, setSuccess] = React.useState(false);
  const [specialities, setSpecialities] = React.useState<Array<any>>([]);
  const [done, setDone] = React.useState(true);
  const [userSpecialities, setUserSpecialities] = React.useState<Array<any>>(
    []
  );
  var [specialitiesIds, setSpecialitiesIds] = React.useState<Array<any>>([]);
  const [loadSpecialities, setLoadSpecialities] = React.useState<Array<any>>(
    []
  );
  const [quitarEspecialidades, setQuitarEspecialidades] = React.useState(false);
  const [config, setConfig] = React.useState<any>(null);

  useEffect(() => {
    // obtenerDatos()
    setNombre(user?.first_name);
    setApellido(user?.last_name);
    setCedula(user?.cedula);
    setDireccion(user?.address);
    setBiografia(user?.bio);
    setArchivo(user?.avatar);
    setPrice(user?.precioConsulta);
    setRole(user?.role.identification);
    setUsername(user?.username);
    setAvatar(user?.avatar);
    setLoadSpecialities(user?.speciality);
  }, [user]);

  var userType;
  if (role === 'psicologo' || role === 'usuario') {
    userType = role;
  }
  const dispatch = useDispatch();
  toast.configure();

  React.useEffect(() => {
    setConfig({
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    });
  }, []);

  const getSpecialities = async () => {
    if (config) {
      const res = await axios.get(getSpecialty, config);
      setSpecialities(res.data.data);
      setDone(false);
    }
  };

  if (done) {
    getSpecialities();
  }

  // Returns a new array of objects made up of full names.
  var empaquetarEspecialidades = function (especialidades: any) {
    return especialidades.map(function (especialidad: any) {
      // create a new object to store full name.
      var newObj = { _id: '' };
      newObj['_id'] = especialidad;

      // return our new object.
      return newObj;
    });
  };
  var especialidades: any;

  const actualizarEspecialidades = () => {
    if (loadSpecialities) {
      loadSpecialities.map(
        (eleme) => (specialitiesIds = specialitiesIds.concat(eleme._id))
      );
      especialidades = empaquetarEspecialidades(specialitiesIds);
    } else {
      especialidades = empaquetarEspecialidades(specialitiesIds);
    }
  };
  const eliminarEspecialidades = () => {
    var emptyObject = null;
    especialidades = emptyObject;

  };

  actualizarEspecialidades();
  const enviarDatos = async () => {
    setSendingInfo(true);
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    };

    if (quitarEspecialidades) {
      eliminarEspecialidades();
    }
    axios
      .put(
        profile,
        {
          first_name: nombre,
          last_name: apellido,
          cedula: cedula,
          address: direccion,
          bio: biografia,
          precioConsulta: price,
          speciality: especialidades,
        },
        config
      )
      .then((res) => {
        console.log(res.data.data)
        dispatch(updateUser(res.data.data));
        setSuccess(true);
        const notification = () => {
          if (success) {
            toast.success('🦄 Se han guardado los cambios!', {
              position: 'top-right',
              autoClose: 4948,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          }
        };
        notification();

        if (!loading) {
          setSendingInfo(false);
        }
      })
      .catch((err) => {
        setSendingInfo(false);
        if (!success) {
          toast('☹️Ups! Hubo un error'),
            {
              position: 'top-right',
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            };
        }
      });
  };

  const enviarFoto = async (formData: any) => {
    setSendingPhoto(true);
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    };
    axios
      .put(putAvatar, formData, config)
      .then((res) => {
        dispatch(updateUser(res.data.data));
        setArchivo(undefined);
        setSendingPhoto(false);
      })
      .catch((err) => {
        setSendingPhoto(false);
      });
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    enviarDatos();
    e.preventDefault();
  };

  const submitForms = (e: any) => {
    onSubmit(e);
    onHandle(e);
    if (role === 'psicologo' || role === 'usuario') {
      userType = role;
    }
    e.preventDefault();
  };

  const onHandle = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let formdata = new FormData();
    formdata.append('image', archivo as any);
    enviarFoto(formdata);
  };

  const handleChange = (event: any) => {
    //Hace un arreglo a partir de las opciones elegidas con el nombre de las especialidades
    var selectedSpecialities = Array.from(
      event.target.selectedOptions,
      (item: any) => item.text
    );
    //Hace un arreglo a partir de las opciones elegidas pero agarra el id de cada una
    var selectedSpecialitiesIds = Array.from(
      event.target.selectedOptions,
      (item: any) => item.value
    );

    setUserSpecialities(selectedSpecialities);
    setSpecialitiesIds(selectedSpecialitiesIds);
    setQuitarEspecialidades(false);
  };

  const clearAll = (event: any) => {
    //Eliminar especialidades
    event.preventDefault();
    setQuitarEspecialidades(true);
    event.preventDefault();
  };

  return (
    <div className="w-2/3 mr-10 lg:w-full lg:h-full ml-10 mt-10">
      <h1 className="text-gray-900 text-3xl font-bold">Perfil</h1>
      <p className="text-gray-600">
        Tenga al tanto que parte de la información que coloque, puede ser
        visible para la comunidad de iHappy
      </p>
      <hr className="my-4 mr-20"></hr>
      <form className="max-w-3xl" method="PUT" onSubmit={onSubmit} id="myForm">
        <p className="text-base text-gray-800 py-2 font-semibold">Username</p>
        <input
          disabled
          className="focus:outline-none shadow-sm border py-1 border-gray-400 bg-gray-300 rounded text-center cursor-not-allowed"
          value={`@` + username}
        ></input>
        <p className="text-base text-gray-800 py-2 mt-4 font-semibold">
          Biografia
        </p>
        <textarea
          id="Biografia"
          onChange={(e) => setBiografia(e.target.value)}
          value={biografia}
          className="block w-full h-24 text-gray-700 border shadow-sm border-gray-400 rounded py-3 px-4 mb-2 leading-tight focus:outline-none focus:bg-white "
          placeholder={biografia}
        ></textarea>
        <p className="text-gray-600">
          Escribe algunas cosas interesantes acerca de ti{' '}
          <Emoji symbol="😃" label="happyFace" />
        </p>
      </form>
      <p className="text-base text-gray-800 mt-6 font-semibold">Avatar</p>
      <form
        encType="multipart/form-data"
        className="flex py-2"
        onSubmit={onHandle}
        method="PUT"
      >
        {avatar != null && (
          <img
            className="bg-purple-700 w-12 h-12 rounded-full overflow-hidden flex justify-center items-center"
            src={String(avatar)}
          ></img>
        )}
        {avatar === null && (
          <AccountCircleIcon
            className="mr-2 rounded-full overflow-hidden flex justify-center items-center"
            style={{ fill: '#a0aec0', fontSize: 58 }}
          />
        )}

        <div className="w-full pl-5">
          <label
            className="block uppercase tracking-wide rounded text-xs font-bold"
            htmlFor="grid-first-imagen"
          >
            Carga tu avatar{' '}
          </label>
          <input
            id="image"
            onChange={(e) => setArchivo(e.target.files![0])}
            size={15}
            className="focus:outline-none"
            type="file"
          />
        </div>
      </form>
      <form onSubmit={onSubmit}>
        {userType === 'psicologo' && (
          <div className="w-full">
            <div className="w-48 mt-5">
              <label
                className="text-base text-gray-800 py-2 mt-4 font-semibold"
                htmlFor="grid-precio"
              >
                Precio de consulta{' '}
              </label>
              <input
                id="precioConsulta"
                onChange={(e) => setPrice(e.target.valueAsNumber)}
                value={price}
                size={20}
                className="appearance-none shadow-sm border-gray-400 rounded block w-full text-gray-700 border py-3 px-4 mb-1 leading-tight focus:outline-none focus:bg-white"
                type="number"
              />
              <p className="text-gray-600 text-xs">
                Tener el precio de consulta ayuda a atraer mas clientes
                <Emoji symbol="💸" label="Money" />
              </p>
            </div>
            <div className="flex flex-col w-full">
              <label
                className="text-base text-gray-800 py-2 font-semibold"
                htmlFor="grid-precio"
              >
                Agrega especialidades a tu perfil
              </label>
              <div className="flex">
                <select
                  onChange={handleChange}
                  multiple={true}
                  className="shadow-sm border-gray-400 rounded block w-64 text-gray-700 border py-3 px-4 mb-1 leading-tight overflow-y-auto custom-scroll
                            focus:bg-white"
                >
                  {specialities.map((speciality) => (
                    <option value={speciality._id} key={speciality._id}>
                      {speciality.name}
                    </option>
                  ))}
                </select>
                <div className="flex flex-col">
                  <div className="ml-3 px-2 py-2 w- full bg-purple-100 shadow border border-2">
                    <label
                      className="flex flex-col text-sm text-center text-gray-800 text-center font-semibold"
                      htmlFor="grid-info"
                    >
                      Especialidades{' '}
                    </label>
                    <div className="flex float-right">
                      <hr className="bg-purple-800 mb-1"></hr>
                      <button
                        onClick={clearAll}
                        className="outline-none border-none appareance-none"
                      >
                        <p className="text-xs text-right"></p>
                        <ClearAllIcon
                          className=""
                          style={{ fill: 'black', fontSize: 20 }}
                        ></ClearAllIcon>
                      </button>
                    </div>
                    <hr className="bg-purple-700 mb-1"></hr>
                    {loadSpecialities == null && (
                      <div>
                        <label
                          className="text-xs text-gray-800 "
                          htmlFor="grid-precio"
                        >
                          No hay especialidades agregadas{' '}
                        </label>
                      </div>
                    )}
                    {quitarEspecialidades && (
                      <div>
                        <label
                          className="text-xs text-gray-800 "
                          htmlFor="grid-precio"
                        >
                          Se han eliminado las especialidades{' '}
                        </label>
                      </div>
                    )}

                    {userSpecialities.length > 0 && !quitarEspecialidades && (
                      <div>
                        <label className="text-xs py-1">
                          <AddCircleIcon
                            style={{ fill: 'black', fontSize: 12 }}
                          />{' '}
                          Agregar{' '}
                        </label>
                        {userSpecialities.map((item) => (
                          <div className="px-2 py-1 text-xs bg-gray-200 mb-2 rounded capitalize border border-purple-300">
                            {item}
                          </div>
                        ))}
                      </div>
                    )}
                    {loadSpecialities && (
                      <div>
                        {!quitarEspecialidades && (
                          <div>
                            <label
                              className="text-xs py-2 text-gray-800 text-center py-1"
                              htmlFor="grid-info"
                            >
                              <BookmarksIcon
                                style={{ fill: 'black', fontSize: 12 }}
                              />{' '}
                              Actuales{' '}
                            </label>
                            {loadSpecialities.map((element) => (
                              <div className="px-2 py-1 text-xs bg-purple-200 mb-1 rounded capitalize border border-purple-300">
                                {element.name}
                              </div>
                            ))}
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
      <h1 className="text-gray-900 mt-10 text-3xl font-bold">
        Información Personal
      </h1>
      <p className="text-gray-600">
        Colocar su nombre y apellido puede ayudar a que lo reconozcan mejor
      </p>
      <hr className="my-4 mr-20"></hr>
      <form className="w-full max-w-lg py-2">
        <div className="flex flex-wrap -mx-3 mb-2">
          <div className="w-full md:w-1/2 px-3 mb-2 md:mb-0">
            <label
              className="block text-base text-gray-800 font-semibold mb-2"
              htmlFor="grid-first-name"
            >
              Nombre
            </label>
            <input
              id="Nombre"
              onChange={(e) => setNombre(e.target.value)}
              className="appearance-none shadow-sm border-gray-400 rounded block w-full text-gray-700 border py-3 px-4 mb-1 leading-tight focus:outline-none focus:bg-white"
              value={nombre}
              type="text"
              placeholder={nombre}
            />
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label
              className="block text-base text-gray-800 font-semibold mb-2 "
              htmlFor="grid-last-name"
            >
              Apellido
            </label>
            <input
              id="Apellido"
              onChange={(e) => setApellido(e.target.value)}
              className="appearance-none shadow-sm border-gray-400 rounded block w-full text-gray-700 border py-3 px-4 mb-1 leading-tight focus:outline-none focus:bg-white"
              value={apellido}
              type="text"
              placeholder={apellido}
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-1">
          <div className="w-full px-3">
            <label
              className="block text-base text-gray-800 font-semibold mb-2 "
              htmlFor="grid-last-name"
            >
              Documento de identidad
            </label>
            <input
              id="cedula"
              onChange={(e) => setCedula(e.target.value)}
              value={cedula}
              className="appearance-none shadow-sm border-gray-400 rounded block w-full text-gray-700 border py-3 px-4 mb-1 leading-tight focus:outline-none focus:bg-white"
              type="number"
              placeholder={cedula}
            />
            <p className="text-gray-600 text-xs italic"></p>
          </div>
        </div>
        <p className="text-base text-gray-800 py-2 font-semibold">Dirección</p>
        <textarea
          id="Direccion"
          onChange={(e) => setDireccion(e.target.value)}
          value={direccion}
          className="block w-full h-24 text-gray-700 border shadow-sm border-gray-400 rounded py-3 px-4 mb-2 leading-tight focus:outline-none focus:bg-white "
          placeholder={biografia}
        ></textarea>
        <p className="text-gray-600">
          Tu direccion es importante para realizar los pagos{' '}
          <Emoji symbol="🏡" label="house" />
        </p>
      </form>

      <button
        className={` inline-block px-4 py-2 transition duration-300 ease-in-out rounded cursor-pointer mt-4 mb-10
                    ${
                      sendingInfo
                        ? 'border-2 border-gray-400 bg-gray-400 text-gray-600 cursor-not-allowed'
                        : 'border-2 border-purple-600 hover:bg-purple-800 hover:border-purple-800 bg-purple-600 text-white cursor-pointer'
                    }
                `}
        disabled={sendingInfo}
        type="submit"
        onClick={(e) => submitForms(e)}
      >
        Guardar
      </button>
    </div>
  );
}
