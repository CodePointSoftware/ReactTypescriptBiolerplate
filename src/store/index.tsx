import { combineReducers } from '@reduxjs/toolkit';

const rootReducer = combineReducers({});

export type ReduxStoreType = ReturnType<typeof rootReducer>;

export { rootReducer };
