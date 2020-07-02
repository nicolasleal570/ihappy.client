import React from 'react';
import Navbar from './Navbar';
import UserDropdown from './partials/UserDropdown';
import InfoIcon from '@material-ui/icons/Info';
import { useSelector, useDispatch } from 'react-redux';
import { AllScreenLoader } from '../Loader';
import Alert from './partials/Alert';
import * as io from 'socket.io-client';
import { backendURL } from '../../utils/endpoints';
import { initSocket } from '../../store/actions/socketAction';

interface LayoutProps {
  children: React.ReactChild | Array<React.ReactChild>;
  title: String;
}

let socket: SocketIOClient.Socket;

const Layout = ({ children, title }: LayoutProps) => {
  const { user, loading } = useSelector((state: any) => state.auth);
  const [incompleteProfile, setIncompleteProfile] = React.useState(false);

  const dispatch = useDispatch();

  // Setting up sockets
  React.useEffect(() => {
    if (user && !loading) {
      socket = io.default(backendURL);
      dispatch(initSocket(socket));
      emitSetUserEvent(user._id);
    }
  }, [user, loading]);

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

  const emitSetUserEvent = (userId: String) => {
    socket.emit('identity', userId);
  };

  return (
    <div className={`${loading ? 'overflow-hidden' : ''}`}>
      {loading && (
        <div className="">
          <AllScreenLoader />
        </div>
      )}

      <Navbar />

      <div className="flex text-gray-800">
        {/* Fill content */}
        <div className="flex-none lg:w-1/5 xl:w-1/6 bg-purple-700 h-screen"></div>
        <div className="flex-1">
          {incompleteProfile && (
            <Alert
              title="Complete Your Profile!"
              description="Your profile will be seen by the users of the entire platform, you can not go without a name browsing there, it detracts from authenticity"
              type="warning"
            />
          )}

          {/* Top Navbar */}
          <div className="border-b border-gray-300 w-full flex justify-between items-center px-6 py-2 text-gray-800 shadow-md">
            <div className="flex items-center text-2xl capitalize">
              <InfoIcon />
              <p className=" px-2">{title}</p>
            </div>

            {/* User dropdown */}
            {user && !loading && <UserDropdown />}
          </div>

          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
