import React from 'react';
import StatsSection from '../components/auth/stats';
import AuthLayout from '../components/auth/Layout';

const Stats = () => {
  return (
    <AuthLayout title="Metricas de la pagina">
      <StatsSection />
    </AuthLayout>
  );
};

export default Stats;
