import React from 'react';
import ProfileForm from '../../components/auth/profile';
import AuthLayout from '../../components/auth/Layout';
import { NextPage } from 'next';
import { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';
import Router from 'next/router';
import cookies from 'next-cookies';
const LoginPage = dynamic(() => import('../login'));

interface ProfileProps {
  loggedIn: boolean;
}

const Profile: NextPage<ProfileProps> = ({ loggedIn }) => {
  React.useEffect(() => {
    if (!loggedIn) {
      Router.replace('/profile/', '/login?redirected=true', { shallow: true });
    }
  }, [loggedIn]);

  if (!loggedIn) {
    return <LoginPage />;
  }

  return (
    <AuthLayout title="Resumen de tu cuenta">
      <ProfileForm />
    </AuthLayout>
  );
};

export const getServerSideProps: GetServerSideProps<ProfileProps> = async (
  context
) => {
  const allCookies = cookies(context);
  const token = allCookies.token;
  if (!token) return { props: { loggedIn: false } };
  return { props: { loggedIn: true } };
};

export default Profile;
