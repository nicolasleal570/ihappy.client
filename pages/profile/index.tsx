import React from 'react';
import Profile from '../../components/auth/profile';
import AuthLayout from '../../components/auth/Layout';

export default function profile() {
    return (
        <AuthLayout title="Account Overview">
            <Profile />
        </AuthLayout>
    )
}