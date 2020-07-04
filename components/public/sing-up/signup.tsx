import React from 'react';
import Axios from 'axios';
import { getRoles } from '../../../utils/endpoints';
import { useDispatch, useSelector } from 'react-redux';
import Router, { useRouter } from 'next/router';
import Link from 'next/dist/client/link';
import { signupUser, authCheckState } from '../../../store/actions/authAction';
import InputField from '../../auth/partials/InputField';
import SelectFieldDynamic from '../../auth/partials/SelectField';

export default function signup() {
  const [data, setData] = React.useState<{
    email: string;
    password: string;
    confirm_password: string;
    role: string;
    username: string;
  }>({
    email: '',
    password: '',
    confirm_password: '',
    username: '',
    role: '',
  });
  const [userError, setUserError] = React.useState(null);

  const inputRefs = React.useRef<Array<any>>([
    React.createRef(),
    React.createRef(),
    React.createRef(),
    React.createRef(),
    React.createRef(),
  ]); // la cantidad de createRef depende de la cantidad de inputs

  const [sendingForm, setSendingForm] = React.useState(false);

  const dispatch = useDispatch();
  const [roles, setRoles] = React.useState<
    Array<{ title: string; value: string }>
  >([]);

  const { loading, user, error } = useSelector((state: any) => state.auth);
  const router = useRouter();

  const { socket }: { socket: SocketIOClient.Socket } = useSelector(
    (state: any) => state.socket
  );

  React.useEffect(() => {
    Router.prefetch('/profile');
  }, []);

  React.useEffect(() => {
    if (error && !loading) {
      setUserError(error);
      setSendingForm(false);
    }
  }, [loading, error]);

  React.useEffect(() => {
    Axios.get(getRoles)
      .then((response) => {
        const data_role: Array<any> = response.data.data;
        const options: Array<{ title: string; value: string }> = [];
        data_role.map((opt) => {
          options.push({
            title: `Soy un ${opt.public_name}`,
            value: opt._id,
          });
        });
        setRoles(options);
      })
      .catch((e) => {
        // Podemos mostrar los errores en la consola
        console.log(e);
      });
  }, []);

  React.useEffect(() => {
    if (user && !error && !loading) {
      const { redirected } = Router.query;
      if (redirected === 'true') {
        Router.back();
      } else {
        Router.push('/profile');
      }
    }
  }, [user, loading, error]);

  const emitSetUserEvent = (user: any) => {
    socket.emit('identity', user._id);
  };

  const handleChange = (name: string, value: string) => {
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let isValid = true;
    setUserError(null);

    for (let i = 0; i < inputRefs.current.length; i++) {
      const element = inputRefs.current[i];
      const valid = element.current.validate();
      if (!valid) {
        isValid = false;
      }
    }

    if (!isValid) {
      return;
    }

    if (!sendingForm) {
      setSendingForm(true);
      dispatch(
        signupUser(
          data.email,
          data.username,
          data.password,
          data.confirm_password,
          data.role
        )
      );
    }
  };

  return (
    <div className="flex flex-col lg:flex-row justify-center">
      <div
        className="flex-1 bg-center bg-no-repeat bg-cover h-screen"
        style={{
          backgroundImage: `url('https://res.cloudinary.com/deekenjr3/image/upload/v1593848029/assets/peace-girl_gdshzz.jpg')`,
        }}
      >
        <div className="flex justify-center h-full">
          <div className="w-full self-center p-4">
            <p className="text-2xl lg:text-4xl text-white text-center p-2">
              Su salud es nuestra unica preocupacion, en iHappy queremos que se
              sienta feliz y en paz en su dia a dia. Unete a nuestra familia y
              se parte del cambio.
            </p>
          </div>
        </div>
      </div>
      <div className="flex-1 h-screen">
        <div className="flex flex-col items-center">
          <form
            className="flex flex-col justify-center bg-white h-screen w-full"
            method="POST"
            onSubmit={onSubmit}
          >
            <p className="block text-gray-800 text-3xl lg:text-5xl text-center mb-4 lg:mb-50 px-4 py-2 capitalize leading-none">
              Únete a nuestra familia
            </p>

            {userError && (
              <div className="lg:w-7/12 w-full mx-auto text-gray-700 text-center mb-1 rounded px-4 py-2 capitalize bg-red-300 border border-red-500">
                {userError}
              </div>
            )}

            <div className="text-gray-700 px-6 lg:px-4 py-2 lg:overflow-y-auto w-full">
              <div className="mb-6 flex flex-col justify-center items-center">
                <div className="lg:w-7/12 w-full">
                  <InputField
                    withMarginBottom
                    name="username"
                    type="text"
                    label="Ingrese su nombre de usuario"
                    placeholder="Ej. john_doe99"
                    value=""
                    inputChange={handleChange}
                    ref={inputRefs.current[1]}
                    validation="required|min:6|max:20"
                  />
                </div>

                <div className="lg:w-7/12 w-full">
                  <InputField
                    withMarginBottom
                    name="email"
                    type="text"
                    label="Ingrese su email"
                    placeholder="Ej. john_doe@example.com"
                    value=""
                    inputChange={handleChange}
                    ref={inputRefs.current[0]}
                    validation="required|email|min:6|max:20"
                  />
                </div>

                <div className="lg:w-7/12 w-full">
                  <InputField
                    withMarginBottom
                    name="password"
                    type="password"
                    label="Ingrese su Contraseña"
                    placeholder="********"
                    value=""
                    inputChange={handleChange}
                    ref={inputRefs.current[2]}
                    validation="required|min:6|max:20"
                  />
                </div>

                <div className="lg:w-7/12 w-full">
                  <InputField
                    withMarginBottom
                    name="confirm_password"
                    type="password"
                    label="Confirme Contraseña"
                    placeholder="********"
                    value=""
                    inputChange={handleChange}
                    ref={inputRefs.current[3]}
                    validation="required|min:6|max:20"
                  />
                </div>

                <div className="lg:w-7/12 w-full">
                  <SelectFieldDynamic
                    name="role"
                    type="text"
                    value=""
                    placeholder="Selecciona un role"
                    label="Ingrese el role"
                    inputChange={handleChange}
                    validation="required"
                    ref={inputRefs.current[4]}
                    options={roles}
                  />
                </div>
              </div>

              <div className="w-full">
                <button
                  type="submit"
                  className={`
                                    w-full lg:w-auto mx-auto block shadow focus:outline-none py-2 px-4 rounded
                                    ${
                                      loading
                                        ? 'border-2 border-gray-400 bg-gray-400 text-gray-600 cursor-not-allowed'
                                        : 'border-2 border-purple-600 hover:bg-purple-800 hover:border-purple-800 bg-purple-600 text-white cursor-pointer'
                                    }
                                    `}
                  disabled={loading}
                >
                  {' '}
                  Regístrate{' '}
                </button>
              </div>
            </div>

            <div className="text-gray-700 text-center px-6 lg:px-4 py-2 ">
              <p>
                No tienes una cuenta?{' '}
                <Link href="/login">
                  <span className="cursor-pointer text-purple-500 underline">
                    Iniciar sesión
                  </span>
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
