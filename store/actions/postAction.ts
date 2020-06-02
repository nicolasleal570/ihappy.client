import * as types from '../actionTypes';
import Axios from 'axios';
import { getUsers } from '../../utils/endpoints';

const startFetchPosts = () => {
    return {
        type: types.START_GET_POSTS
    };
}

const successFetchPosts = (data: any) => {
    return {
        type: types.SUCCESS_GET_POSTS,
        posts: [...data]
    }
}

const failFetchPosts = (error: any) => {
    return {
        type: types.FAIL_GET_POSTS,
        error: error
    }
}

export const fetchPosts = () => async (dispatch: Function) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    }
    try {
        // Start loading
        dispatch(startFetchPosts());

        const { data } = await Axios.get(getUsers, config); // Getting users

        dispatch(successFetchPosts(data.data)); // Success result

    } catch (err) {
        dispatch(failFetchPosts(err.response?.data.error))
    }
}