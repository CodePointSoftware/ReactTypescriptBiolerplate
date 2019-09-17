import React, { SFC, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser, fetchRandomUser, clearUser } from '../actions';
import { reduxStoreType } from '../reducers';


const User: SFC = ({ }) => {
    const dispatch = useDispatch();
    const userReducer = useSelector((state: reduxStoreType) => state.user);
    const preStyles = {
        background: 'rgb(248,248,248)',
        color: 'rgba(0,0,0,0.8)',
        padding: '20px',
        width: '100%',
        height: '100%',
        borderRadius: '5px',
        boxShadow: 'inset 0px 0px 5px 0px rgba(0,0,0,0.4)',
    };

    return (
        <Fragment>
            <h1 style={{ marginTop: '100px' }}>
                This is Async example.
            </h1>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', marginTop: '50px' }}>
                <button onClick={() => dispatch(fetchUser())}>FETCH HERO</button>
                <button onClick={() => dispatch(fetchRandomUser())}>FETCH RANDOM HERO</button>
                <button onClick={() => dispatch(clearUser())}>CLEAR USER</button>
            </div>
            <div style={{ width: '500px' }}>
                {!userReducer.loading &&
                    <div style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'flex-start', marginTop: '25px'
                    }}>
                        <pre style={preStyles}>
                            <code>
                                {JSON.stringify(userReducer.user, null, 2)}
                            </code>
                        </pre>
                    </div >
                }
                {userReducer.loading && (
                    <div style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'flex-start', marginTop: '25px'
                    }}>
                        <pre style={preStyles}>
                            <code>
                                Loading...
                            </code>
                        </pre>
                    </div>
                )}
            </div>
        </Fragment >
    )

}

export default User;