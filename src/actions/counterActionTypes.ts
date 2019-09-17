export const INCREMENT = 'INCREMENT';
export const DECREMENT = 'DECREMENT';

interface counterIncrement {
    type: typeof INCREMENT;
}

interface counterDecrement {
    type: typeof DECREMENT;
}

export type counterActionTypes = counterDecrement | counterIncrement;