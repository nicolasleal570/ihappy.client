import React from 'react'
import Header from '../components/public/home/Header'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux';
import PublicLayout from '../components/public/Layout';

const index = () => {
    return (
        <PublicLayout>
            <Header />
        </PublicLayout>
    )
}

export default index
