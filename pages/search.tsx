import React from 'react'
import Search from '../components/auth/search';
import AuthLayout from '../components/auth/Layout';

function search() {
    return (
        <AuthLayout title="Encuentra Médicos">
            <Search />
        </AuthLayout>
    )
}

export default search
