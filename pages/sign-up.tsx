import React from 'react'
import { NextPage } from 'next';
import { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';
import Router from 'next/router';
import cookies from 'next-cookies';
import { AllScreenLoader } from '../components/Loader';
const PublicLayout = dynamic(() => import('../components/public/Layout'));
const SignupForm = dynamic(() => import('../components/public/sing-up/signup'));

interface SignupProps {
    loggedIn: boolean;
  }

  const Signup: NextPage<SignupProps> = ({ loggedIn }) => {
    React.useEffect(() => {
      if (loggedIn) {
        Router.push('/dashboard');
      }
    }, [loggedIn]);
    
    return !loggedIn ? (
        <PublicLayout>
            <SignupForm />
        </PublicLayout>
    ) : <AllScreenLoader />
}

export const getServerSideProps: GetServerSideProps<SignupProps> = async (
  context
) => {
  const allCookies = cookies(context);
  const token = allCookies.token;
  if (!token) return { props: { loggedIn: false } };
  return { props: { loggedIn: true } };
};

export default Signup;
