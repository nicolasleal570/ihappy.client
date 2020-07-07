import React from 'react';
import PsicologosSection from '../components/auth/psicologos';
import AuthLayout from '../components/auth/Layout';

const Psicologos = () => {
  return (
    <AuthLayout title="Encuentra tu Médico">
      <PsicologosSection />
    </AuthLayout>
  );
};

export default Psicologos;
