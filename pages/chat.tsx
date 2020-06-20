import React from 'react';
import AuthLayout from '../components/auth/Layout';
import { useSelector } from 'react-redux';
import Axios from 'axios';
import { getConversations } from '../utils/endpoints';
import ChatList from '../components/auth/chat/ChatList';
import SelectedChat from '../components/auth/chat/SelectedChat';

const chat = () => {
  const { user, loading } = useSelector((state: any) => state.auth);
  const { socket }: { socket: SocketIOClient.Socket } = useSelector(
    (state: any) => state.socket
  );
  const [chats, setChats] = React.useState<Array<any>>([]);
  const [selectedChat, setSelectedChat] = React.useState<any>(null)

  React.useEffect(() => {
    if (user && !loading) {
      const getChats = async () => {
        const config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          }
        };

        const res = await Axios.get(getConversations, config);
        const data = res.data.data;
        setChats(data);
      };

      getChats();
    }
  }, [user, loading]);

  React.useEffect(() => {
    if (socket && chats.length > 0) {
      chats.map((room) => {
        socket.emit('subscribe', room._id);
      });
    }
  }, [chats, socket]);

  const onChangeConversation = (e: any, chatId: string) => {
    const chat = chats.find((chat: any) => chat._id === chatId);
    setSelectedChat(chat);
  };

  return (
    <AuthLayout title="Chat">
      <div className="flex">

        {/* Conversation list */}
        <ChatList 
          chats={chats}
          userId={user._id}
          onChangeConversation={onChangeConversation}
          selectedChatId={selectedChat ? selectedChat._id : ''}
        />

        {/* Selected chat */}
        <SelectedChat 
          chat={selectedChat}
          user={user}
        />

      </div>
    </AuthLayout>
  );
};

export default chat;
