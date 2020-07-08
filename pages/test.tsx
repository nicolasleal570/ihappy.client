import React from 'react';
import TestForm from '../components/auth/Test';
import AuthLayout from '../components/auth/Layout';

const Test = () => {
  return (
    <AuthLayout title="Test Base">
      <TestForm />
    </AuthLayout>
  );
};

export default Test;
