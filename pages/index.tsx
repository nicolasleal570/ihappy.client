import React from 'react'
import Header from '../components/public/home/Header'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux';

const index = () => {
    const { user } = useSelector((state: any) => state.auth);
    const router = useRouter();

    React.useEffect(() => {
        if (user) {
            router.push('/reviews');
        }
    }, [user])

    return (
        <Header />
    )
}

export default index
