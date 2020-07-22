import React from 'react';
import Navbar from './Navbar';
import UserDropdown from './partials/UserDropdown';
import InfoIcon from '@material-ui/icons/Info';
import { useSelector, useDispatch } from 'react-redux';
import { AllScreenLoader } from '../Loader';
import Alert from './partials/Alert';
import * as io from 'socket.io-client';
import { backendURL } from '../../utils/endpoints';
import { initSocket, socketLogout } from '../../store/actions/socketAction';
import MenuIcon from '@material-ui/icons/Menu';
import Router from 'next/router';
import { error } from 'console';

type LayoutProps = {
  children: React.ReactChild | Array<React.ReactChild>;
  title?: string;
}

let socket: SocketIOClient.Socket;

/**
 * Este componente es el que contiene el Layout de la PWA, contiene el sidebar, la barra de arriba y los componentes que van variando dependiendo de las acciones.
 * @visibleName Layout
 */
const Layout = ({ children, title = '' }: LayoutProps) => {
  const { user, loading, error } = useSelector((state: any) => state.auth);
  const [incompleteProfile, setIncompleteProfile] = React.useState(false);
  const [menuOpen, setMenuOpen] = React.useState(false);

  const dispatch = useDispatch();

  // Setting up sockets
  React.useEffect(() => {
    if (user && !loading) {
      socket = io.default(backendURL);
      dispatch(initSocket(socket));
      emitSetUserEvent(user._id);
    }

    return () => {
      if (socket) {
        socket.removeAllListeners();
        dispatch(socketLogout());
      }
    };
  }, [user, loading]);

  // Incomplete profile validation
  React.useEffect(() => {
    if (!loading && user) {
      const { first_name, last_name, cedula, address, bio } = user;
      if (
        first_name === '' ||
        !first_name ||
        last_name === '' ||
        !last_name ||
        cedula === '' ||
        !cedula ||
        address === '' ||
        !address ||
        bio === '' ||
        !bio
      ) {
        setIncompleteProfile(true);
      } else {
        setIncompleteProfile(false);
      }
    }
  }, [user]);

  React.useEffect(() => {
    if (!localStorage.getItem('token')) {
      Router.push('/');
    }
  }, [user, loading, error]);

  // Adding new socket ID to the user
  const emitSetUserEvent = (userId: String) => {
    socket.emit('identity', userId);
  };

  // Open menu function
  const openMenu = () => setMenuOpen(true);
  const closeMenu = () => setMenuOpen(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  Router.events.on('routeChangeStart', () => {
    setMenuOpen(false);
  });

  if (loading || !user) {
    return <AllScreenLoader />;
  }

  return (
    <div
      className={`
      ${menuOpen || loading ? 'overflow-hidden h-screen' : ''}
    `}
    >
      <Navbar closeMenu={closeMenu} isOpen={menuOpen} openMenu={openMenu} />

      <div className="flex flex-col lg:flex-row text-gray-800 overflow-hidden">
        {/* Fill content */}
        <div className="hidden lg:block flex-none lg:w-1/5 xl:w-1/6 bg-purple-700 h-screen"></div>
        <div className="relative flex-1">
          {incompleteProfile && (
            <Alert
              title="Complete Your Profile!"
              description="Your profile will be seen by the users of the entire platform, you can not go without a name browsing there, it detracts from authenticity"
              type="warning"
            />
          )}

          {/* Top Navbar */}
          {title !== '' && (
            <div className="border-b border-gray-300 w-full flex justify-between items-center px-4 lg:px-6 py-2 text-gray-800">
              <button
                className="block lg:hidden text-purple-700 py-1 px-2 rounded focus:outline-none outline-none"
                onClick={openMenu}
              >
                <MenuIcon style={{ fontSize: '1.50rem' }} />
              </button>

              <div className="flex flex-1 justify-center lg:justify-start items-center text-2xl capitalize">
                <InfoIcon />
                <p className=" px-2">{title}</p>
              </div>

              {user && !loading && <UserDropdown />}
            </div>
          )}

          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
