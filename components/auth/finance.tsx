import React from 'react'
import { Doughnut } from 'react-chartjs-2';
import { getDoctors,getPacients, getSpecialty,getCountDoctorsBySpeciality } from '../../utils/endpoints';
import Axios from 'axios';

const  finance= () => {

    const [money, setMoney] = React.useState<Array<any>>([]);

    // React.useEffect(() => {

    //     const config = {
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Authorization': `Bearer ${localStorage.getItem('token')}`
    //         }
    //     }

    //     Axios.get(getPacients,  {
    //         withCredentials: true,
    //       })
    //         .then(response => {
    //             const data_role = response.data.data;


    //             console.log(data_role);
    //             setMoney(data_role);

    //         })
    //         .catch(e => {
    //             // Podemos mostrar los errores en la consola
    //             console.log(e);
    //         })
    // }, [])

    return (
        <div className='flex flex-col'>
            <div className=" text-left  px-4 py-8 m-2 flex flex-row">
            
    <h2 className='underline  text-4xl my-2'>Ingresos totales hasta la fecha:</h2>
    <h2 className='  text-4xl px-4 my-2'> 888$</h2>    
            

            </div>
            <div className="px-4 justify-center">
                <h1 className='underline text-4xl'>Status de Compras</h1>
                <table className="table-fixed">
                    <thead>
                        <tr>
                        <th className="w-1/5 px-4 py-2">Orden</th>
                        <th className="w-1/5 px-4 py-2">Psicologo</th>
                        <th className="w-1/5 px-4 py-2">Paciente</th>
                        <th className="w-1/5 px-4 py-2">Status</th>
                        <th className="w-1/5 px-4 py-2">Metodo</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        <td className="border px-4 py-2">Intro to CSS</td>
                        <td className="border px-4 py-2">Adam</td>
                        <td className="border px-4 py-2">858</td>
                        <td className="border px-4 py-2">Adam</td>
                        <td className="border px-4 py-2">858</td>
                        </tr>
                        <tr>
                        <td className="border px-4 py-2">Intro to CSS</td>
                        <td className="border px-4 py-2">Adam</td>
                        <td className="border px-4 py-2">858</td>
                        <td className="border px-4 py-2">Adam</td>
                        <td className="border px-4 py-2">858</td>
                        </tr>
                        <tr>
                        <td className="border px-4 py-2">Intro to CSS</td>
                        <td className="border px-4 py-2">Adam</td>
                        <td className="border px-4 py-2">858</td>
                        <td className="border px-4 py-2">Adam</td>
                        <td className="border px-4 py-2">858</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default finance
