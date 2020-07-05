import React from 'react'
import Users from '../components/auth/Users';
import AuthLayout from '../components/auth/Layout';

function users() {
    return (
        <AuthLayout title="Encuentra Médicos">
            <Users />
        </AuthLayout>
    )
}

export default users
