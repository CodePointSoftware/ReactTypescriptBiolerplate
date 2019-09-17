
import { combineEpics } from 'redux-observable';
import counterEpics from './counterEpics';
import userEpics from './asyncEpics';

export const rootEpic = combineEpics(
    ...counterEpics,
    ...userEpics,
);