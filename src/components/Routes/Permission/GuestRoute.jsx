/**
 * external libs
 */
import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
/**
 * external context
 */
import { AuthContext } from '../../../pages/context/auth.context';
/**
 * external constants
 */
import { AUTH_PAGE_PAGE } from '../../../constants/uri.constant';

export default function ({ children, ...rest }) {
	const { user } = useContext(AuthContext);
	return user ? <Redirect to={AUTH_PAGE_PAGE} /> : <Route {...rest} />;
}
