import React from 'react'
import CountUp from 'react-countup';
import { getFacturas,getPacients, getSpecialty,getCountDoctorsBySpeciality } from '../../utils/endpoints';
import Axios from 'axios';


const tablon = ({a}:any,{b}:any ) =>{
    
                <tbody>
                    <tr>
                    <td className="border px-4 py-2">{a}</td>
                    <td className="border px-4 py-2">{b}</td>
                    </tr>
                </tbody>
            
}

interface statsData {
    id: string,
    total: number
}



const  finance= () => {

    
    let numo: number;
    
    const [stats, setStats] = React.useState<Array<any>>([]);
    const [money, setMoney] = React.useState<number>(0);

    React.useEffect(() => {

        

        Axios.get(getFacturas,  {
            withCredentials: true,
          })
            .then(response => {
                const data_role = response.data.data;


                console.log(data_role);
                let total = 0
                for (let index = 0; index < data_role.length; index++) {

                    total= total+data_role[index].total
                }

                total = total*.1

                numo = total

                setMoney(total);

                setStats(data_role);
                

            })
            .catch(e => {
                // Podemos mostrar los errores en la consola
                console.log(e);
            })
    }, [])

    

    return (
        <div className='flex flex-col'>
            <div className=" text-left  px-4 py-8  flex flex-row">
            
                <h2 className='text-4xl my-2'>Ingresos totales hasta la fecha:  $<CountUp end={money} /></h2>
            

            </div>
            <div className="px-4 ">
                <h1 className=' text-4xl'>Historial de Compras</h1>
                
                
            </div>
            <div className='flex justify-center'>
            
            <table className="table-fixed">
                <thead>
                    <tr>
                    <th className="w-1/5 px-4 py-2">Orden</th>
                    <th className="w-1/5 px-4 py-2">Psicologo</th>
                    <th className="w-1/5 px-4 py-2">Paciente</th>
                    <th className="w-1/5 px-4 py-2">Total</th>
                    </tr>
                </thead>
                <tbody>
                    {

                    stats.map(el => <tr>
                        <td className="border px-4 py-2">{el._id}</td>
                        <td className="border px-4 py-2">{el.psicologo.username}</td>
                        <td className="border px-4 py-2">{el.user.username} </td>
                        <td className="border px-4 py-2">${el.total}</td>
                        </tr>)

                        

                    }
                    
                </tbody>
            </table>
           
            </div>
        </div>
    )
}

export default finance
