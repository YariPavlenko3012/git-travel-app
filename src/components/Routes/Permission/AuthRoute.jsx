/**
 * external libs
 */
import React, {useContext} from 'react';
import {Redirect, Route} from 'react-router-dom';
/**
 * context
 */
import {AuthContext} from '../../../pages/context/auth.context';
/**
 * constants
 */
import {AUTH_PAGE_LOGIN_URI} from '../../../constants/uri.constant';

export default function ({children, location, ...rest}) {
    const {user} = useContext(AuthContext);

    return user ? (
      <Route {...rest} />
    ) : (
        <Redirect
            to={{
                state: {from: location},
                pathname: AUTH_PAGE_LOGIN_URI,
            }}
        />
    );
}
