import { combineReducers } from 'redux';
import counter from './counterReducer';
import user from './userReducer'

const rootReducer = combineReducers({
    counter,
    user,
});

export type reduxStoreType = ReturnType<typeof rootReducer>;

export default rootReducer;