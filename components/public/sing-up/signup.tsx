import React from 'react';
import Axios from 'axios';
import { getRoles } from '../../../utils/endpoints';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Link from 'next/dist/client/link';
import { signupUser } from '../../../store/actions/authAction';



export default function signup() {

	const dispatch = useDispatch();
	const [confirm_password, setConfirm_password] = React.useState('')
	const [email, setEmail] = React.useState('')
	const [password, setPassword] = React.useState('')
	const [username, setUsername] = React.useState('')
	const [role, setRole] = React.useState("")
	const [roles, setRoles] = React.useState([])

	const { user } = useSelector((state: any) => state.auth);
	const router = useRouter();

	React.useEffect(() => {
		if (user) {
			router.push('/reviews');
		}
	}, [user])

	React.useEffect(() => {
		Axios.get(getRoles)
			.then(response => {
				const data_role = response.data.data;

				console.log(data_role);
				setRoles(data_role);


			})
			.catch(e => {
				// Podemos mostrar los errores en la consola
				console.log(e);
			})
	}, [])

	const option = roles.map((element: any) => (
		<option value={element._id}>Soy un {element.public_name} </option>)
	)


	const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		dispatch(signupUser(email, username, password, confirm_password, role));

	}

	return (

		<div className="flex flex-col lg:flex-row justify-center">
			<div className="flex-1 bg-center bg-no-repeat bg-cover h-screen" style={{
				backgroundImage: `url('/assets/img/peace-girl.jpg')`
			}} >
				<div className="flex justify-center h-full">
					<div className="w-full self-center p-4">
						<p className="text-2xl lg:text-4xl text-white text-center p-2">Su salud es nuestra unica preocupacion, en iHappy queremos que se sienta feliz y en paz en su dia a dia. Unete a nuestra familia y se parte del cambio.</p>
					</div>
				</div>

			</div>
			<div className="flex-1 h-screen">
				<div className="flex flex-col items-center">

					<form className="flex flex-col justify-center bg-white h-screen" method="POST" onSubmit={onSubmit}>

						<p className="block text-gray-800 text-3xl lg:text-5xl text-center mb-4 lg:mb-50 px-4 py-2 capitalize">
							Unase a la familia que le cambiara la vida
						</p>

						<div className="text-gray-700 px-6 lg:px-4 py-2">

							<div className="mb-6 flex flex-row justify-center items-center">
								<div className="mr-6">
									<img className="w-8" src="/assets/icons/usuario.png" alt="" />
								</div>
								<div className="lg:w-2/5 w-full text-center">
									<input
										className="bg-white appearance-none border-2 border-purple-500 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500 capitalize"
										id="username"
										type="text"
										placeholder="username"
										onChange={e => setUsername(e.target.value)}
									/>
								</div>
							</div>

							<div className="mb-6 flex flex-row justify-center items-center">
								<div className="mr-6">
									<img className="w-8" src="/assets/icons/correo-electronico.png" alt="" />
								</div>
								<div className="lg:w-2/5 w-full text-center">
									<input
										className="bg-white appearance-none border-2 border-purple-500 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500 capitalize"
										id="email"
										type="text"
										placeholder="email"
										onChange={e => setEmail(e.target.value)}
									/>
								</div>
							</div>

							<div className="mb-6 flex flex-row justify-center items-center">

								<div className="mr-6">
									<img className="w-8" src="/assets/icons/contrasena.png" alt="" />
								</div>

								<div className="lg:w-2/5 w-full text-center">
									<input
										className="bg-white appearance-none border-2 border-purple-500 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500 capitalize"
										id="password"
										type="password"
										placeholder="******************"
										onChange={e => setPassword(e.target.value)} />
								</div>

							</div>

							<div className="mb-6 flex flex-row justify-center items-center">

								<div className="mr-6">
									<img className="w-8" src="/assets/icons/contrasena.png" alt="" />
								</div>

								<div className="lg:w-2/5 w-full text-center">
									<input
										className="bg-white appearance-none border-2 border-purple-500 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500 capitalize"
										id="confirm_password"
										type="password"
										placeholder="******************"
										onChange={e => setConfirm_password(e.target.value)} />
								</div>

							</div>

							<div className="mb-6 flex flex-row justify-center items-center">

								<div className="mr-6">
									<img className="w-8" src="/assets/icons/buscar.png" alt="" />
								</div>

								<div className="lg:w-2/5 w-full text-center">
									<select
										className="bg-white appearance-none border-2 border-purple-500 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500 capitalize"
										id="role"
										onChange={e => setRole(e.target.value)}
									>
										<option value="">Escoge el rol de tu cuenta</option>
										{option}

									</select>

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
							<p>No tienes una cuenta? <Link href="/login"><span className="cursor-pointer text-purple-500 underline">Iniciar sesión</span></Link></p>
						</div>

					</form>
				</div>

			</div>

		</div >
	)
}
