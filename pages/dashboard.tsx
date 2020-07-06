import React from 'react';
import Dashboard from '../components/auth/Dashboard';
import AuthLayout from '../components/auth/Layout';
import { NextPage } from 'next';
import { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';
import Router from 'next/router';
import cookies from 'next-cookies';
import Axios from 'axios';
const LoginPage = dynamic(() => import('./login'));

interface AccountProps {
  loggedIn: boolean;
}

const Account: NextPage<AccountProps> = ({ loggedIn }) => {
  React.useEffect(() => {
    if (!loggedIn) {
      Router.replace('/dashboard', '/login?redirected=true', { shallow: true });
    }
  }, [loggedIn]);

  if (!loggedIn) {
    return <LoginPage />;
  }

  return (
    <AuthLayout title="Dashboard">
      <Dashboard />
    </AuthLayout>
  );
};

export const getServerSideProps: GetServerSideProps<AccountProps> = async (
  context
) => {
  const allCookies = cookies(context);
  const token = allCookies.token;
  Axios.defaults.headers.get.Cookie = context.req.headers.cookie;
  if (!token) return { props: { loggedIn: false } };
  return { props: { loggedIn: true } };
};

export default Account;
