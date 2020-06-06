import React from 'react'
import { getSpecialty } from '../../utils/endpoints';
import { useDispatch, useSelector } from 'react-redux';
import Axios from 'axios';


interface Psychologists {
    name: String;
    imgUrl: string;
}

const Psychologists = ({ name, imgUrl }: Psychologists) => (
    <div className='container'>
        <div className="flex flex-col">
            <img src={imgUrl} className="w-48 ml-10" alt="Doctors" />
            <h3 className="font-bold capitalize ml-20">{name}</h3>
        </div>
    </div>
);



function search() {

    const [specialty, setSpecialty] = React.useState([])
    const [psico, setPsico] = React.useState([])

    React.useEffect(() => {
		Axios.get(getSpecialty)
			.then(response => {
				const data_role = response.data.data;

				console.log(data_role);
				setSpecialty(data_role);

			})
			.catch(e => {
				// Podemos mostrar los errores en la consola
				console.log(e);
			})
	}, [])

    const option = specialty.map((element: any) => (
		<option value={element._id}> {element.name} </option>)
    )
    
   

    return (
        <div className="flex text-gray-800">

            <div className="w-1/5 bg-purple-700 h-screen">
            
            </div>
            <div className="w-screen flex">
                <div className="w-5/5 ml-20 bg-white w-full">
                    <div className='relative h-screen flex flex-col  ' >
                        <div>
                        <div className="flex justify-center mt-8 mb-20">
                            
                            <h1 className='text-center text-3xl	'>¿Que Tipo de Psicologo Estas Buscando?</h1>
                        </div>

                        <form method="GET"> 

                        <div className="flex justify-around mt-4 mb-8">

                            <div className=" flex flex-row text-center">
                            <div className="mr-6">
									<img className="w-10 h-10" src="/assets/icons/buscar.png" alt="" />
								</div>
                                <select 
                                className='bg-white  border-2 border-purple-500 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500'>

                                    <option>Especialidad</option>
                                    {option}

                                </select>
                            </div>

                            <div className="text-center">
                                <button 
                                className="w-full lg:w-auto mx-auto block shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none font-bold text-white py-2 px-4 rounded">
                                    Enviar
                                </button>
                            </div>

                        </div>

                        </form>

                        <hr></hr>
                        
                        <div className='grid grid-cols-4 gap-4 mt-8'>

                        <div>
                            <Psychologists
                                        name='Dr. Luis Silva'
                                        imgUrl='/assets/icons/profile.svg'
                                    />
                            </div>
                        
                            <div>
                            <Psychologists
                                        name='Dr. Luis Silva'
                                        imgUrl='/assets/icons/profile.svg'
                                    />
                            </div>

                            <div>
                            <Psychologists
                                        name='Dr. Luis Silva'
                                        imgUrl='/assets/icons/profile.svg'
                                    />
                            </div>

                            <div>
                            <Psychologists
                                        name='Dr. Luis Silva'
                                        imgUrl='/assets/icons/profile.svg'
                                    />
                            </div>

                        </div>

                            

                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default search
