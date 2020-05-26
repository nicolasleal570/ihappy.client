import React from 'react'
import Navbar from './Navbar'
import {GlobalProvider} from '../../context/GlobalState'

interface LayoutProps {
    children: React.ReactChild | Array<React.ReactChild>;
}

const Layout = ({ children }: LayoutProps) => {
    return (
        <GlobalProvider>
            <Navbar />
            <div>
                {children}
            </div>
        </GlobalProvider>
    )
}

export default Layout
