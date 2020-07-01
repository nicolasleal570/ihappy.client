import React from 'react'
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import Axios from 'axios';
import SettingsIcon from '@material-ui/icons/Settings';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import HelpIcon from '@material-ui/icons/Help';
import SidebarLink from './partials/SidebarLink';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import DashboardIcon from '@material-ui/icons/Dashboard';
import SearchIcon from '@material-ui/icons/Search';
import ForumIcon from '@material-ui/icons/Forum';
import Link from 'next/link';
import { Divider } from '@material-ui/core';
import { getPacients } from '../../utils/endpoints';

const Navbar = () => {

    const { user } = useSelector((state: any) => state.auth)

    const [modoA, setModoA] = React.useState()

    useEffect(() => {
        let modo = JSON.parse(String(localStorage.getItem('user')));
        console.log(modo.slug)
        setModoA(modo.slug)

    }, [])

    

    return (
        <nav>
            <div className='fixed lg:w-1/5 xl:w-1/6 bg-purple-700 h-screen overflow-y-auto custom-scroll'>

                <Link href="/dashboard">
                    <div className="cursor-pointer flex justify-around items-center bg-purple-700 px-4 pt-4 pb-10">
                        <img src='/favicon.png' className='w-12' />
                        <h1 className='font-mono bold text-white text-4xl'>iHappy</h1>
                    </div>
                </Link>
                {modoA === 'admin'
                    ?
                    <div className='flex flex-col'>
                        <SidebarLink
                            title="Psychologists"
                            url="/psicologos"
                        >
                            <SearchIcon className="text-white" />
                        </SidebarLink>
                        <SidebarLink
                            title="Users"
                            url="/users"
                        >
                            <SearchIcon className="text-white" />
                        </SidebarLink>
                        <SidebarLink
                            title="Stats"
                            url="/stats"
                        >
                            <SearchIcon className="text-white" />
                        </SidebarLink>
                    </div>
                    :

                    <div className='flex flex-col'>
                        <SidebarLink
                            title="Dashboard"
                            url="/dashboard"
                        >
                            <DashboardIcon className="text-white" />
                        </SidebarLink>

                        <SidebarLink
                            title="Chats"
                            url="/chat"
                        >
                            <ForumIcon className="text-white" />
                        </SidebarLink>

                        <SidebarLink
                            title="Account Overview"
                            isDropdown
                            options={[
                                { url: '/profile', name: 'My Profile' }
                            ]}
                        >
                            <AccountCircleIcon className="text-white" />
                        </SidebarLink>

                        <SidebarLink
                            title="Payments"
                            isDropdown
                            options={[
                                { url: '/payments', name: 'See All' },
                                { url: '/payments', name: 'Manage Payments' }
                            ]}
                        >
                            <AccountBalanceIcon className="text-white" />
                        </SidebarLink>

                        <SidebarLink
                            title="Search"
                            url="/search"
                        >
                            <SearchIcon className="text-white" />
                        </SidebarLink>

                        <SidebarLink
                            title="Settings"
                            url="/settings"
                        >
                            <SettingsIcon className="text-white" />
                        </SidebarLink>

                        <SidebarLink
                            title="Help"
                            url="/help"
                        >
                            <HelpIcon className="text-white" />
                        </SidebarLink>

                    </div>
                }
            </div>

        </nav>
    )
}

export default Navbar
