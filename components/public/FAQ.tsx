import react, { useState } from 'react';
import axios from 'axios';
import {emails} from '../../utils/endpoints';
import ChatIcon from '@material-ui/icons/Chat';
import PaymentIcon from '@material-ui/icons/Payment';
import VideoCallIcon from '@material-ui/icons/VideoCall';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
export default function FAQ() {

    const[nombre,setNombre]= useState('')
    const[email,setEmail] =useState('')
    const[message,setMessage] = useState('')
    const config = {
        headers: {
            'Content-Type': 'application/json'
            // 'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    }
    const enviarDatos = async () => {
    
        axios.post(emails),{
            'name':nombre,
            'email':email,
            'message':message
        }

    }

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        enviarDatos();

    }



    interface Question {
        title: String;
        answer: String;
        imgUrl: object;
    }
    const QuestionCard = ({ title, answer, imgUrl }: Question) => {

        return (
            <div className="bg-gray-100 text-gray-800 p-4 rounded mb-6 flex border border-gray-200 shadow-md">
                <div className="flex-1">
                    <h1 className="font-bold text-xl">{title}</h1>
                    <p className="mt-3 mb-4 leading-none">{answer}</p>
                </div>
                <div className="flex-none">
                    <div className="w-20 h'20 ">
                        {imgUrl}
                    </div>
                </div>
            </div>
        )
    }
    return (
        <div className='flex flex-col'>
            <div
                className="top-0 w-full h-full bg-black text-white">
                {/* Content */}
                <div className= 'ml-32'>
                <div className='text-center mt-20 ml-64 mb-24'>
                    <h1 className='h-24 ml-64 w-56 text-6xl border-purple-500 border-2 font-bold pb-10 mb-10'>FAQ</h1>
                </div>
                </div> 
            </div>
            <div className='relative bg-gray-100 h-screen w-full'>
                <h1 className="absolute left-0 mt-10 ml-10 underline-text border-purple-500 border-2 text-3xl text-black font-bold leading-none">Preguntas Frecuentes.</h1>
                < div className='container px-5 ml-20 mt-24 pt-2'>
                    <QuestionCard
                        title="¿Como funciona el pago, es por mensualidad?"
                        answer="El pago es por consulta, no trabajamos con pagos de mensualidad. Contamos con PayPal y transferencias bancarias "
                        imgUrl={<PaymentIcon style={{ fill: 'black', paddingRight: 2, marginRight: 10, marginTop:5,fontSize: 55 }} />}
                    />
                    <QuestionCard
                        title="¿Como Psicologo, necesito pagar para registrarme y ofrecer mis servicios?"
                        answer="No, iHappy cobra comision por consulta."
                        imgUrl={<AttachMoneyIcon style={{ fill: 'black', paddingRight: 2, marginRight: 10, marginTop:5,fontSize: 55 }}/>}
                    />
                    <QuestionCard
                        title="¿Como funciona iHappy?"
                        answer="Muy sencillo! Primero creas tu cuenta, y realizas nuestro test que te va ayudar a encontrar el mejor especialista para ti,
                        y comenzar a chatear!"
                        imgUrl={<ChatIcon style={{ fill: 'black', paddingRight: 2, marginRight: 10, marginTop:5,fontSize: 55 }}/>}
                    />
                    <QuestionCard
                        title="¿Ademas de chatear, se pueden hacer video-llamadas?"
                        answer="Aún no!, pero tenemos como objetivo implementarlo en un futuro"
                        imgUrl={<VideoCallIcon style={{ fill: 'black', paddingRight: 2, marginRight: 10, marginTop:5,fontSize: 55 }}/>}
                    />
                    <QuestionCard
                        title="¿Que hay de mi privacidad, venden mi información?"
                        answer="iHappy es incapaz de vender su información, buscamos total confidencialidad"
                        imgUrl={<VerifiedUserIcon style={{ fill: 'black', paddingRight: 2, marginRight: 10, marginTop:5,fontSize: 55 }}/>}
                    />
                </div>
                <div className='absolute w-full h-screen bg-black'>
                <h1 className="absolute left-0 mt-10 ml-10 underline-text border-purple-500 border-2 text-3xl text-white font-bold leading-none">Envianos un correo.</h1>
                <div className='mt-32 bg-black'>
                <form method="POST" onSubmit={onSubmit} className='ml-10 mt-5'>
                    <div className='flex'>
                        <div className='text-white'>
                            <div className="w-full py-1 md:w-1/2 px-2 mb-6 md:mb-0">
                                <label className="block uppercase tracking-wide  text-xs font-bold mb-2" htmlFor="grid-first-name">
                                    Nombre y apellido </label>
                                <input id='Nombre' onChange={e => setNombre(e.target.value)}  size={80} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" type="text" />
                            </div>
                            <div className="w-full py-1 md:w-1/2 px-2 mb-6 md:mb-0">
                                <label className="block uppercase tracking-wide  text-xs font-bold mb-2" htmlFor="grid-first-name">
                                    Correo </label>
                                <input id='Nombre' onChange={e => setNombre(e.target.value)}  size={80} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" type="text" />
                            </div>
                            <div className="w-full md:w-1/2 py-3 px-2 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide  text-xs font-bold mb-2" htmlFor="grid-first-bio">
                                Mensaje </label>
                            <textarea id='Biografia' onChange={e => setMessage(e.target.value)} className="appearance-none block w-full h-64 bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" placeholder='Coloque su mensaje'></textarea>
                            <button type='submit' className="bg-purple-500 hover:bg-purple-700  text-gray-100 font-bold py-2 px-4  rounded-full">Enviar correo</button>
                        </div>
                        </div>
                    </div>
                </form>
                </div>
                
                </div>
            </div>

        </div>

    )

}
