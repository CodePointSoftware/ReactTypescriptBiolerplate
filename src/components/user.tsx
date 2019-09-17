import React, { SFC, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser, fetchRandomUser, clearUser } from '../actions';
import { reduxStoreType } from '../reducers';


const User: SFC = ({ }) => {
    const dispatch = useDispatch();
    const userReducer = useSelector((state: reduxStoreType) => state.user);


    return (
        <Fragment>
            <h1 style={{ marginTop: '100px' }}>
                This is Async example.
            </h1>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '50px' }}>
                <button onClick={() => dispatch(fetchUser())}>FETCH HERO</button>
                <button onClick={() => dispatch(fetchRandomUser())}>FETCH RANDOM HERO</button>
                <button onClick={() => dispatch(clearUser())}>CLEAR USER</button>
            </div>
            {!userReducer.loading &&
                <div style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '50px'
                }}>
                    <pre>
                        <code>
                            {JSON.stringify(userReducer.user, null, 2)}
                        </code>
                    </pre>
                </div >
            }
            {userReducer.loading && (
                <div style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '50px'
                }}>
                    Loading...
                </div>
            )}
        </Fragment >
    )

}

export default User;