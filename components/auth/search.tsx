import React from 'react'
import { getSpecialty, getUsers } from '../../utils/endpoints';
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

    

    const [specialty, setSpecialty] = React.useState<any>([]) //Este trae todas las especialidades 
    const [lookFor, setLookFor] = React.useState<any>([]) //Este indica cual es la que quiere el usuario
    const [psico, setPsico] = React.useState<any>([])     //Este muestra los que quiere el usuario 
    const [psicoAll, setPsicoAll] = React.useState<any>([]) //Este siempre tiene todos para no tener que hace mil peticiones al backend

    
    

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
    

    React.useEffect(() => {

        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }

		Axios.get(getUsers,config)
			.then(response => {
                const data_role = response.data.data;
                const data_real = [];
                
                for (let index = 0; index < data_role.length; index++) {

                    if (data_role[index].role?.identification=='psicologo') {
        
                        console.log(data_role[index]);
                        
                        
        
                       data_real[data_real.length] = data_role[index]
        
                        
                        
                    }
        
                    
                    
                }

				console.log(data_real);
                setPsico(data_real);
                setPsicoAll(data_real);

			})
			.catch(e => {
				// Podemos mostrar los errores en la consola
				console.log(e);
			})
	}, [])

    const option = specialty.map((element: any) => (
		<option value={element._id}> {element.name} </option>)
    )
    
    const psica = psico.map((element: any) => (
		<Psychologists
                                    name={element.slug}
                                    imgUrl={element.avatar}
                                />
    ))

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        var temp: Array <any> = [];
        
        console.log(temp.length);

        for (let index = 0; index < psicoAll.length; index++) {

            if (psicoAll[index].role?.identification=='psicologo') {

                console.log(psicoAll[index]);
                
                

                for (let ind = 0; ind < psicoAll[index].speciality.length; ind++) {
                    console.log('entre al for two');
                    if (psicoAll[index].speciality[ind]._id == lookFor) {
                        console.log(psicoAll[index]);
                        temp [temp.length] =  psicoAll[index];
                    }
                    
                }

                
                
            }

            
            
        }

        console.log(temp);

        setPsico(temp);
    }

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

                        <form method="GET" onSubmit={onSubmit}> 

                        <div className="flex justify-around mt-4 mb-8">

                            <div className=" flex flex-row text-center">
                            <div className="mr-6">
									<img className="w-10 h-10" src="/assets/icons/buscar.png" alt="" />
								</div>
                                <select 
                                className='bg-white  border-2 border-purple-500 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500'
                                onChange={e => setLookFor(e.target.value)}>

                                    <option>Especialidad</option>
                                    {option}

                                </select>
                            </div>

                            <div className="text-center">
                                <button 
                                className="w-full lg:w-auto mx-auto block shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none font-bold text-white py-2 px-4 rounded"
                                type="submit">
                                    Enviar
                                </button>
                            </div>

                        </div>

                        </form>

                        <hr></hr>
                        
                        <div className='grid grid-cols-4 gap-4 mt-8'>

                        
                            {psica}
                            
                        
                            

                        </div>

                            

                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default search
