import { combineReducers } from 'redux';
import { authReducer } from './authReducer'
import { socketReducer } from './socketReducer'

export default combineReducers({
    auth: authReducer,
    socket: socketReducer,
});