import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Router, { useRouter } from 'next/router';
import Link from 'next/link';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import { socketLogout } from '../../../store/actions/socketAction';
import { logout } from '../../../store/actions/authAction';


/**
 * Este componente es el dropdown del usuario logeado, arriba a la derecha.
 * @visibleName UserDropdown
 */
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
    socket.close();
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
          <div className="bg-purple-700 w-10 h-10 rounded-full overflow-hidden flex justify-center items-center">
            <img
              className="w-full h-full object-cover"
              src={user?.avatar}
              alt="profile"
            />
          </div>
          <p className="hidden lg:block w-32 truncate px-2">
            {user?.first_name} {user?.last_name}
          </p>
          <KeyboardArrowDownIcon className="text-lg" />
        </button>

        {/* Dropdown */}
        {isOpen ? (
          <div
            className={`absolute w-48 text-left z-50 mt-4 bg-gray-100 border border-gray-400 rounded shadow-lg right-0`}
          >
            <Link href="/profile">
              <a className="block px-4 py-2 hover:bg-purple-400 hover:text-white w-full rounded-t">
                Account Overview
              </a>
            </Link>
            <Link href="/faq-contact">
              <a className="block px-4 py-2 hover:bg-purple-400 hover:text-white w-full">
                Help
              </a>
            </Link>
            <div className="border-t border-gray-400"></div>
            <button
              onClick={handleLogout}
              className="block px-4 py-2 text-red-400 font-semibold hover:bg-purple-400 hover:text-white w-full rounded-b text-left"
            >
              Log out
            </button>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default UserDropdown;
