import React from 'react'
import Navbar from './Navbar'
import UserDropdown from './partials/UserDropdown'
import InfoIcon from '@material-ui/icons/Info';

interface LayoutProps {
    children: React.ReactChild | Array<React.ReactChild>;
    title: String;
}

const Layout = ({ children, title }: LayoutProps) => {

    return (
        <div>

            <Navbar />

            <div className="flex text-gray-800">
                {/* Fill content */}
                <div className="flex-none lg:w-1/5 xl:w-1/6 bg-purple-700 h-screen"></div>
                <div className="flex-1">

                    <div className="border-b border-gray-300 w-full flex justify-between items-center p-6 text-gray-800 shadow-md">
                        <div className="flex items-center text-2xl capitalize">
                            <InfoIcon />
                            <p className=" px-2">{title}</p>
                        </div>

                        {/* User dropdown */}
                        <UserDropdown />
                    </div>

                    {children}
                </div>
            </div>
        </div>
    )
}

export default Layout
