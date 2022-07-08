/**
 * external libs
 */
import React, {Fragment, lazy, useMemo} from 'react';
import {Switch, Route, Link} from 'react-router-dom';
/**
 * components
 */
import HomeScreen from './HomeScreen'
import AuthRoute from "../../../components/Routes/Permission/AuthRoute";
import GuestRoute from "../../../components/Routes/Permission/GuestRoute";
/**
 * components
 */
import {AUTH_PAGE_LOGIN_URI, AUTH_PAGE_LOGOUT_URI} from "../../../constants/uri.constant";



export default function RouterPage() {
    const routes = useMemo(() => ([
        {
            layout: GuestRoute,
            path: AUTH_PAGE_LOGIN_URI,
            component: lazy(() => import('./Auth/Login'))
        },
        {
            layout: AuthRoute,
            path: AUTH_PAGE_LOGOUT_URI,
            component: lazy(() => import('./Auth/Logout'))
        },
    ]), []);

    return (
      <div style={{width: 800}}>
          <Switch>
              {routes.map((route, i) => (
                <route.layout exact
                              key={i}
                              path={route.path}
                              component={route.component}/>
              ))}
              <Route path={'/'} component={HomeScreen}/>
          </Switch>
      </div>
    );
}
