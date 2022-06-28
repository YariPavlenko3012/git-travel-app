/**
 * external libs
 */
import React, {lazy, useMemo} from 'react';
import {Switch, Route} from 'react-router-dom';
/**
 * constant
 */
import {
    ADMIN_COUNTRY_LIST_URI,
    ADMIN_CITY_LIST_URI,
    ADMIN_LANGUAGE_LIST_URI,
    ADMIN_CURRENCY_LIST_URI,
    ADMIN_EDIT_COUNTRY_URI,
    ADMIN_EDIT_CITY_URI,
    ADMIN_EDIT_LANGUAGE_URI,
    ADMIN_EDIT_CURRENCY_URI,
    ADMIN_CREATE_COUNTRY_URI,
    ADMIN_SHOW_COUNTRY_URI,
    ADMIN_CREATE_CITY_URI,
    ADMIN_SHOW_CITY_URI,
    ADMIN_CREATE_LANGUAGE_URI,
    ADMIN_SIGHT_LIST_URI,
    ADMIN_EDIT_SIGHT_URI,
    ADMIN_SHOW_SIGHT_URI,
    ADMIN_CREATE_SIGHT_URI,
    ADMIN_CREATE_CURRENCY_URI,
} from "../../../constants/admin/uri.constant";
import AuthRoute from "../../../components/Routes/Permission/AuthRoute";


export default function RouterPage() {
    const routes = useMemo(() => ([
        {
            layout: AuthRoute,
            path: ADMIN_COUNTRY_LIST_URI,
            component: lazy(() => import('./Country/List'))
        },
        {
            layout: AuthRoute,
            path: ADMIN_EDIT_COUNTRY_URI,
            component: lazy(() => import('./Country/Edit'))
        },
        {
            layout: AuthRoute,
            path: ADMIN_CREATE_COUNTRY_URI,
            component: lazy(() => import('./Country/Create'))
        },
        {
            layout: AuthRoute,
            path: ADMIN_SHOW_COUNTRY_URI,
            component: lazy(() => import('./Country/Show'))
        },
        {
            layout: AuthRoute,
            path: ADMIN_CITY_LIST_URI,
            component: lazy(() => import('./City/List'))
        },
        {
            layout: AuthRoute,
            path: ADMIN_EDIT_CITY_URI,
            component: lazy(() => import('./City/Edit'))
        },
        {
            layout: AuthRoute,
            path: ADMIN_SHOW_CITY_URI,
            component: lazy(() => import('./City/Show'))
        },
        {
            layout: AuthRoute,
            path: ADMIN_CREATE_CITY_URI,
            component: lazy(() => import('./City/Create'))
        },
        {
            layout: AuthRoute,
            path: ADMIN_SIGHT_LIST_URI,
            component: lazy(() => import('./Sight/List'))
        },
        {
            layout: AuthRoute,
            path: ADMIN_EDIT_SIGHT_URI,
            component: lazy(() => import('./Sight/Edit'))
        },
        {
            layout: AuthRoute,
            path: ADMIN_SHOW_SIGHT_URI,
            component: lazy(() => import('./Sight/Show'))
        },
        {
            layout: AuthRoute,
            path: ADMIN_CREATE_SIGHT_URI,
            component: lazy(() => import('./Sight/Create'))
        },
        {
            layout: AuthRoute,
            path: ADMIN_LANGUAGE_LIST_URI,
            component: lazy(() => import('./Language/List'))
        },
        {
            layout: AuthRoute,
            path: ADMIN_EDIT_LANGUAGE_URI,
            component: lazy(() => import('./Language/Edit'))
        },
        // {
        //     layout: AuthRoute,
        //     path: ADMIN_SHOW_LANGUAGE_URI,
        //     component: lazy(() => import('./Language/Show'))
        // },
        {
            layout: AuthRoute,
            path: ADMIN_CREATE_LANGUAGE_URI,
            component: lazy(() => import('./Language/Create'))
        },
        {
            layout: AuthRoute,
            path: ADMIN_EDIT_CURRENCY_URI,
            component: lazy(() => import('./Currency/Edit'))
        },
        {
            layout: AuthRoute,
            path: ADMIN_CURRENCY_LIST_URI,
            component: lazy(() => import('./Currency/List'))
        },
        // {
        //     layout: AuthRoute,
        //     path: ADMIN_SHOW_CURRENCY_URI,
        //     component: lazy(() => import('./Currency/Show'))
        // },
        {
            layout: AuthRoute,
            path: ADMIN_CREATE_CURRENCY_URI,
            component: lazy(() => import('./Currency/Create'))
        },
    ]), []);

    return (
        <div>
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
