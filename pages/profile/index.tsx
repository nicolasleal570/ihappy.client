import React from 'react';
import ProfileForm from '../../components/auth/profile';
import AuthLayout from '../../components/auth/Layout';

const Profile = () => {
  return (
    <AuthLayout title="Resumen de tu cuenta">
      <ProfileForm />
    </AuthLayout>
  );
};

export default Profile;
