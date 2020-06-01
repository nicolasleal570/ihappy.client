import React from 'react'
import Header from '../components/public/home/Header'
import { GlobalContext } from '../context/GlobalState';
import { useRouter } from 'next/router'

const index = () => {
    const { user } = React.useContext(GlobalContext);
    const router = useRouter();

    React.useEffect(() => {
        if (user) {
            router.push('/reviews');
        }
    }, [])

    return (
        <Header />
    )
}

export default index
