import React from 'react'
import Navbar from './Navbar'

interface LayoutProps {
    children: React.ReactChild | Array<React.ReactChild>;
}

const Layout = ({ children }: LayoutProps) => {
    return (
        <div>

            <Navbar />

            <div className="flex text-gray-800">
                {/* Fill content */}
                <div className="flex-none w-1/6 bg-purple-700 h-screen"></div>
                <div className="flex-1">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default Layout
