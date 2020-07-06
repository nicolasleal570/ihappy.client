import React from 'react';
import PsicologosSection from '../components/auth/psicologos';
import AuthLayout from '../components/auth/Layout';
import { NextPage } from 'next';
import { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';
import Router from 'next/router';
import cookies from 'next-cookies';
const LoginPage = dynamic(() => import('./login'));

interface PsicologosProps {
  loggedIn: boolean;
}

const Psicologos: NextPage<PsicologosProps> = ({ loggedIn }) => {
  React.useEffect(() => {
    if (!loggedIn) {
      Router.replace('/psicologos', '/login?redirected=true', { shallow: true });
    }
  }, [loggedIn]);

  if (!loggedIn) {
    return <LoginPage />;
  }

  return (
    <AuthLayout title="Encuentra tu Médico">
      <PsicologosSection />
    </AuthLayout>
  );
};

export const getServerSideProps: GetServerSideProps<PsicologosProps> = async (
  context
) => {
  const allCookies = cookies(context);
  const token = allCookies.token;
  if (!token) return { props: { loggedIn: false } };
  return { props: { loggedIn: true } };
};

export default Psicologos;
