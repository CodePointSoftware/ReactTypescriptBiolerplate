import { FETCH_RANDOM_USER, FETCH_USER, CLEAR_USER, SET_USER, userActionTypes } from '../actions/userActionTypes';
import User from '../models/userModel';

interface UserReducerState {
    user: User | {};
    loading: boolean;
}

const initialState = {
    user: {},
    loading: false
}

export default (state: UserReducerState = initialState, action: userActionTypes) => {
    switch (action.type) {
        case FETCH_USER:
        case FETCH_RANDOM_USER:
            return {
                ...state,
                loading: true,
            }
        case SET_USER:
            return {
                ...state,
                loading: false,
                user: action.payload
            }
        case CLEAR_USER:
            return initialState;
    }
    return state;
}