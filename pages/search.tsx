import React from 'react';
import SearchSection from '../components/auth/search';
import AuthLayout from '../components/auth/Layout';

const Search = () => {
  return (
    <AuthLayout title="Encuentra tu Médico">
      <SearchSection />
    </AuthLayout>
  );
};

export default Search;
