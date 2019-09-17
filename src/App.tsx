import React, { useState } from 'react';

type Props = {
    title?: string;
    initialValue?: number;
};

const App: React.FunctionComponent<Props> = ({ title = 'Counter', initialValue = 0 }) => {
    const [counter, setCounter] = useState(initialValue);

    const increment = () => setCounter(counter + 1);
    const decrement = () => setCounter(counter - 1);

    return (
        <>
            <h1>
                This is a Basic Typescript Component with {title}: <span className="counter">{counter}</span>
            </h1>
            <button onClick={increment}>Increment</button>
            <button onClick={decrement}>Decrement</button>
        </>
    );
};

export default App;
