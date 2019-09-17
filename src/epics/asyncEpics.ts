import { ajax } from 'rxjs/ajax';
import { switchMap, map } from 'rxjs/operators';
import { setUser } from '../actions';
import { FETCH_USER, FETCH_RANDOM_USER } from '../actions/userActionTypes';
import User, { UserResponseInterface } from '../models/userModel';

// import individual rxjs operators

const fetchUserEpic = (action$) => {
    return action$.ofType(FETCH_USER, FETCH_RANDOM_USER).pipe(
        switchMap(({ payload }) => {
            return ajax.getJSON(`https://swapi.co/api/people/${payload}/`).pipe(
                map((response: UserResponseInterface) => {
                    const user = new User(response);
                    return setUser(user);
                })
            )
        })
    );
}


export default [
    fetchUserEpic
];