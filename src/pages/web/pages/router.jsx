/**
 * external libs
 */
import React, {lazy, useMemo} from 'react';
import {Switch} from 'react-router-dom';
/**
 * constant
 */
import {AUTH_PAGE_LOGIN_URI,} from "../../../constants/uri.constant";
import GuestRoute from "../../../components/Routes/Permission/GuestRoute";


export default function RouterPage() {
    const routes = useMemo(() => ([
        {
            layout: GuestRoute,
            path: "/",
            component: lazy(() => import('./Auth/Login'))
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
          </Switch>
      </div>
    );
}
