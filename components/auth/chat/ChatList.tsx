import React from 'react';
import moment from 'moment';

interface ChatListProps {
  chats: Array<any>;
  onChangeConversation: (e: any, chatId: string) => void;
  userId: string;
  selectedChatId: string
}
const ChatList = ({ chats, onChangeConversation, userId, selectedChatId }: ChatListProps) => {

  return (
    <div className="bg-white w-4/12 h-screen text-gray-800 overflow-y-auto">
      <h1 className="text-2xl font-semibold p-4">Conversaciones</h1>

      {chats.length > 0 &&
        chats.map((chat) => {
          const participants = chat.participants.filter(
            (element: any) => element._id !== userId
          );

          return (
            <button
              onClick={(e) => onChangeConversation(e, chat._id)}
              className={`text-left w-full py-3 px-4 flex outline-none focus:outline-none cursor-pointer hover:bg-gray-200 ${selectedChatId === chat._id ? 'bg-gray-200' : 'bg-white'}`}
              key={chat._id}
            >
              <div className="flex-none rounded-full w-12 h-12 bg-purple-400 overflow-hidden">
                <img
                  src={participants[0].avatar}
                  alt={participants[0].username}
                />
              </div>
              <div className="w-full flex-1 ml-2">
                <h3 className="text-lg font-semibold capitalize">{`${participants[0].first_name} ${participants[0].last_name}`}</h3>
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
          );
        })}
    </div>
  );
};

export default ChatList;
