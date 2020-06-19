import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { logout } from '../../../store/actions/authAction';
import Link from 'next/link';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import { AllScreenLoader } from '../../Loader';
import { LOGOUT } from '../../../utils/events';
import { socketLogout } from '../../../store/actions/socketAction';

const UserDropdown = () => {
  const { user, loading } = useSelector((state: any) => state.auth);
  const { socket }: { socket: SocketIOClient.Socket } = useSelector(
    (state: any) => state.socket
  );

  const [isOpen, setIsOpen] = React.useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  const emitLogoutEvent = () => {
    socket.emit('logout', user._id);
    dispatch(socketLogout());
  };

  const handleLogout = () => {
    dispatch(logout());
    emitLogoutEvent();
    router.push('/');
  };

  return (
    <>
      <div className="relative ml-auto">
        {/* Button Image */}
        <button
          onClick={() => setIsOpen((isOpen) => !isOpen)}
          className="flex justify-between items-center focus:outline-none"
        >
          {/*  */}
          <div className="flex bg-purple-700 w-10 h-10 rounded-full overflow-hidden flex justify-center items-center">
            <img
              className="w-full h-full object-cover"
              src={user?.avatar}
              alt="profile"
            />
          </div>
          <p className="w-32 truncate px-2">
            {user?.first_name} {user?.last_name}
          </p>
          <KeyboardArrowDownIcon className="text-lg" />
        </button>

        {/* Dropdown */}
        <div
          className={`w-48 ${
            isOpen ? 'absolute' : 'hidden'
          } text-left z-50 mt-2 bg-gray-200 border border-gray-300 rounded shadow-md right-0`}
        >
          <Link href="/profile">
            <a className="block px-4 py-2 hover:bg-purple-400 hover:text-white w-full rounded-t">
              Account Overview
            </a>
          </Link>
          <Link href="/help">
            <a className="block px-4 py-2 hover:bg-purple-400 hover:text-white w-full">
              Help
            </a>
          </Link>
          <div className="border-t border-gray-400"></div>
          <button
            onClick={handleLogout}
            className="block px-4 py-2 hover:bg-purple-400 hover:text-white w-full rounded-b text-left"
          >
            Log out
          </button>
        </div>
      </div>
    </>
  );
};

export default UserDropdown;
