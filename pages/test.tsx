import React from 'react';
import TestForm from '../components/auth/Test';
import AuthLayout from '../components/auth/Layout';
import { NextPage } from 'next';
import { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';
import Router from 'next/router';
import cookies from 'next-cookies';
const LoginPage = dynamic(() => import('./login'));

interface TestProps {
  loggedIn: boolean;
}

const Test: NextPage<TestProps> = ({ loggedIn }) => {
  React.useEffect(() => {
    if (!loggedIn) {
      Router.push({
        pathname: '/login',
        query: { redirected: true },
      });
    }
  }, [loggedIn]);
  return loggedIn ? (
    <AuthLayout title="Test X">
      <TestForm />
    </AuthLayout>
  ) : (
    <LoginPage />
  );
};

export const getServerSideProps: GetServerSideProps<TestProps> = async (
  context
) => {
  const allCookies = cookies(context);
  const token = allCookies.token;
  if (!token) return { props: { loggedIn: false } };
  return { props: { loggedIn: true } };
};

export default Test;
