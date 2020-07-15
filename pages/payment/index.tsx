import React from 'react';
import MostrarFacturas from '../../components/auth/myPayments';
import AuthLayout from '../../components/auth/Layout';

const Profile = () => {
  return (
    <AuthLayout title="Pagos">
      <MostrarFacturas />
    </AuthLayout>
  );
};

export default Profile;

