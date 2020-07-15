import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Axios from 'axios';
import { getFacturasByPsico, putFacturaByPsico, getFacturas} from '../../utils/endpoints';
import { toast } from 'react-toastify';
import swal from 'sweetalert';
import Emoji from './partials/Emoji';

export default function mostrarFactura() {
  const [ganancias, setGanacias] = React.useState<any>();
  const [gastado, setGastado] = React.useState<any>(null);
  const [role, setRole] = React.useState('');
  const [config, setConfig] = React.useState<any>(null);
  const { user, loading, error } = useSelector((state: any) => state.auth);
  const [slug, setSlug] = React.useState('')
  const [facturasPsico, setFacturasPsico] = React.useState<any>(0)
  const [facturasUser, setFacturasUser] = React.useState<any>(0)
  const [done, setDone] = React.useState(false)
  const [consultasPsico, setConsultasPsico] = React.useState(0)
  const [consultasUser, setConsultasUser] = React.useState(0)
  const [loggedID, setLoggedID] = React.useState<any>()
  const [retirado, setRetirado] = React.useState<any>()
  const [plataforma, setPlataforma] = React.useState<any>()
  
  const dispatch = useDispatch();

  useEffect(() => {
    // obtenerDatos()
    setRole(user?.role.identification)
    setSlug(user?.slug)
    setLoggedID(user?._id)
    console.log(slug)
    var plataforma;
    plataforma = retirado - ganancias
  
    setPlataforma(plataforma)

    const obtenerDatos = () => {
      //Obtenemos las facturas
      Axios.get(getFacturasByPsico(slug), config)
        .then(response => {
          const data = response.data.data;

          setFacturasPsico(data)
          setConsultasPsico(data.factura.length)
        })
        .catch(e => {
          // Podemos mostrar los errores en la consola

        })


        Axios.get(getFacturas, config)
        .then(response => {
          const data = response.data.data;

          setFacturasUser(data)
          
        })
        .catch(e => {
          // Podemos mostrar los errores en la consola

        })

    }

    obtenerDatos()
   

  }, [user]);

  const calcularGanacias = () => {
    var ingresos: any = []
    var retirado: any = []
    if (facturasPsico) {
      facturasPsico.factura.forEach((element: any) => {
        ingresos = ingresos.concat(element.total * 0.90)
        if(element.paid){
          retirado = retirado.concat(element.total *0.90)
        }
      });
      console.log(ingresos)
      console.log(retirado)
      const add = (a: any, b: any) => {
        return a + b;
      }
      if (!done) {
        setGanacias(ingresos.reduce(add, 0))
        setRetirado(retirado.reduce(add,0))
        setDone(true)
      }
      
      // setGanacias(ingresos.reduce(function(a:any, b:any) { return a + b; }, 0));
    }
  }

  const calcularGanaciasUsario = () => {
    var ingresos: any = []
    if (facturasUser.length >= 0) {
      
      facturasUser.forEach((element: any) => {
        if(element.user._id===user._id){
        ingresos = ingresos.concat(element.total * 0.90)
        }
      });
      const add = (a: any, b: any) => {
        return a + b;

      }
    
      if (!done) {
        setConsultasUser(ingresos.length)
        setGanacias(ingresos.reduce(add, 0))
        setDone(true)
      }
      // setGanacias(ingresos.reduce(function(a:any, b:any) { return a + b; }, 0));
    }
  }
  
  if(role === 'psicologo'){
    calcularGanacias()
    }else if(role=== 'usuario'){
      calcularGanaciasUsario()
    }

  React.useEffect(() => {
    setConfig({
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    });
  }, []);

  const solicitarPago = () => {
    console.log(loggedID)
    Axios.put(putFacturaByPsico(slug),
    {
    requestToPay:true,
    psicoID: loggedID,

    },
    config)
      .then(response => {
        swal(
          'Recibimos tu solicitud para retirar fondos',
          'Estamos procesando su transferencia, realizaremos el pago lo mas pronto posible.',
          'success'
        );
      })
      .catch(e => {
        // Podemos mostrar los errores en la consola

      })
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    solicitarPago()
  }

  return (
    <>
      <div className='ml-10 mt-10'>
        {role === 'psicologo' && (
          <div>
            <h1 className='text-4xl font-bold'>Ganancias</h1>
            <hr className='border border-2 bg-purple-700 w-64'></hr>
            <div className='bg-gray-100 py-2 px-2 mt-3 rounded-lg shadow-md max-w-xl'>
            <h1 className="text-2xl pt-5">Totales: ${ganancias}</h1>
            <h1 className="text-2xl">En la plataforma: ${ganancias-retirado}</h1>
            <h1 className="text-2xl">Retiradas: ${retirado}</h1>
            <h1 className="text-2xl pb-5">Consultas realizadas: {consultasPsico}</h1>
            </div>
            <form method='PUT' onSubmit={handleSubmit}>
            
              { plataforma === 0 
                ?  <button className="w-full cursor-not-allowed lg:w-auto py-2 my-4 bg-gray-800 text-white block shadow focus:outline-none py-2 px-4 rounded"
                type="submit" disabled>Retirar ganancias</button>
                : 
                <button 
                onClick={(e) => handleSubmit}
                className="w-full lg:w-auto py-2 my-4 bg-purple-700 text-white block shadow focus:outline-none py-2 px-4 rounded"
                type="submit"
              >
                Retirar ganancias
                 </button>
              }
                
       
            </form>
            <img className='w-48 mt-5 h-18' src='/assets/img/stripe.png' alt='stripe'></img>
          </div>
        )}
        {role === 'usuario' && (
          <div>
            <h1 className='text-4xl font-bold'>Gastos</h1>
            <hr className='border border-2 bg-purple-700 w-64'></hr>
            <h1 className="text-2xl mt-5">Totales: ${ganancias}</h1>
            <h1 className="text-2xl">Consultas realizadas: {consultasUser}</h1>
           

            <h4 className='mt-5'>Esperemos que su tiempo en iHappy, haya sido de mejoras <Emoji symbol='💪'></Emoji></h4>
          </div>
        )}
      </div>
    </>
  )
}
