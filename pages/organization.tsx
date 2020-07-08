import React from 'react'
import Organization from '../components/auth/organization';
import AuthLayout from '../components/auth/Layout';

const psicologos = ()=> {
    return (
        <AuthLayout title="Schedule">
            <Organization />
        </AuthLayout>
    )
}

export default psicologos