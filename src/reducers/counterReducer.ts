import { counterActionTypes, INCREMENT, DECREMENT } from '../actions/counterActionTypes';

interface counterReducerState {
    counter: number;
}

const initialState: counterReducerState = {
    counter: 0
}

export default (state: counterReducerState = initialState, action: counterActionTypes) => {
    switch (action.type) {
        case INCREMENT:
            return {
                counter: state.counter + 1,
            }
        case DECREMENT:
            return {
                counter: state.counter - 1,
            }
    }
    return state;
}