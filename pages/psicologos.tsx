import React from 'react'
import Psicologos from '../components/auth/psicologos';
import AuthLayout from '../components/auth/Layout';

function psicologos() {
    return (
        <AuthLayout title="Encuentra Médicos">
            <Psicologos />
        </AuthLayout>
    )
}

export default psicologos
