import React from 'react';
import Dashboard from '../components/auth/Dashboard';
import AuthLayout from '../components/auth/Layout';

const Account = () => {
  return (
    <AuthLayout title="Dashboard">
      <Dashboard />
    </AuthLayout>
  );
};

export default Account;
