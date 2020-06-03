import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, authCheckState } from '../../../store/actions/authAction';
import { useRouter } from 'next/router';
import Link from 'next/Link';

export default function login() {
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')

    const { user } = useSelector((state: any) => state.auth);
    const router = useRouter();
    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch(authCheckState())
        if (user) {
            router.push('/reviews');
        }
    }, [])


    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        dispatch(loginUser(email, password));
    }

    return (
        <div className="flex flex-col lg:flex-row justify-center">
            <div className="flex-1 bg-center bg-no-repeat bg-cover h-screen" style={{
                backgroundImage: `url('/assets/img/login-image.jpg')`
            }} >

                <div className="flex justify-center h-full">
                    <div className="w-full self-center p-4">
                        <p className="text-2xl lg:text-4xl text-white text-center p-2">‘La paz es un regalo que Dios nos regalo para ser felices; queda de nosotros si tomarla o dejarla’ <br />- Walter Bazar</p>
                    </div>
                </div>
            </div>

            <div className="flex-1">
                <form className="flex flex-col justify-center bg-white h-screen" method="POST" onSubmit={onSubmit}>
                    <div className="text-gray-800 text-3xl lg:text-5xl text-center mb-4 lg:mb-50 px-4 py-2 capitalize">Inicia Sesion</div>

                    <div className="text-gray-700 px-6 lg:px-4 py-2">

                        <div className="mb-6 flex flex-row justify-center items-center">
                            <div className="mr-6 ">
                                <img className="w-8" src="/assets/icons/usuario.png" alt="" />
                            </div>
                            <div className="lg:w-2/5 w-full text-center">
                                <input
                                    className="bg-white appearance-none border-2 border-purple-500 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                    id="email"
                                    type="text"
                                    placeholder="Email"
                                    onChange={e => setEmail(e.target.value)}
                                    value={
                                        email
                                    }
                                />
                            </div>
                        </div>

                        <div className="mb-6 flex flex-row justify-center items-center">
                            <div className="mr-6">
                                <img className="w-8" src="/assets/icons/contrasena.png" alt="" />
                            </div>
                            <div className="lg:w-2/5 w-full text-center">
                                <input
                                    className="bg-white appearance-none border-2 border-purple-500 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                    id="password"
                                    type="password"
                                    placeholder="******************"
                                    onChange={e => setPassword(e.target.value)}
                                    value={
                                        password
                                    }
                                />
                            </div>

                        </div>


                        <div className="w-full">
                            <button
                                className="w-full lg:w-auto mx-auto block shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none font-bold text-white py-2 px-4 rounded"
                                type="submit"
                            > Iniciar Sesion </button>
                        </div>
                    </div>

                    <div className="text-gray-700 text-center px-6 lg:px-4 py-2 ">
                        <p>No tienes una cuenta? <Link href="/sign-up"><span className="cursor-pointer text-purple-500 underline">Regístrate</span></Link></p>
                    </div>

                </form>
            </div>
        </div>
    )
}
