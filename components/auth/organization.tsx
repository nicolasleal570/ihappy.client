import React from 'react'
import { Doughnut } from 'react-chartjs-2';
import { getPacients, getFacturasByPsico } from '../../utils/endpoints';
import Axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';

const  organization= () => {

    const [money, setMoney] = React.useState<Array<any>>([]);
    const [schedule, setschedule] = React.useState<Array<any>>([]);
    const {user, loading} = useSelector((state:any) => state.auth);

    

    React.useEffect(() => {

        

        if  (user){Axios.get(getFacturasByPsico(user.slug),  {
            withCredentials: true,
          })
            .then(response => {
                const data_role = response.data.data;


                console.log(data_role.factura);
                setschedule(data_role.factura)

            })
        .catch(e => {
            // Podemos mostrar los errores en la consola
            console.log(e);
        })}

        
    }, [user,loading])

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
                        <th className="w-1/3 px-4 py-2">Fecha</th>
                        <th className="w-1/3 px-4 py-2">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {

                        schedule.map(el => 
                        <tr>
                        <td className="border px-4 py-2">{el._id}</td>
                        <td className="border px-4 py-2">{el.fecha}</td>
                        <td className="border px-4 py-2">Finalizado</td>
                        </tr>)

                        

                    }
                        
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