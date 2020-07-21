import React from 'react';
import moment from 'moment';
import axios from 'axios';
import chat from '../../../pages/chat';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import NotificationsIcon from '@material-ui/icons/Notifications';
import WatchLaterIcon from '@material-ui/icons/WatchLater';
import { conversationStatus } from '../../../utils/endpoints';
import ClearIcon from '@material-ui/icons/Clear';
import { BigLoader } from '../../Loader';

type ChatListProps = {
  chats: Array<any>;
  onChangeConversation: (e: any, chatId: string) => void;
  userId: string;
  selectedChatId: string;
  loadingChats: boolean;
}
/**
 * Esta es el componente que contiene la lista del chat
 * @visibleName Lista del chat
 */

const ChatList = ({
  chats,
  onChangeConversation,
  userId,
  selectedChatId,
  loadingChats,
}: ChatListProps) => {
  const { user, loading } = useSelector((state: any) => state.auth);
  const [accept, setAccept] = React.useState(true);
  const [decline, setDecline] = React.useState(false);
  const [sendPendiente, setSendPendiente] = React.useState(false);
  const [chatID, setChatID] = React.useState('');

  const actualizarEdoChat = async () => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    };
    setSendPendiente(true);
    axios
      .put(
        conversationStatus(chatID),
        {
          pendiente: accept,
        },
        config
      )
      .then((res) => {
        if (!loading) {
          setSendPendiente(false);
        }
      })
      .catch((err) => {
        setSendPendiente(false);
      });
  };

  const eliminarChat = async () => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    };
    setSendPendiente(true);
    axios
      .put(
        conversationStatus(chatID),
        {
          hidden: decline,
        },
        config
      )
      .then((res) => {
        if (!loading) {
          setSendPendiente(false);
        }
      })
      .catch((err) => {
        setSendPendiente(false);
      });
  };

  const onHandle = (e: React.FormEvent<HTMLFormElement>) => {
    if (!accept) {
      actualizarEdoChat();
    } else if (decline) {
      eliminarChat();
    }
  };

  //Funcion para evaluar si todos los chats estan eliminados
  function isAllHidden(element: any, index: any, array: any) {
    return element.hidden;
  }

  var passed = chats.every(isAllHidden);
  //Si no tiene ningun chat registrado o todos estan eliminados
  if (loadingChats) {
    return (
      <div className="relative w-full h-32 bg-white rounded flex items-center justify-center">
        <BigLoader />
      </div>
    );
  } else if (chats.length == 0 || passed) {
    return (
      <div className="bg-white w-4/12 h-screen text-gray-800 overflow-y-auto">
        <h1 className="text-xs lg:text-2xl font-semibold p-4">
          Conversaciones
        </h1>
        <div className="flex flex-col items-start">
          <h3 className="text-2xl p-4">No tienes ningún chat</h3>
          <Link href="/search">
            <a className="w-full lg:w-auto ml-5 shadow focus:outline-none py-2 px-2 rounded bg-purple-500 text-gray-200">
              Busca profesionales
            </a>
          </Link>
        </div>
      </div>
    );
  } else {
    //Si hay chats, muestra los chats
    return (
      <div className="w-full lg:w-4/12 h-screen text-gray-800 overflow-y-auto">
        <h1 className="text-center lg:text-left text-2xl font-semibold p-2 mx-2">
          Conversaciones
        </h1>
        {chats.length > 0 &&
          chats.map((chat, index) => {
            const participants = chat.participants.filter(
              (element: any) => element._id !== userId
            );

            return (
              <div key={index}>
                {chat.pendiente &&
                  !chat.hidden &&
                  user.role.identification === 'psicologo' && (
                    <>
                      <button
                        disabled
                        onClick={(e) => onChangeConversation(e, chat._id)}
                        className={`text-left w-full py-3 px-4 flex outline-none focus:outline-none cursor-pointer bg-gray-200 ${
                          selectedChatId === chat._id
                            ? 'bg-gray-200'
                            : 'bg-white'
                        }
              `}
                      >
                        <div className="flex-none rounded-full w-12 h-12 lg:w-16 lg:h-16 bg-purple-400 overflow-hidden">
                          <img
                            src={participants[0].avatar}
                            alt={participants[0].username}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        <div className="w-full flex-1 ml-2">
                          <h3 className="text-lg lg:text-sm font-semibold capitalize">{`${participants[0].first_name} ${participants[0].last_name}`}</h3>
                          {!chat.last_message && (
                            <p className="text-gray-500">No hay mensajes aún</p>
                          )}

                          {chat.last_message && (
                            <p className="block">
                              {chat.last_message}{' '}
                              <span className="text-xs text-gray-500">
                                {moment(chat.last_time).fromNow()}
                              </span>
                            </p>
                          )}
                        </div>
                        <FiberManualRecordIcon
                          style={{ fill: '#805ad5', fontSize: 15 }}
                        />
                      </button>
                      <form onSubmit={onHandle}>
                        <div className="flex w-full mx-auto items-center justify-center bg-gray-200 mb-2">
                          <button
                            className={` 
                    ${
                      sendPendiente
                        ? 'border-2 border-gray-400 bg-gray-400 text-gray-600 cursor-not-allowed'
                        : 'bg-gray-300 hover:bg-green-400 text-gray-800 semi-bold py-1 px-2 rounded-l hover:text-black'
                    }
                    `}
                            onClick={(e) => (
                              setChatID(chat._id), setAccept(false)
                            )}
                            key={chat._id}
                            type="submit"
                          >
                            Aceptar
                          </button>
                          <button
                            className={`
                    ${
                      sendPendiente
                        ? 'border-2 border-gray-400 bg-gray-400 text-gray-600 cursor-not-allowed'
                        : 'bg-gray-300 hover:bg-red-400 text-gray-800 semi-bold py-1 px-2 rounded-r hover:text-black'
                    }
                    `}
                            onClick={(e) => (
                              setChatID(chat._id), setDecline(true)
                            )}
                            type="submit"
                          >
                            Rechazar
                          </button>
                        </div>
                      </form>
                    </>
                  )}
                {chat.pendiente &&
                  !chat.hidden &&
                  user.role.identification === 'usuario' && (
                    <button
                      disabled
                      onClick={(e) => onChangeConversation(e, chat._id)}
                      className={`text-left w-full py-3 px-4 flex outline-none focus:outline-none cursor-pointer bg-gray-200 ${
                        selectedChatId === chat._id ? 'bg-gray-200' : 'bg-white'
                      }
              `}
                      key={chat._id}
                    >
                      <div className="flex-none rounded-full w-12 h-12 bg-purple-400 overflow-hidden ">
                        <img
                          src={participants[0].avatar}
                          alt={participants[0].username}
                        />
                      </div>

                      <div className="w-full flex-1 ml-2 py-4">
                        <h3 className="text-lg font-semibold capitalize">{`${participants[0].first_name} ${participants[0].last_name}`}</h3>
                        {!chat.last_message && chat.pendiente && (
                          <p className="text-gray-500">
                            Esperando que psicologo acepte petición
                          </p>
                        )}

                        {chat.last_message && (
                          <p className="hidden md:block">
                            {chat.last_message}{' '}
                            <span className="text-xs text-gray-500">
                              {moment(chat.last_time).fromNow()}
                            </span>
                          </p>
                        )}
                      </div>
                      <WatchLaterIcon
                        style={{ fill: '#805ad5', fontSize: 20 }}
                      />
                    </button>
                  )}

                {!chat.pendiente && !chat.hidden && (
                  <div>
                    <button
                      onClick={(e) => onChangeConversation(e, chat._id)}
                      className={`text-left w-full py-3 px-4 flex outline-none focus:outline-none cursor-pointer hover:bg-gray-200 ${
                        selectedChatId === chat._id ? 'bg-gray-200' : 'bg-white'
                      }`}
                      key={chat._id}
                    >
                      <div className="flex-none rounded-full w-12 h-12 bg-purple-400 overflow-hidden">
                        <img
                          src={participants[0].avatar}
                          alt={participants[0].username}
                        />
                      </div>
                      <div className="w-full flex-1 ml-2">
                        <h3 className="text-lg lg:text-2xl font-semibold capitalize mr-4">{`${participants[0].first_name} ${participants[0].last_name}`}</h3>
                        {!chat.last_message && (
                          <p className="text-gray-500">No hay mensajes aún</p>
                        )}
                        {chat.last_message && (
                          <p className="">
                            {chat.last_message}{' '}
                            <span className="text-xs text-gray-500">
                              {moment(chat.last_time).fromNow()}
                            </span>
                          </p>
                        )}
                      </div>
                    </button>
                  </div>
                )}
              </div>
            );
          })}
      </div>
    );
  }
};
export default ChatList;
