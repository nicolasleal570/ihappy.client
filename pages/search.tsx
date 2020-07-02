import React from 'react';
import SearchSection from '../components/auth/search';
import AuthLayout from '../components/auth/Layout';
import { NextPage } from 'next';
import { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';
import Router from 'next/router';
import cookies from 'next-cookies';
const LoginPage = dynamic(() => import('./login'));

interface SearchProps {
  loggedIn: boolean;
}

const Search: NextPage<SearchProps> = ({ loggedIn }) => {
  React.useEffect(() => {
    if (!loggedIn) {
      Router.push({
        pathname: '/login',
        query: { redirected: true },
      });
    }
  }, [loggedIn]);

  return loggedIn ? (
    <AuthLayout title="Encuentra Médicos">
      <SearchSection />
    </AuthLayout>
  ) : (
    <LoginPage />
  );
};

export const getServerSideProps: GetServerSideProps<SearchProps> = async (
  context
) => {
  const allCookies = cookies(context);
  const token = allCookies.token;
  if (!token) return { props: { loggedIn: false } };
  return { props: { loggedIn: true } };
};

export default Search;
