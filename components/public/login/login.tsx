import React from 'react'

export default function login() {
    return (
        <div className="flex flex-row justify-center">
            <div className="w-1/2 bg-center bg-no-repeat bg-cover h-screen" style={{
                    backgroundImage: `url('/assets/img/login-image.jpg')`
                }} >
                <div className="flex justify-center  h-screen">

                    <div className="w-2/4 self-center p-2">
                        <div className="text-4xl text-white text-justify p-2">
                            <p>‘La paz es un regalo que Dios nos regalo para ser felices; queda de nosotros si tomarla o dejarla’ - Walter Bazar</p> 
                        </div>
                    </div>
                </div>
            </div>

            <div className="w-1/2">
                <div className="flex flex-col justify-center bg-white h-screen">
                <div className="text-black text-5xl text-center mb-50 px-4 py-2 m-2">Inicia Sesion</div>
                <div className="text-gray-700  text-center  px-4 py-2 m-2">
                <div className="mt-10 mb-6 flex flex-row justify-center">
						<div className="mr-6 ">
						  <img className="w-10 h-10" src="/assets/icons/usuario.png" alt=""/> 
						</div>
						<div className="w-1/3 text-center">
						<input className="bg-white appearance-none border-2 border-purple-500 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="Username" type="text" placeholder="Username"></input>
						</div>
				</div>

				<div className="mb-6 flex flex-row justify-center">
						<div className="mr-6">
						  <img className="w-10 h-10" src="/assets/icons/contrasena.png" alt=""/> 
						</div>
						<div className="w-1/3 text-center">
						<input className="bg-white appearance-none border-2 border-purple-500 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="password "type="password" placeholder="******************"></input>
						</div>
                        
				</div>
                </div>
                <div className="text-gray-700 text-center  px-4 py-2 m-2">
                
						<button className=" shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none font-bold text-white  py-2 px-4 rounded" type="button">
							Iniciar Sesion
						</button>
						
                </div>
                
                </div>
            </div>
        </div>
    )
}
