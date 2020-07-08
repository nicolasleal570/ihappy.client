import React from 'react';
import PaymentSelect from '../../components/auth/payment';
import AuthLayout from '../../components/auth/Layout';
import { useRouter } from 'next/router';

const Payment = () => {
  const router = useRouter();
  const { slug } = router.query;

  return (
    <AuthLayout title="Pago">
      <PaymentSelect slug={slug} />
    </AuthLayout>
  );
};

export default Payment;
