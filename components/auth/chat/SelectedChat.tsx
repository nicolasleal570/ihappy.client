import React from 'react';
import Axios from 'axios';
import { getMessages } from '../../../utils/endpoints';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import SendMessage from './SendMessage';
import { conversationStatus } from '../../../utils/endpoints';
import DeleteIcon from '@material-ui/icons/Delete';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { BigLoader } from '../../Loader';

interface SelectedChatProps {
  chat: {
    _id: string;
    participants: Array<any>;
    last_message: string;
    last_time: string;
  };
  changeChatList: (chatIdToDelete: string) => void;
  setSelectedChat: (value: any) => void;
}

const SelectedChat = ({
  chat,
  setSelectedChat,
  changeChatList,
}: SelectedChatProps) => {
  const { user, loading } = useSelector((state: any) => state.auth);
  const [messages, setMessages] = React.useState<Array<any>>([]);
  const [recipientUser, setRecipientUser] = React.useState<any>(null);
  const [borrarChat, setBorrarChat] = React.useState(false);
  const { socket }: { socket: SocketIOClient.Socket } = useSelector(
    (state: any) => state.socket
  );
  const [loadingMessages, setLoadingMessages] = React.useState(false);
  const boxRef = React.createRef<HTMLDivElement>();

  // Update if new messages are sent or recieve
  React.useEffect(() => {
    if (socket) {
      socket.on('new message', (data: any) => {
        const newMessages = [...messages, data.message];
        console.log(newMessages);
        setMessages(newMessages);
      });
    }
  }, [socket]);

  React.useEffect(() => {
    if (chat) {
      const getData = async () => {
        setLoadingMessages(true);
        const config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + localStorage.getItem('token'),
          },
        };

        const res = await Axios.get(getMessages(chat._id), config);
        const data = res.data.data;
        setMessages(data);
        setLoadingMessages(false);
      };

      getData();
      setRecipientUser(
        chat.participants.find((person: any) => person._id !== user._id)
      );
    }
  }, [chat]);

  React.useEffect(() => {
    scrollToBottom();
  }, [boxRef, chat, messages]);

  const eliminarChat = async () => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    };
    Axios.put(
      conversationStatus(chat._id),
      {
        hidden: borrarChat,
      },
      config
    )
      .then((res) => {
        changeChatList(chat._id);
      })
      .catch((err) => {});
  };
  const onHandle = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (borrarChat) {
      eliminarChat();
    }
  };

  const scrollToBottom = () => {
    if (null !== boxRef.current) {
      boxRef.current.scrollTop = boxRef.current.scrollHeight;
    }
  };

  let chatView = null;
  if (chat && recipientUser) {
    chatView = (
      <div className="fixed top-0 left-0 w-full flex flex-col bg-white z-40 lg:z-auto lg:relative h-screen overflow-hidden lg:overflow-auto">
        {/* Top bar */}
        <div className="bg-white flex flex-row items-center w-full py-2 border-b border-gray-300 shadow-sm border-l">
          <button
            className="pl-2 block lg:hidden focus:outline-none"
            type="button"
            onClick={() => setSelectedChat(null)}
          >
            <ArrowBackIcon style={{ fill: '#6b46c1', fontSize: 30 }} />
          </button>
          <div className="flex-none rounded-full w-12 h-12 lg:w-16 lg:h-16 bg-purple-400 overflow-hidden ml-4">
            <img
              src={recipientUser.avatar}
              alt={recipientUser.first_name}
              className="w-full h-full object-cover"
            />
          </div>
          <h1 className="text-xl lg:text-2xl font-semibold p-4 capitalize">
            {recipientUser.first_name} {recipientUser.last_name}
          </h1>

          <div className="absolute right-0 mr-5">
            <form onSubmit={onHandle}>
              <button
                className="focus:outline-none"
                type="submit"
                onClick={(e) => setBorrarChat(true)}
              >
                <DeleteIcon style={{ fill: '#6b46c1', fontSize: 30 }} />
              </button>
            </form>
          </div>
        </div>

        {/* Messages */}
        <div
          className="flex-1 lg:chat-xl p-6 border-l border-gray-300 overflow-y-auto custom-scroll"
          ref={boxRef}
        >
          {loadingMessages && <BigLoader />}

          {!loading &&
            !loadingMessages &&
            messages.map((message: any) => {
              //   Para saber quien escribe el mensaje
              const writtenByMe = message.sender === user._id;
              return (
                <div
                  key={message._id}
                  className={`p-3 rounded-lg max-w-md text-sm mb-2 ${
                    writtenByMe
                      ? 'ml-auto bg-gray-200 text-gray-700 '
                      : 'mr-auto bg-purple-500 text-white'
                  }`}
                >
                  <p className="mb-2">{message.content}</p>
                  <p className="pt-1 text-xs text-right leading-none">
                    {moment(message.created_at).format('hh:mm A')}
                  </p>
                </div>
              );
            })}
        </div>

        {/* Send message */}
        <SendMessage selectedChatId={chat._id} userId={user._id} />
      </div>
    );
  } else {
    chatView = (
      <div className="bg-purple-200 w-full h-screen hidden lg:flex flex-col justify-center items-center">
        <img
          src="/assets/icons/empty.svg"
          className="w-48 h-48"
          alt="Empty State"
        />
        <p className="text-xl font-light text-gray-800 uppercase py-4 px-6 text-center">
          No hay nada por aquí. Selecciona un chat y comienza tu sesión.
        </p>
      </div>
    );
  }

  return <div className="bg-white flex-1">{chatView}</div>;
};

export default SelectedChat;
