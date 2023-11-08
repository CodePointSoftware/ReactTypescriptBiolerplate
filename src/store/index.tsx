import { combineReducers, Reducer } from '@reduxjs/toolkit';
import listReducer from '../pages/list/listSlice'

const rootReducer = combineReducers({
    list:listReducer as Reducer<ReturnType<typeof listReducer>>,
});

export type ReduxStoreType = ReturnType<typeof rootReducer>;

export { rootReducer };
