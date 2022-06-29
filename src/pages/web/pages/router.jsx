/**
 * external libs
 */
import React, {Fragment, lazy, useMemo} from 'react';
import {Switch, Route, Link} from 'react-router-dom';
/**
 * constant
 */
import HomeScreen from './HomeScreen'
import {AUTH_PAGE_LOGIN_URI,} from "../../../constants/uri.constant";
import GuestRoute from "../../../components/Routes/Permission/GuestRoute";
import {ADMIN_COUNTRY_LIST_URI} from "../../../constants/admin/uri.constant";


export default function RouterPage() {
    const routes = useMemo(() => ([
        {
            layout: GuestRoute,
            path: AUTH_PAGE_LOGIN_URI,
            component: lazy(() => import('./Auth/Login'))
        },
    ]), []);
    {console.log('WEB')}
    
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
