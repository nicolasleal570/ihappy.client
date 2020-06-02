import React from 'react';
import Axios from 'axios';
import {getRoles} from '../../../utils/endpoints';
import { useDispatch, useSelector } from 'react-redux';
import { signupUser } from '../../../store/actions/signupAction';
import { useRouter } from 'next/router';




export default function signup() {



	const dispatch = useDispatch();
	const [confirm_password, setConfirm_password] = React.useState('')
	const [email, setEmail] = React.useState('')
	const [password, setPassword] = React.useState('')
	const [username, setUsername] = React.useState('')
	const [role  , setRole] = React.useState("")
	const [roles  , setRoles] = React.useState([])

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
		})},[])

		const option= 
			roles.map(element => (<option value={element._id}> {element.public_name} </option>) )
		

    const onSubmit = (e: React.FormEvent<HTMLInputElement>) => {
        e.preventDefault();

        dispatch(signupUser(email,username, password,confirm_password,role));

    }

	return (
		
		<div>
			<div className="flex ">
				<div className="w-1/2 bg-center bg-no-repeat bg-cover h-screen" style={{
					backgroundImage: `url('/assets/img/peace-girl.jpg')`
				}} >
					<div className="flex justify-center  h-screen">

						<div className="w-2/4 self-center p-2">
							<div className="text-4xl text-white text-justify p-2">
								Su salud es nuestra unica preocupacion, en iHappy queremos que se sienta feliz y en paz en su dia a dia. Unete a nuestra familia y se parte del cambio.
                            </div>
						</div>

					</div>

				</div>
				<div className="w-1/2 flex flex-col items-center h-screen ">


					<div className="mt-16 w-2/4 bg-white ">
						<p className="text-4xl text-black text-center">Unase a la familia que le cambiara la vida</p>
					</div>

					<form className="items-center"method="POST" onSubmit={onSubmit}>

						<div className="mt-16 mb-6 flex flex-row items-center">
							<div className="mr-6">
								<img className="w-8 h-6" src="/assets/icons/usuario.png" alt="" />
							</div>
							<div className="w-11/12 text-center">
								<input className="bg-white appearance-none border-2 border-purple-500 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
								 id="username" type="text" placeholder="username" onChange={e => setUsername(e.target.value)}/>
							</div>
						</div>

						

						<div className="mb-6 flex flex-row items-center">
							<div className="mr-6">
								<img className="w-8 h-6" src="/assets/icons/correo-electronico.png" alt="" />
							</div>
							<div className="w-11/12 text-center">
								<input className="bg-white appearance-none border-2 border-purple-500 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" 
								id="email" type="text" placeholder="email" onChange={e => setEmail(e.target.value)}/>
							</div>
						</div>

						<div className="mb-6 flex flex-row items-center">

							<div className="mr-6">
								<img className="w-8 h-6" src="/assets/icons/contrasena.png" alt="" />
							</div>

							<div className="w-11/12">
								<input className="bg-white appearance-none border-2 border-purple-500 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" 
								id="password" 
								type="password" 
								placeholder="******************" 
								onChange={e => setPassword(e.target.value)}/>
							</div>

						</div>

						<div className="mb-6 flex flex-row items-center">

							<div className="mr-6">
								<img className="w-8 h-6" src="/assets/icons/contrasena.png" alt="" />
							</div>

							<div className="w-11/12">
								<input className="bg-white appearance-none border-2 border-purple-500 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" 
								id="confirm_password" 
								type="password" 
								placeholder="******************" 
								onChange={e => setConfirm_password(e.target.value)}/>
							</div>

						</div>

						<div className="mb-6 flex flex-row items-center">

							<div className="mr-6">
								<img className="w-8 h-6" src="/assets/icons/buscar.png" alt="" />
							</div>

							<div className="w-11/12">
								<select className="bg-white appearance-none border-2 border-purple-500 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="role" onChange={e => setRole(e.target.value)}>

									{option}

								</select>

							</div>
						</div>
						<div className="justify-center">

							<div className="w-4/5 text-center">
								<button className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="submit">
									Registrarse
						</button>
							</div>
						</div>
						<div className="items-center">

							<div className="w-4/5 text-center">
								<button className="mt-4 shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-xs text-white  py-2 px-4 rounded" type="button">
									Iniciar Sesion
						</button>
							</div>
						</div>



					</form>

				</div>

			</div>
		</div>
	)
}
