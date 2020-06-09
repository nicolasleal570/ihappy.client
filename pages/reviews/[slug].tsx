import React from 'react';
import Reviews from '../../components/auth/review';
import AuthLayout from '../../components/auth/Layout';
import { useRouter } from 'next/router';
import Axios from 'axios';
import { getReviews } from '../../utils/endpoints';

export default function reviews() {
    const router = useRouter();
    const { slug } = router.query

    return (
        <AuthLayout title="User Biography">
            <Reviews slug={slug} />
        </AuthLayout>
    )
}