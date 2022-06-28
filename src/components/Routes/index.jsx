/**
 * external libs
 */
import React from 'react';
import {Route, Switch, useHistory} from 'react-router-dom';
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
import {ADMIN} from "../../constants/admin/uri.constant";
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
