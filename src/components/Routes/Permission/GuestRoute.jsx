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
import {ADMIN_COUNTRY_LIST_URI} from "../../../constants/admin/uri.constant";

export default function ({ children, ...rest }) {
	const { user } = useContext(AuthContext);
	return user ? <Redirect to={ADMIN_COUNTRY_LIST_URI} /> : <Route {...rest} />;
}
