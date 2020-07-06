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

const Account = () => {
  return (
    <AuthLayout title="Dashboard">
      <Dashboard />
    </AuthLayout>
  );
};
export default Account;
