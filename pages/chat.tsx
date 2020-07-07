import React from 'react';
import AuthLayout from '../components/auth/Layout';
import ChatSection from '../components/auth/chat/ChatSection';

const Chat = () => {
  return (
    <AuthLayout title="Dashboard">
      <ChatSection />
    </AuthLayout>
  );
};

export default Chat;
