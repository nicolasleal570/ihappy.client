import React from 'react';

import SettingsIcon from '@material-ui/icons/Settings';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import HelpIcon from '@material-ui/icons/Help';
import SidebarLink from './partials/SidebarLink';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import DashboardIcon from '@material-ui/icons/Dashboard';
import SearchIcon from '@material-ui/icons/Search';
import ForumIcon from '@material-ui/icons/Forum';
import CloseIcon from '@material-ui/icons/Close';
import Link from 'next/link';

interface NavbarProps {
  openMenu: () => void;
  closeMenu: () => void;
  isOpen: boolean;
}
const Navbar = ({ openMenu, closeMenu, isOpen }: NavbarProps) => {
  const closeMenuAnimation = () => {
    if (isOpen) {
      closeMenu();
    }
  };

  return (
    <nav
      className={`${
        isOpen ? 'w-full' : 'w-0'
      } absolute left-0 top-0 z-40 h-full lg:relative lg:w-auto lg:left-auto lg:top-auto transition duration-700 ease-in-out`}
      style={{
        backgroundColor: 'rgba(0,0,0,0.5)',
      }}
    >
      <div
        className={`lg:fixed w-8/12 md:w-4/12 lg:w-1/5 xl:w-1/6 bg-purple-700 h-screen overflow-y-auto custom-scroll transition duration-700 ease-in-out transform ${isOpen ? 'translate-x-0' : '-translate-x-56 lg:translate-x-0'}`}
      >
        <div className="px-2 pt-2 flex flex-row-reverse lg:hidden">
          <button
            onClick={closeMenuAnimation}
            className="leading-none p-1 bg-transparent rounded"
          >
            <CloseIcon className="text-white" />
          </button>
        </div>
        <Link href="/dashboard">
          <div className="cursor-pointer flex items-center bg-purple-700 lg:px-4 lg:pt-4 lg:pb-10 px-2 my-6">
            <img src="/favicon.png" className="w-12 mr-1" />
            <span className="cursor-pointer font-bold text-4xl tracking-tight text-white">
              iHappy
            </span>
          </div>
        </Link>

        <div className="flex flex-col">
          <SidebarLink title="Dashboard" url="/dashboard">
            <DashboardIcon className="text-white" />
          </SidebarLink>

          <SidebarLink title="Chats" url="/chat">
            <ForumIcon className="text-white" />
          </SidebarLink>

          <SidebarLink
            title="Account Overview"
            isDropdown
            options={[{ url: '/profile', name: 'My Profile' }]}
          >
            <AccountCircleIcon className="text-white" />
          </SidebarLink>

          <SidebarLink
            title="Payments"
            isDropdown
            options={[
              { url: '/payments', name: 'See All' },
              { url: '/payments', name: 'Manage Payments' },
            ]}
          >
            <AccountBalanceIcon className="text-white" />
          </SidebarLink>

          <SidebarLink title="Search" url="/search">
            <SearchIcon className="text-white" />
          </SidebarLink>

          <SidebarLink title="Settings" url="/settings">
            <SettingsIcon className="text-white" />
          </SidebarLink>

          <SidebarLink title="Help" url="/help">
            <HelpIcon className="text-white" />
          </SidebarLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
