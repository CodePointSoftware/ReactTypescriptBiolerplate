import React, { SFC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { reduxStoreType } from '../reducers';
import { incrementCounter, decrementCounter } from '../actions';

type Props = {
    title?: string;
};

const Counter: SFC<Props> = ({ title = 'Counter' }) => {
    const dispatch = useDispatch();

    const counterValue = useSelector((state: reduxStoreType) => state.counter.counter);

    const increment = () => dispatch(incrementCounter());
    const decrement = () => dispatch(decrementCounter());

    return (
        <>
            <h1>
                This is Sync example.
            </h1>
            <p>{title}: <span className="counter">{counterValue}</span></p>
            <button onClick={increment}>Increment</button>
            <button onClick={decrement}>Decrement</button>
        </>
    );
};

export default Counter;