import React from 'react';
import ReviewsList from '../../components/auth/review';
import AuthLayout from '../../components/auth/Layout';
import { useRouter } from 'next/router';

const Reviews = () => {
  const router = useRouter();
  const { slug } = router.query;

  return (
    <AuthLayout title="User Biography">
      <ReviewsList slug={slug} />
    </AuthLayout>
  );
};

export default Reviews;
