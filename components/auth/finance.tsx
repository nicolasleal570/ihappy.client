import React from 'react';
import CountUp from 'react-countup';
import { getFacturas, putFacturaByPsicoPaid } from '../../utils/endpoints';
import Axios from 'axios';
import swal from 'sweetalert';


const finance = () => {
  let numo: number;

  const [stats, setStats] = React.useState<Array<any>>([]);
  const [money, setMoney] = React.useState<number>(0);
  const [ingresoTotal, setIngresoTotal] = React.useState<number>(0)
  const [aux, setAux] = React.useState<boolean>(false)
  const [slug, setSlug] = React.useState<any>()
  const [config, setConfig] = React.useState<any>()
  const [card, setCard] = React.useState<boolean>(false)
  const [psicoID, setPsicoID] = React.useState<any>()
  React.useEffect(() => {


    setConfig({
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    });


    Axios.get(getFacturas, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    })
      .then((response) => {
        const data_role = response.data.data;

        let total = 0;
        for (let index = 0; index < data_role.length; index++) {
          total = total + data_role[index].total;
        }

        total = total * 0.1;

        numo = total;
        setIngresoTotal(total / 0.1)
        setMoney(total);

        setStats(data_role);
      })
      .catch((e) => {
        // Podemos mostrar los errores en la consola
      });
  }, []);


  const payPsico = () => {

    Axios.put(putFacturaByPsicoPaid(slug),
      {
        paid: true,
        psicoID:psicoID
      },
      config)
      .then(response => {
        swal(
          'Se le ha pagado al psicologo',
          'Transferencia realizada.',
          'success'
        );
      })
      .catch(e => {
        // Podemos mostrar los errores en la consola
        swal(
          'No se logro pagar al psicologo',
          'Transferencia fallida',
          'error'
        );
      })
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()
    payPsico()
  }
  const onChange = (e: any) => {
    setCard(true)
    setAux(true)
    setSlug(e.target.value)
  }

  return (
    <div className="flex flex-col ml-10 h-full">
      <h1 className='text-4xl mt-10 font-bold'>Ganancias</h1>
      <hr className='border border-2 bg-purple-700 w-64'></hr>
      <div className=" text-left  px-4  flex flex-row">
        <h2 className="text-3xl py-1">
          Ingresos totales hasta la fecha: $<CountUp end={ingresoTotal} />
        </h2>
      </div>
      <div className=" text-left  px-4 pb-10 flex flex-row">
        <h2 className="text-3xl py-1">
          Ganancias: $<CountUp end={money} />
        </h2>

      </div>
      <div className="px-4 ">
        <h1 className=" text-3xl ">Historial de Compras</h1>
      </div>
       <div className="flex justify-center">
        <table className="table-fixed">
          <thead>
            <tr>
              <th className="w-1/5 px-4 py-2">Orden</th>
              <th className="w-1/5 px-4 py-2">Total</th>
              <th className="w-1/5 px-4 py-2">A pagar</th>
              <th className='w-1/5 px-4 py-2'>Pagado</th>
            </tr>
          </thead>
          <tbody>
            {stats.map((el) => (
              <tr>
                <td className="border bg-gray-100 px-4 py-2">{el._id}</td>
                <td className="border bg-gray-100 px-4 py-2">{el.psicologo.username}</td>
                <td className="border bg-gray-100 px-4 py-2">{el.user.username} </td>
                <td className="border bg-gray-100 px-4 py-2">${el.total}</td>
                <td className="border bg-gray-100 px-4 py-2">${el.total * 0.90}</td>
                <td className="border bg-gray-100 px-4 py-2">{el.paid && (
                  <div>
                    Si
                  </div>
                )}
                  {!el.paid && (
                    <div>
                      No
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <h1 className=" text-3xl pt-5">Solicitudes de pago</h1>
      <select className='shadow-sm border-gray-400 rounded block w-64 text-gray-700 border mt-5 px-4 mb-1 leading-tight overflow-y-auto custom-scroll
                        focus:bg-white'
        onChange={onChange}>
        <option>Selecciona</option>
        {stats.map((el) => (
          <>
            {el.requestToPay && !el.paid && (
              <option value={el.psicologo.slug} key={el.psicologo.slug} >
                {el.psicologo.username}
              </option>
            )}
          </>
        ))}
      </select>
      {card && (

        <div className=''>
          {stats.map((el) => (
            <>
              {el.psicologo.slug === slug && (
                <div className='max-w-lg h-32 bg-gray-100 mt-5 justify-left shadow-md rounded-md'>
                  {aux && (
                    <>
                    {setPsicoID(el.psicologo._id)}
                    {setAux(false)}
                    </>
                  )}
                  <h1 className='text-xl text-center font-semibold px-2 py-2'>Factura</h1>
                  <div className='flex'>
                    <div className='container'>
                    <hr className='bg-purple-700'></hr>
                      <div className='flex'>
                        <h1 className='text-lg px-2'>Psicologo a realizarle el pago:  </h1>
                        <h1 className='font-bold text-lg px-2'>  {el.psicologo.first_name + ' ' + el.psicologo.last_name} </h1>
                      </div>
                      <div className='flex'>
                        <h1 className='text-lg px-2 '>Cantidad a pagar: </h1><h1 className='font-bold'>$ {el.total * 0.90}</h1>
                      </div>
                    </div>
                    <div>
                      {el.psicologo.avatar && (
                        <div>
                        <hr className='bg-purple-700'></hr>
                      <img  className="bg-purple-700 w-12 h-12 m-2 rounded-full overflow-hidden flex justify-center items-center" src={el.psicologo.avatar}></img>
                      </div>
                      )}
                      </div>
                  </div>
                </div>
              )}
            </>
          ))}

        </div>
      )}
      <form method='PUT' onSubmit={handleSubmit}>
      <button
        onClick={(e) => handleSubmit}
        className="w-20 max-w-md lg:w-full py-2 my-4 bg-purple-700 text-white block shadow focus:outline-none py-2 px-4 rounded"
        type="submit"
      >
        Pay
        </button>
        </form>
    </div>


  );
};

export default finance;
