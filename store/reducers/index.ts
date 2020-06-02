import { combineReducers } from 'redux';
import { postReducer } from './postReducer';
import { authReduder } from './authReducer'

export default combineReducers({
    post: postReducer,
    auth: authReduder
});