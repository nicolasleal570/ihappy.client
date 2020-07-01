import React from 'react'
import { Doughnut } from 'react-chartjs-2';
import { getDoctors,getPacients, getSpecialty } from '../../utils/endpoints';
import Axios from 'axios';



const  stats= () => {

    const [doctors, setDoctors] = React.useState<Array<any>>([]);
    const [pacients, setPacients] = React.useState<Array<any>>([]);
    const [specialty, setSpecialty] = React.useState<Array<any>>([]);
    const [numberSpecialty, setnumberSpecialty] = React.useState<Array<any>>([]);



    React.useEffect(() => {

        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }

        Axios.get(getDoctors(), config)
            .then(response => {
                const data_role = response.data.data;


                console.log(data_role);
                setDoctors(data_role);

            })
        
        Axios.get(getSpecialty, config)
            .then(response => {
                const data_role = response.data.data;


                console.log(data_role);
                setSpecialty(data_role);

               
    
                

            })

            
        
    }, [])

    React.useEffect(() => {

        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }

        Axios.get(getPacients, config)
            .then(response => {
                const data_role = response.data.data;


                console.log(data_role);
                setPacients(data_role);

            })
            .catch(e => {
                // Podemos mostrar los errores en la consola
                console.log(e);
            })
    }, [])

    

    const data = {
        datasets: [{
            data: [doctors.length, pacients.length],
            backgroundColor: [
                '#FF6384',
                '#36A2EB'
                ],
                hoverBackgroundColor: [
                '#FF6384',
                '#36A2EB'
                ]
        }],
    
        // These labels appear in the legend and in the tooltips when hovering different arcs
        labels: [
            'Doctors',
            'Pacientes'
        ]
    };

    return (
        <div>
            <h2>Doctores vs Pacientes</h2>
            <Doughnut data={data} />
        </div>
    )
}

export default stats
