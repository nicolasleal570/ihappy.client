import React from 'react';
import Sidebar from '../components/auth/Sidebar';
import AuthLayout from '../components/auth/Layout';

export default function account() {
    return (
        <AuthLayout>
            <Sidebar />
        </AuthLayout>
    )
}
