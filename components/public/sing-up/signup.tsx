import React from 'react'

export default function signup() {
    return (
        <div>
            <div className="flex mb-4">
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

                <form className="items-center" action="">

                <div className="mt-16 mb-6 flex flex-row items-center">
						<div className="mr-6">
						  <img className="w-8 h-6" src="/assets/icons/usuario.png" alt=""/> 
						</div>
						<div className="w-11/12 text-center">
						<input className="bg-white appearance-none border-2 border-purple-500 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="Username" type="text" placeholder="Username"></input>
						</div>
				</div>

				<div className="mb-6 flex flex-row items-center">
						<div className="mr-6">
						  <img className="w-8 h-6" src="/assets/icons/correo-electronico.png" alt=""/> 
						</div>
						<div className="w-11/12 text-center">
						<input className="bg-white appearance-none border-2 border-purple-500 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="Email" type="text" placeholder="Email"></input>
						</div>
				</div>
				
				<div className="mb-6 flex flex-row items-center">

						<div className="mr-6">
						<img className="w-8 h-6" src="/assets/icons/contrasena.png" alt=""/>
						</div>

						<div className="w-11/12">
						<input className="bg-white appearance-none border-2 border-purple-500 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-username" type="password" placeholder="******************"></input>
						</div>

				</div>

						<div className="mb-6 flex flex-row items-center">

						<div className="mr-6">
						<img className="w-8 h-6" src="/assets/icons/buscar.png" alt=""/>
						</div>

						<div className="w-11/12">
						<select className="bg-white appearance-none border-2 border-purple-500 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" >
								
    							<option>Quiero brindar atencion psicologica</option>
								<option>Quiero recibir atencion psicologica</option>
    							
  							</select>
  							
						</div>
						</div>
					<div className="items-center">
						
						<div className="w-4/5 text-center">
						<button className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="button">
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
