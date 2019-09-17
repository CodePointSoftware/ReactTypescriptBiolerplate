import { INCREMENT, DECREMENT } from './counterActionTypes';
import { FETCH_USER, FETCH_RANDOM_USER, CLEAR_USER, SET_USER } from './userActionTypes';


export const incrementCounter = () => ({
    type: INCREMENT
});

export const decrementCounter = () => ({
    type: DECREMENT
});

export const fetchUser = () => ({
    type: FETCH_USER,
    payload: 1,
})

export const fetchRandomUser = () => ({
    type: FETCH_RANDOM_USER,
    payload: Math.floor(Math.random() * 10) + 1,
})

export const setUser = (user) => ({
    type: SET_USER,
    payload: user,
});

export const clearUser = () => ({
    type: CLEAR_USER
})