import React from 'react';
import { NextPage } from 'next';
import { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';
import Router from 'next/router';
import cookies from 'next-cookies';
import { AllScreenLoader } from '../components/Loader';
const PublicLayout = dynamic(() => import('../components/public/Layout'));
const LoginForm = dynamic(() => import('../components/public/login/login'));

interface LoginProps {
  loggedIn?: boolean;
}

const Login: NextPage<LoginProps> = ({ loggedIn }) => {
  React.useEffect(() => {
    if (loggedIn) {
      Router.push('/dashboard');
    }
  }, [loggedIn]);

  return !loggedIn ? (
    <PublicLayout>
      <LoginForm />
    </PublicLayout>
  ) : (
    <AllScreenLoader />
  );
};

export const getServerSideProps: GetServerSideProps<LoginProps> = async (
  context
) => {
  const allCookies = cookies(context);
  const token = allCookies.token;
  if (!token) return { props: { loggedIn: false } };
  return { props: { loggedIn: true } };
};

export default Login;
