import React from 'react'
import Navbar from './Navbar'

type LayoutProps = {
    children: React.ReactChild | Array<React.ReactChild>;
}

const Layout = ({ children }: LayoutProps) => {
    return (
        <>
            <Navbar />
            <div>
                {children}
            </div>
        </>
    )
}

export default Layout
