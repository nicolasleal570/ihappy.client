import React from 'react';
import ReviewsList from '../../components/auth/review';
import AuthLayout from '../../components/auth/Layout';
import { useRouter } from 'next/router';
import { NextPage } from 'next';
import { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';
import Router from 'next/router';
import cookies from 'next-cookies';
const LoginPage = dynamic(() => import('../login'));

interface ReviewsProps {
  loggedIn: boolean;
}

const Reviews: NextPage<ReviewsProps> = ({ loggedIn }) => {
  const router = useRouter();
  const { slug } = router.query;
  React.useEffect(() => {
    if (!loggedIn) {
      Router.replace('/reviews/:slug', '/login?redirected=true', { shallow: true });
    }
  }, [loggedIn]);

  if (!loggedIn) {
    return <LoginPage />;
  }

  return (
    <AuthLayout title="Reseñas y Perfil">
    <ReviewsList slug={slug} />
    </AuthLayout>
  );
};

export const getServerSideProps: GetServerSideProps<ReviewsProps> = async (
  context
) => {
  const allCookies = cookies(context);
  const token = allCookies.token;
  if (!token) return { props: { loggedIn: false } };
  return { props: { loggedIn: true } };
};

export default Reviews;
