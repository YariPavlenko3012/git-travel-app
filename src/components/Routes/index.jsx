/**
 * external libs
 */
import React from 'react';
import {Route, Link, Switch, useHistory} from 'react-router-dom';
/**
 * services
 */
import AuthService from '../../services/auth.service';
/**
 * pages
 */
import Website from '../../pages/web';
import Admin from '../../pages/admin';
/**
 * constants
 */
import {ADMIN, ADMIN_COUNTRY_LIST_URI} from "../../constants/admin/uri.constant";
/**
 * context
 */
import {AuthContextProvider} from '../../pages/context/auth.context';
import {AlertContextProvider} from '../../pages/context/alert.context';

export default function () {
    AuthService.history = useHistory();

    return (
        <AlertContextProvider>
            <AuthContextProvider>
                <Link to={ADMIN_COUNTRY_LIST_URI}>GO</Link>
                <Switch>
                    <Route path={ADMIN}>
                        <Admin/>
                    </Route>
                    <Route path="/">
                        <Website/>
                    </Route>
                </Switch>
            </AuthContextProvider>
        </AlertContextProvider>
    )
}
