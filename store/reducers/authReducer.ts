import * as types from '../actionTypes';
import { updateObject } from '../utility';

const initialState = {
    token: null,
    user: '',
    loading: false,
    error: null
}


const startAuth = (state: typeof initialState, action: any) => {
    return updateObject(state, {
        error: null,
        loading: true
    })
}

const successAuth = (state: typeof initialState, action: any) => {
    return updateObject(state, {
        loading: false,
        error: null,
        token: action.token,
        user: action.user
    })
}

const failAuth = (state: typeof initialState, action: any) => {
    return updateObject(state, {
        loading: false,
        error: action.error,
        token: null,
        user: ''
    })
}

const logoutAuth = (state: typeof initialState, action: any) => {
    return updateObject(state, {
        token: null,
        user: ''
    });
};

export const authReduder = (state = initialState, action: any) => {
    const { type } = action;

    switch (type) {
        case types.AUTH_START:
            return startAuth(state, action);
        case types.AUTH_SUCCESS:
            return successAuth(state, action);
        case types.AUTH_FAIL:
            return failAuth(state, action);
        case types.AUTH_LOGOUT:
            return logoutAuth(state, action);
        default:
            return state;
    }
};