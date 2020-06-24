import React from 'react';
import { SOCKET_START } from '../../../store/actionTypes';
import { postMessages } from '../../../utils/endpoints';
import Axios from 'axios';

interface SendMessageProps {
  selectedChatId: string;
  userId: string;
}
const SendMessage = ({
  selectedChatId,
  userId,
}: SendMessageProps) => {
  const [message, setMessage] = React.useState('');

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    };

    const sendData = async function () {
      const body = {
        conversation: selectedChatId,
        content: message,
      };

      const res = await Axios.post(postMessages, body, config);
      setMessage('');

    };

    sendData();
  };

  return (
    <form method="POST" onSubmit={onSubmit}>
      <div className="border-l border-t border-gray-300 px-6 py-4 w-full flex">
        <input
          type="text"
          className="border border-purple-700 bg-transparent p-2 rounded-l w-full placeholder-purple-700"
          placeholder="Type your message..."
          id="email"
          onChange={(e) => setMessage(e.target.value)}
          value={message}
        />
        <button className="px-4 py-2 bg-purple-700 border border-purple-700 rounded-r bg-white">
          <svg
            width="21"
            height="21"
            viewBox="0 0 21 21"
            className="fill-current text-white"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M18.014 9.91593L3.57653 2.69718C3.46338 2.64059 3.33627 2.61791 3.21053 2.63188C3.08478 2.64585 2.96576 2.69588 2.86778 2.77593C2.77422 2.85434 2.70438 2.95731 2.66612 3.07324C2.62787 3.18917 2.6227 3.31347 2.65122 3.43218L4.39028 9.84374H11.8125V11.1562H4.39028L2.62497 17.5481C2.59821 17.6472 2.59509 17.7513 2.61585 17.8518C2.63661 17.9524 2.68068 18.0467 2.74451 18.1271C2.80834 18.2075 2.89015 18.2718 2.98337 18.3149C3.07659 18.358 3.1786 18.3785 3.28122 18.375C3.38395 18.3744 3.4851 18.3496 3.57653 18.3028L18.014 11.0841C18.1215 11.029 18.2117 10.9453 18.2747 10.8423C18.3377 10.7392 18.3711 10.6208 18.3711 10.5C18.3711 10.3792 18.3377 10.2608 18.2747 10.1577C18.2117 10.0547 18.1215 9.971 18.014 9.91593Z" />
          </svg>
        </button>
      </div>
    </form>
  );
};

export default SendMessage;
