import React from 'react';
import Dashboard from '../components/auth/Dashboard';
import AuthLayout from '../components/auth/Layout';
import { NextPage } from 'next';
import { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';
import Router from 'next/router';
import cookies from 'next-cookies';
const LoginPage = dynamic(() => import('./login'));

interface AccountProps {
  loggedIn: boolean;
}

const Account: NextPage<AccountProps> = ({ loggedIn }) => {
  React.useEffect(() => {
    if (!loggedIn) {
      Router.push({
        pathname: '/login',
        query: { redirected: true },
      });
    }
  }, [loggedIn]);

  return loggedIn ? (
    <AuthLayout title="Dashboard">
      <Dashboard />
    </AuthLayout>
  ) : (
    <LoginPage />
  );
};

Account.getInitialProps = async (context) => {
  const allCookies = cookies(context);
  const token = allCookies.token;
  if (!token) return { loggedIn: false };
  return { loggedIn: true };
};

export default Account;
