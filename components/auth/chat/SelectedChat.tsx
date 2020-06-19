import React from 'react';
import Axios from 'axios';
import { getMessages } from '../../../utils/endpoints';
import moment from 'moment';
import SendMessage from './SendMessage';

interface SelectedChatProps {
  chat: {
    _id: string;
    participants: Array<any>;
    last_message: string;
    last_time: string;
  };
  user: any;
}

const SelectedChat = ({ chat, user }: SelectedChatProps) => {
  const [messages, setMessages] = React.useState<Array<any>>([]);
  const [recipientUser, setRecipientUser] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    if (chat) {
      const getData = async () => {
        const config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        };

        setLoading(true);
        const res = await Axios.get(getMessages(chat._id), config);
        const data = res.data.data;
        setMessages(data);
        setLoading(false);
      };

      getData();
      setRecipientUser(
        chat.participants.find((person: any) => person._id !== user._id)
      );
    }
  }, [chat]);

  let chatView = null;
  if (chat && recipientUser) {
    chatView = (
      <div className="h-screen ">
        {/* Top bar */}
        <div className="flex flex-row items-center w-full py-2 border-b border-gray-300 shadow-sm border-l border-gray-300">
          <div className="flex-none rounded-full w-16 h-16 bg-purple-400 overflow-hidden ml-4">
            <img src={recipientUser.avatar} alt={recipientUser.first_name} />
          </div>
          <h1 className="text-2xl font-semibold p-4 capitalize">
            {recipientUser.first_name} {recipientUser.last_name}
          </h1>
        </div>

        {/* Messages */}
        <div className="h-full overflow-y-auto p-6 border-l border-gray-300">
          {!loading &&
            messages.map((message: any) => {
              //   Para saber quien escribe el mensaje
              const writtenByMe = message.sender === user._id;
              return (<>
                <div
                  className={`p-3 rounded-lg max-w-md text-sm mb-2 ${
                    writtenByMe ? 'ml-auto bg-gray-200 text-gray-700 ' : 'mr-auto bg-purple-500 text-white'
                  }`}
                >
                  <p className="mb-2">{message.content}</p>
                  <p className="pt-1 text-xs text-right leading-none">
                    {moment(message.created_at).format('hh:mm A')}
                  </p>
                </div>
                
              </>);
            })}

        </div>

        {/* Send message */}
        <SendMessage />

      </div>
    );
  } else {
    chatView = <p>No hay chat seleccionado</p>;
  }

  return <div className="bg-white flex-1">{chatView}</div>;
};

export default SelectedChat;