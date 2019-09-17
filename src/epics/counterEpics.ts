import { of } from 'rxjs';
import { switchMap, ignoreElements } from 'rxjs/operators';
import { INCREMENT, DECREMENT } from '../actions/counterActionTypes';
import { decrementCounter, incrementCounter } from '../actions';

// import individual rxjs operators

const incrementCounterEpic = (action$) => {
    return action$.ofType(INCREMENT).pipe(
        switchMap(() => {
            return of(incrementCounter()).pipe(ignoreElements());
        }));
}
const decrementCounterEpic = (action$) => {
    return action$.ofType(DECREMENT).pipe(
        switchMap(() => {
            return of(decrementCounter()).pipe(ignoreElements());
        }));
}

export default [
    incrementCounterEpic,
    decrementCounterEpic,
];