import React from 'react';
import { NextPage } from 'next';
import PaymentSelect from '../../components/auth/payment';
import AuthLayout from '../../components/auth/Layout';
import { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';
import Router from 'next/router';
import cookies from 'next-cookies';
import { useRouter } from 'next/router';
const LoginPage = dynamic(() => import('../login'));

interface paymentProps {
    loggedIn: boolean;
}

const Payment: NextPage<paymentProps> = ({ loggedIn }) => {
    const router = useRouter();
    const { slug } = router.query;
    React.useEffect(() => {
      if (!loggedIn) {
        Router.push({
          pathname: '/login',
          query: { redirected: true },
        });
      }
    }, [loggedIn]);
  
    return loggedIn ? (
        <AuthLayout title="Pago">
          <PaymentSelect slug={slug}/>
        </AuthLayout>
      ) : (
        <LoginPage />
      );
    };

  export const getServerSideProps: GetServerSideProps<paymentProps> = async (
    context
  ) => {
    const allCookies = cookies(context);
    const token = allCookies.token;
    if (!token) return { props: { loggedIn: false } };
    return { props: { loggedIn: true } };
  };
  export default Payment;