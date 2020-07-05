import React from 'react'
import { Doughnut } from 'react-chartjs-2';
import { getDoctors,getPacients, getSpecialty,getCountDoctorsBySpeciality } from '../../utils/endpoints';
import Axios from 'axios';

const  organization= () => {

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

    const data = {
        labels: [
            'Consultas Activas',
            'Consultas Finalizadas'
        ],
        datasets: [{
            data: [300, 50],
            backgroundColor: [
            '#FF6384',
            '#36A2EB'
            ],
            hoverBackgroundColor: [
            '#FF6384',
            '#36A2EB'
            ]
        }]
    };

    return (
        <div className='flex flex-col'>
            

            <div className="flex justify-center text-left  px-4 py-8 m-2">
            
            <table className="table-fixed">
                    <thead>
                        <tr>
                        <th className="w-1/3 px-4 py-2">Orden</th>
                        <th className="w-1/3 px-4 py-2">Cliente</th>
                        <th className="w-1/3 px-4 py-2">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        <td className="border px-4 py-2">858</td>
                        <td className="border px-4 py-2">Adam</td>
                        <td className="border px-4 py-2">Activa</td>
                        </tr>
                        <tr>
                        <td className="border px-4 py-2">858</td>
                        <td className="border px-4 py-2">Yacob</td>
                        <td className="border px-4 py-2">Activa</td>
                        </tr>
                        <tr>
                        <td className="border px-4 py-2">858</td>
                        <td className="border px-4 py-2">Pascual</td>
                        <td className="border px-4 py-2">Finalizada</td>
                        </tr>
                    </tbody>
                </table>
            
    
            </div>

            <div className="flex text-4xl text-left  px-4 py-8 m-2">
                <h1 className='underline'>Finalizadas vs Activas</h1>
            </div>

            <div className="flex justify-center  px-4 py-8 m-2">
            <Doughnut data={data} />
            </div>

        </div>
    )
}

export default organization