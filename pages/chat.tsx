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
  const [selectedChat, setSelectedChat] = React.useState<any>(null);

  React.useEffect(() => {
    if (user && !loading) {
      const getChats = async () => {
        const config = {
          withCredentials: true,
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

  // Update if new messages are sent or recieve
  React.useEffect(() => {
    if (socket) {
      socket.on('new message', (data: any) => {
        const { conversation: chat } = data;
        const newChats = chats.filter(
          (element: any) => element._id !== data.conversation._id
        );

        const chatUpdated = Array<any>()
          .concat([...newChats, chat])
          .sort((a: any, b: any) => (a?.last_time < b?.last_time ? 1 : -1));

        setChats(chatUpdated);
      });
    }
  }, [socket, chats]);

  return (
    <AuthLayout title="Chat">
      <div className="flex">
        {/* Conversation list */}
        {user && !loading && (
          <>
            <ChatList
              chats={chats}
              userId={user._id}
              onChangeConversation={onChangeConversation}
              selectedChatId={selectedChat ? selectedChat._id : ''}
            />

            {/* Selected chat */}
            <SelectedChat chat={selectedChat} />
          </>
        )}
      </div>
    </AuthLayout>
  );
};

export default chat;
