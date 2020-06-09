import React from 'react';
import Dashboard from '../components/auth/Dashboard';
import AuthLayout from '../components/auth/Layout';

export default function account() {
    return (
        <AuthLayout title="Dashboard">
            <Dashboard />
        </AuthLayout>
    )
}
