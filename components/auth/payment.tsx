import React from 'react';
import {
  getFactura,
  postFactura,
  getConversations,
} from '../../utils/endpoints';
import axios from 'axios';
import { BigLoader } from '../Loader';
import { loadStripe, StripeCardElement } from '@stripe/stripe-js';
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { useSelector } from 'react-redux';
import swal from 'sweetalert';
interface PsychologistHeaderProps {
  psychologist: {
    first_name: string;
    last_name: string;
    cedula: Number;
    address: string;
    email: string;
    username: string;
    password: string;
    slug: string;
    role: string;
    bio: string;
    avatar: string;
    created_at: any;
    _id: any;
    precioConsulta: any;
  };
}

const PsychologistHeader = ({ psychologist }: PsychologistHeaderProps) => {
  const {
    first_name,
    last_name,
    cedula,
    address,
    email,
    username,
    password,
    slug,
    role,
    bio,
    avatar,
    created_at,
    _id,
    precioConsulta,
  } = psychologist;

  return (
    <>
      <div className="container ml-5">
        <h1 className="font-bold capitalize text-2xl block w-full"></h1>
      </div>
    </>
  );
};

export default function Payment({ slug }: any) {
  const [idUsuario, setIdUsuario] = React.useState('');
  const [loading, setLoading] = React.useState(true);
  const [infoPsicologo, setInfoPsicologo] = React.useState<any>(null);
  const { user, error } = useSelector((state: any) => state.auth);
  const [paymentDone, setPaymentDone] = React.useState('');

  // Making request to get data of psychologist
  React.useEffect(() => {
    setIdUsuario(user?._id);
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    };
    const loadData = async function () {
      try {
        if (slug) {
          const res = await axios.get(getFactura(slug + ''), config);
          setInfoPsicologo(res.data.data.psicologo);
          console.log(res);
          console.log(infoPsicologo);
          setLoading(false);
        }
      } catch (err) {
        console.log('error', err);
      }
    };
    loadData();
  }, [slug]);

  const stripePromise = loadStripe(
    'pk_test_51H1MAEHa17GfKEWJDyZm4r17vpy7WjvO2HjMehXKJY9W0iIYSvPdgFk8QcNxXLRXZHpjI9BFpVHbC3Tm4SdDw3Gd00iBeUXIQV'
  );

  const [requestConversation, setRequestConversation] = React.useState(false);

  const solicitarChat = async () => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    };
    console.log('algopasa');
    setRequestConversation(true);
    axios
      .post(
        getConversations,
        {
          participants: [infoPsicologo._id],
          last_message: '',
        },
        config
      )
      .then((res) => {
        console.log(res.data);
        setRequestConversation(false);
      })
      .catch((err) => {
        console.log(err);
        setRequestConversation(false);
      });
  };

  const CheckoutForm = ({ payment, onSubmit }: any) => {
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (event: any) => {
      event.preventDefault();
      if (!stripe || !elements) {
        return;
      }

      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: elements.getElement(CardElement) as StripeCardElement,
      });

      if (!error) {
        if (paymentMethod) {
          const { id } = paymentMethod;

          try {
            const enviarDatos = async () => {
              const config = {
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: 'Bearer ' + localStorage.getItem('token'),
                },
              };

              axios
                .post(
                  postFactura,
                  {
                    id: id,
                    amount: infoPsicologo.precioConsulta * 100,
                    slug_psicologo: infoPsicologo.slug,
                  },
                  config
                )
                .then((res) => {
                  console.log(res.data);
                  {
                    payment();
                  }
                  {
                    onSubmit();
                  }
                  swal(
                    'Su pago ha sido exitoso',
                    'Gracias por confiar en iHappy!',
                    'success'
                  );
                })
                .catch((err) => {
                  console.log(err);
                  swal(
                    'Upss! Algo anda mal',
                    'La transacción no se ha logrado',
                    'error'
                  );
                });
            };
            enviarDatos();
          } catch (error) {
            console.log(error);
          }
        }
      }
    };
    return (
      <form
        onSubmit={handleSubmit}
        className="pt-5 pb-5"
        style={{ maxWidth: '400px', margin: '' }}
      >
        <div className="flex">
          <h1 className="font-semibold text-xl text-gray-800">Psicologo:</h1>
          <h1 className="font-semibold text-xl pl-4 text-gray-800">
            {`${infoPsicologo.first_name}`} {`${infoPsicologo.last_name}`}
          </h1>
          <img
            src={infoPsicologo.avatar}
            style={{ maxWidth: '30px' }}
            className=" ml-5 rounded"
          ></img>
        </div>
        <div className="flex">
          <h2 className="font-semibold text-xl py-4 text-gray-800">
            Precio de consulta:
          </h2>
          <h2 className="font-semibold text-xl pl-4 py-4 text-gray-800">
            {`${infoPsicologo.precioConsulta}`} USD
          </h2>
        </div>
        <CardElement className="bg-gray-200 py-4" />

        <button
          onClick={(e) => handleSubmit}
          className="w-full lg:w-auto py-2 my-4 bg-purple-700 text-white block shadow focus:outline-none py-2 px-4 rounded"
          type="submit"
          disabled={!stripe}
        >
          Pay
        </button>
      </form>
    );
  };
  return (
    <div>
      {loading && (
        <div className="w-full h-screen flex justify-center items-center overflow-hidden">
          <BigLoader />
        </div>
      )}
      <div className="m-10 ml-10 mr-10 mb-10">
        {!loading && infoPsicologo != null && (
          <div>
            <div className="bg-gray-100 px-4 shadow">
              <Elements stripe={stripePromise}>
                <h1 className="font-bold text-4xl text-gray-800">
                  Realiza tu pago...
                </h1>
                <CheckoutForm
                  payment={() => {
                    setPaymentDone('Success');
                  }}
                  onSubmit={() => {
                    event?.preventDefault;
                    solicitarChat();
                  }}
                />
              </Elements>
              {paymentDone === 'Success' && <h1></h1>}
              <PsychologistHeader psychologist={infoPsicologo as any} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
