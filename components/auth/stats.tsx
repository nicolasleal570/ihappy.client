import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
  getDoctors,
  getPacients,
  getCountDoctorsBySpeciality,
} from '../../utils/endpoints';
import Axios from 'axios';

const stats = () => {
  const [doctors, setDoctors] = React.useState<Array<any>>([]);
  const [pacients, setPacients] = React.useState<Array<any>>([]);
  const [specialty, setSpecialty] = React.useState<Array<any>>([]);
  const [numberSpecialty, setnumberSpecialty] = React.useState<Array<any>>([]);

  React.useEffect(() => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    };

    Axios.get(getDoctors(), {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    }).then((response) => {
      const data_role = response.data.data;

      console.log(data_role);
      setDoctors(data_role);
    });

    Axios.get(getCountDoctorsBySpeciality, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    }).then((response) => {
      const data_role = response.data.data;

      let temp = [];
      let tempo = [];
      for (let index = 0; index < data_role.length; index++) {
        tempo[index] = data_role[index]._id;
        temp[index] = data_role[index].count;
      }

      console.log(temp);
      console.log(tempo);
      setnumberSpecialty(temp);
      setSpecialty(tempo);
    });
  }, []);

  React.useEffect(() => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    };

    Axios.get(getPacients, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    })
      .then((response) => {
        const data_role = response.data.data;

        console.log(data_role);
        setPacients(data_role);
      })
      .catch((e) => {
        // Podemos mostrar los errores en la consola
        console.log(e);
      });
  }, []);

  const data = {
    datasets: [
      {
        data: [doctors.length, pacients.length],
        backgroundColor: ['#FF6384', '#36A2EB'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB'],
      },
    ],

    // These labels appear in the legend and in the tooltips when hovering different arcs
    labels: ['Doctors', 'Pacientes'],
  };

  const dato = {
    datasets: [
      {
        data: numberSpecialty,
        backgroundColor: [
          '#00876c',
          '#4c9c85',
          '#78b19f',
          '#a0c6b9',
          '#c8dbd5',
          '#f1f1f1',
          '#f1cfce',
          '#eeadad',
          '#e88b8d',
          '#df676e'


        ],
        hoverBackgroundColor: [
          '#00876c',
          '#4c9c85',
          '#78b19f',
          '#a0c6b9',
          '#c8dbd5',
          '#f1f1f1',
          '#f1cfce',
          '#eeadad',
          '#e88b8d',
          '#df676e'
        ],
      },
    ],

    // These labels appear in the legend and in the tooltips when hovering different arcs
    labels: specialty,
  };

  return (
    <div className="flex flex-col">
      <div className=" text-left  px-4 py-8 m-2">
        <h2 className="underline  text-4xl my-2">Doctores vs Pacientes</h2>
        <Doughnut data={data} />
      </div>

      <div className=" text-left  px-4 py-2 m-2">
        <h2 className=" underline text-4xl my-2">Tipos de Doctores</h2>
        <Doughnut data={dato} />
      </div>
    </div>
  );
};

export default stats;
