import * as types from '../actionTypes';

const startSocket = () => {
  return {
    type: types.SOCKET_START,
  };
};

const successSocket = (socket: SocketIOClient.Socket) => {
  return {
    type: types.SOCKET_SUCCESS,
    socket,
  };
};

const closeSocket = () => {
  return {
    type: types.SOCKET_CLOSE
  };
};

const failSocket = (error: any) => {
  return {
    type: types.SOCKET_FAIL,
    error,
  };
};

export const socketLogout = ()  => async (
    dispatch: Function
  ) => {
    try{
        dispatch(closeSocket());
    }catch(err){
        dispatch(failSocket(err));
    }
};

export const initSocket = (socket: SocketIOClient.Socket) => async (
  dispatch: Function
) => {
  try {
    dispatch(startSocket());
    dispatch(successSocket(socket));
  } catch (err) {
    dispatch(failSocket(err));
  }
};
