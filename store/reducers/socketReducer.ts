import * as types from '../actionTypes';
import { updateObject } from '../utility';

const initialState = {
  socket: null,
  loading: false,
  error: null,
};

const startSocket = (state: typeof initialState, action: any) => {
  return updateObject(state, {
    error: null,
    loading: true,
  });
};

const successSocket = (state: typeof initialState, action: any) => {
  return updateObject(state, {
    loading: false,
    error: null,
    socket: action.socket,
  });
};
const closeSocket = (state: typeof initialState, action: any) => {
  return updateObject(state, {
    loading: false,
    error: null,
    socket: null,
  });
};

const failSocket = (state: typeof initialState, action: any) => {
  return updateObject(state, {
    loading: false,
    error: action.error,
    socket: null,
  });
};

export const socketReducer = (state = initialState, action: any) => {
  const { type } = action;

  switch (type) {
    case types.SOCKET_START:
      return startSocket(state, action);
    case types.SOCKET_SUCCESS:
      return successSocket(state, action);
    case types.SOCKET_FAIL:
      return failSocket(state, action);
    case types.SOCKET_CLOSE:
    return closeSocket(state, action);
    default:
      return state;
  }
};
