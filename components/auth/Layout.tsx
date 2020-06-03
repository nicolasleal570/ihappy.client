import React from 'react'
import Navbar from './Navbar'

interface LayoutProps {
    children: React.ReactChild | Array<React.ReactChild>;
}

const Layout = ({ children }: LayoutProps) => {
    return (
        <>
            <Navbar />
            <>
                {children}
            </>
        </>
    )
}

export default Layout
