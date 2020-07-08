import React from 'react';
import Axios from 'axios';
import { getMessages } from '../../../utils/endpoints';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import SendMessage from './SendMessage';
import { conversationStatus } from '../../../utils/endpoints';
import DeleteIcon from '@material-ui/icons/Delete';

interface SelectedChatProps {
  chat: {
    _id: string;
    participants: Array<any>;
    last_message: string;
    last_time: string;
  };
}

const SelectedChat = ({ chat }: SelectedChatProps) => {
  const { user } = useSelector((state: any) => state.auth);
  const [messages, setMessages] = React.useState<Array<any>>([]);
  const [recipientUser, setRecipientUser] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(false);
  const [borrarChat, setBorrarChat] = React.useState(false);
  const [sendPendiente, setSendPendiente] = React.useState(false);
  const { socket }: { socket: SocketIOClient.Socket } = useSelector(
    (state: any) => state.socket
  );
  const boxRef = React.createRef<HTMLDivElement>();

  // Update if new messages are sent or recieve
  React.useEffect(() => {
    if (socket) {
      socket.on('new message', (data: any) => {
        setMessages((prev) => [...prev, data.message]);
      });
    }
  }, [socket]);

  React.useEffect(() => {
    if (chat) {
      const getData = async () => {
        const config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + localStorage.getItem('token'),
          },
        };

        const res = await Axios.get(getMessages(chat._id), config);
        const data = res.data.data;
        setMessages(data);
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
    setSendPendiente(true);
    Axios.put(
      conversationStatus(chat._id),
      {
        hidden: borrarChat,
      },
      config
    )
      .then((res) => {
        console.log(res.data);
        if (!loading) {
          setSendPendiente(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setSendPendiente(false);
      });
  };
  const onHandle = (e: React.FormEvent<HTMLFormElement>) => {
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
      <div className="relative h-screen ">
        {/* Top bar */}
        <div className="flex flex-row items-center w-full py-2 border-b border-gray-300 shadow-sm border-l">
          <div className="flex-none rounded-full w-16 h-16 bg-purple-400 overflow-hidden ml-4">
            <img src={recipientUser.avatar} alt={recipientUser.first_name} />
          </div>
          <h1 className="text-2xl font-semibold p-4 capitalize">
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
          className="h-full p-6 border-l border-gray-300 overflow-y-auto custom-scroll pb-40"
          ref={boxRef}
        >
          {!loading &&
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
      <div>
        <p>No hay chat seleccionado</p>
      </div>
    );
  }

  return <div className="bg-white flex-1">{chatView}</div>;
};

export default SelectedChat;
