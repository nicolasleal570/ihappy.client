import * as types from '../actionTypes';
import { updateObject } from '../utility';

const initialState = {
    posts: [],
    post: {},
    loading: false,
    error: null
}

const startPosts = (state: typeof initialState, action: any) => {
    return updateObject(state, {
        error: null,
        loading: true
    })
}

const successPosts = (state: typeof initialState, action: any) => {
    return updateObject(state, {
        loading: false,
        posts: [...action.posts],
        error: null
    })
}

const failPosts = (state: typeof initialState, action: any) => {
    return updateObject(state, {
        loading: false,
        posts: [],
        error: action.error
    })
}
export const postReducer = (state = initialState, action: any) => {
    const { type } = action;

    switch (type) {
        case types.START_GET_POSTS: return startPosts(state, action)
        case types.SUCCESS_GET_POSTS: return successPosts(state, action)
        case types.FAIL_GET_POSTS: return failPosts(state, action)

        default: { return state }
    }
};