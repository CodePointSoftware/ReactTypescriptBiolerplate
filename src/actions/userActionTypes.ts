import { UserResponseInterface } from "../models/userModel";

export const FETCH_USER = 'FETCH_USER';
export const SET_USER = 'SET_USER';
export const FETCH_RANDOM_USER = 'FETCH_RANDOM_USER';
export const CLEAR_USER = 'CLEAR_USER';

interface fetchUser {
    type: typeof FETCH_USER;
    payload: number;
}

interface setUser {
    type: typeof SET_USER;
    payload: UserResponseInterface
}

interface fetchRandomUser {
    type: typeof FETCH_RANDOM_USER;
    payload: number;
}

interface clearUser {
    type: typeof CLEAR_USER;
}

export type userActionTypes = fetchUser | fetchRandomUser | clearUser | setUser;