import React, { SFC, useState } from 'react';
import WithReduxStore from './withReduxStore';

import Counter from './components/counter';
import User from './components/user';


const App: SFC = () => (
    <WithReduxStore>
        <Counter />
        <User />
    </WithReduxStore>
)

export default App;
