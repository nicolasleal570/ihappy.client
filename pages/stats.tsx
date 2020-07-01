import React from 'react'
import Stats from '../components/auth/stats';
import AuthLayout from '../components/auth/Layout';

const psicologos = ()=> {
    return (
        <AuthLayout title="Metricas de la pagina">
            <Stats />
        </AuthLayout>
    )
}

export default psicologos