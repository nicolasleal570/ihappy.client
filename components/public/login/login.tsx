import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../../store/actions/authAction';
import Router, { useRouter } from 'next/router';
import Link from 'next/link';
import InputField from '../../auth/partials/InputField';

export default function login() {
  const [data, setData] = React.useState<{ email: string; password: string }>({
    email: '',
    password: '',
  });
  const [userError, setUserError] = React.useState(null);

  const inputRefs = React.useRef<Array<any>>([
    React.createRef(),
    React.createRef(),
  ]); // la cantidad de createRef depende de la cantidad de inputs

  const [sendingForm, setSendingForm] = React.useState(false);

  const { loading, user, error } = useSelector((state: any) => state.auth);
  const { socket }: { socket: SocketIOClient.Socket } = useSelector(
    (state: any) => state.socket
  );

  const router = useRouter();
  const dispatch = useDispatch();

  React.useEffect(() => {
    Router.prefetch('/dashboard');
  }, []);

  React.useEffect(() => {
    if (error && !loading) {
      setUserError(error);
      setSendingForm(false);
    }
  }, [loading, error]);

  React.useEffect(() => {
    if (user && !error && !loading) {
      const { redirected } = Router.query;
      if (redirected === 'true') {
        Router.back();
      } else {
        Router.push('/dashboard');
      }
    }
  }, [user, loading, error]);

  const handleChange = (name: string, value: string) => {
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let isValid = true;

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

      dispatch(loginUser(data.email, data.password));
    }
  };

  return (
    <div className="flex flex-col lg:flex-row justify-center">
      <div
        className="flex-1 bg-center bg-no-repeat bg-cover h-screen"
        style={{
          backgroundImage: `url('https://res.cloudinary.com/deekenjr3/image/upload/v1593848072/assets/login-image_xb9ln5.jpg')`,
        }}
      >
        <div className="flex justify-center h-full">
          <div className="w-full self-center p-4">
            <p className="text-2xl lg:text-4xl text-white text-center p-2">
              ‘La paz es un regalo que Dios nos regalo para ser felices; queda
              de nosotros si tomarla o dejarla’ <br />- Walter Bazar
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1">
        <form
          className="flex flex-col justify-center bg-white h-screen"
          method="POST"
          onSubmit={onSubmit}
        >
          <div className="text-gray-800 text-3xl lg:text-5xl text-center mb-4 lg:mb-50 px-4 py-2 capitalize">
            Inicia Sesion
          </div>

          {userError && (
            <div className="lg:w-7/12 w-full mx-auto text-gray-700 text-center mb-1 rounded px-4 py-2 capitalize bg-red-300 border border-red-500">
              {userError}
            </div>
          )}

          <div className="text-gray-700 px-6 lg:px-4 py-2">
            <div className="mb-6 flex flex-row justify-center items-center">
              <div className="lg:w-7/12 w-full">
                <InputField
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
            </div>

            <div className="mb-6 flex flex-row justify-center items-center">
              <div className="lg:w-7/12 w-full ">
                <InputField
                  name="password"
                  type="password"
                  label="Ingrese su Contraseña"
                  placeholder="********"
                  value=""
                  inputChange={handleChange}
                  ref={inputRefs.current[1]}
                  validation="required|min:6|max:20"
                  withMarginBottom
                />
              </div>
            </div>

            <div className="w-full">
              <button
                type="submit"
                className={`
                                    w-full lg:w-auto mx-auto block shadow focus:outline-none py-2 px-4 rounded
                                    ${
                                      sendingForm
                                        ? 'border-2 border-gray-400 bg-gray-400 text-gray-600 cursor-not-allowed'
                                        : 'border-2 border-purple-600 hover:bg-purple-800 hover:border-purple-800 bg-purple-600 text-white cursor-pointer'
                                    }
                                    `}
                disabled={sendingForm}
              >
                {' '}
                Iniciar Sesion{' '}
              </button>
            </div>
          </div>

          <div className="text-gray-700 text-center px-6 lg:px-4 py-2 ">
            <p>
              No tienes una cuenta?{' '}
              <Link href="/sign-up">
                <span className="cursor-pointer text-purple-500 underline">
                  Regístrate
                </span>
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
