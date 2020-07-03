import React from 'react';
import AuthLayout from '../components/auth/Layout';
import ChatSection from '../components/auth/chat/ChatSection';
import { NextPage } from 'next';
import { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';
import Router from 'next/router';
import cookies from 'next-cookies';
const LoginPage = dynamic(() => import('./login'));

interface ChatProps {
  loggedIn: boolean;
}

const Chat: NextPage<ChatProps> = ({ loggedIn }) => {
  React.useEffect(() => {
    if (!loggedIn) {
      Router.push({
        pathname: '/login',
        query: { redirected: true },
      });
    }
  }, [loggedIn]);

  return loggedIn ? (
    <AuthLayout title="Chat">
      <ChatSection />
    </AuthLayout>
  ) : (
    <LoginPage />
  );
};

export const getServerSideProps: GetServerSideProps<ChatProps> = async (
  context
) => {
  const allCookies = cookies(context);
  const token = allCookies.token;
  if (!token) return { props: { loggedIn: false } };
  return { props: { loggedIn: true } };
};

export default Chat;
