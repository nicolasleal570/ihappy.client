import React from 'react'
import Test from '../components/auth/Test'
import AuthLayout from '../components/auth/Layout';

export default function test() {
    return (
        <AuthLayout title="Test X">
            <Test />
        </AuthLayout>
    )
}