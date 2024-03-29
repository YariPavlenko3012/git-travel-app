/**
 * external libs
 */
import React, {Fragment, lazy, useMemo} from 'react';
import {Switch, Route} from 'react-router-dom';
/**
 * components
 */
import AuthRoute from "../../../components/Routes/Permission/AuthRoute";
import Layout from "../components/Layout";
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
    ADMIN_SIGHT_CHECK_COORDINATE_URI,
    ADMIN_EDIT_LANGUAGE_URI,
    ADMIN_EDIT_CURRENCY_URI,
    ADMIN_CREATE_COUNTRY_URI,
    ADMIN_EXCURSION_LIST,
    ADMIN_EXCURSION_CREATE,
    ADMIN_SHOW_COUNTRY_URI,
    ADMIN_CREATE_CITY_URI,
    ADMIN_SHOW_CITY_URI,
    ADMIN_CREATE_LANGUAGE_URI,
    ADMIN_SIGHT_LIST_URI,
    ADMIN_EDIT_SIGHT_URI,
    ADMIN_SHOW_SIGHT_URI,
    ADMIN_CREATE_SIGHT_URI,
    ADMIN_CREATE_CURRENCY_URI,
    ADMIN_USERS_CREATE,
    ADMIN_STATISTICS_USERS_LIST,
    ADMIN_STATISTICS_PRICE,
    ADMIN_STATE_LIST_URI,
    ADMIN_EDIT_STATE_URI,
    ADMIN_CREATE_STATE_URI,
    ADMIN_SHOW_STATE_URI,
    ADMIN_GENERATE_PLACE_URI,
    ADMIN_ROUTE_URI,
    ADMIN_EXCURSION_SHOW,
    ADMIN_SIGHT_LIST_NEED_REVIEW_URI,
    ADMIN_EXCURSION_EDIT,
    ADMIN_SIGHT_LIST_CHECK_COORDINATE_URI,
    ADMIN_GENERATE_CITY_URI
} from "../../../constants/admin/uri.constant";


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
            path: ADMIN_STATE_LIST_URI,
            component: lazy(() => import('./State/List'))
        },
        {
            layout: AuthRoute,
            path: ADMIN_EDIT_STATE_URI,
            component: lazy(() => import('./State/Edit'))
        },
        {
            layout: AuthRoute,
            path: ADMIN_SHOW_STATE_URI,
            component: lazy(() => import('./State/Show'))
        },
        {
            layout: AuthRoute,
            path: ADMIN_CREATE_STATE_URI,
            component: lazy(() => import('./State/Create'))
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
            path: ADMIN_SIGHT_LIST_NEED_REVIEW_URI,
            component: lazy(() => import('./Sight/NeedReview'))
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
            path: ADMIN_SIGHT_LIST_CHECK_COORDINATE_URI,
            component: lazy(() => import('./Sight/CheckCoordinate/List'))
        },
        {
            layout: AuthRoute,
            path: ADMIN_SIGHT_CHECK_COORDINATE_URI,
            component: lazy(() => import('./Sight/CheckCoordinate/Show'))
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
        {
            layout: AuthRoute,
            path: ADMIN_CREATE_CURRENCY_URI,
            component: lazy(() => import('./Currency/Create'))
        },
        {
            layout: AuthRoute,
            path: ADMIN_USERS_CREATE,
            component: lazy(() => import('./Users/Create'))
        },
        {
            layout: AuthRoute,
            path: ADMIN_STATISTICS_PRICE,
            component: lazy(() => import('./Statistics/Price'))
        },
        {
            layout: AuthRoute,
            path: ADMIN_STATISTICS_USERS_LIST,
            component: lazy(() => import('./Statistics/Users'))
        },
        {
            layout: AuthRoute,
            path: ADMIN_GENERATE_PLACE_URI,
            component: lazy(() => import('./Generate/Place'))
        },
        {
            layout: AuthRoute,
            path: ADMIN_GENERATE_CITY_URI,
            component: lazy(() => import('./Generate/City'))
        },
        {
            layout: AuthRoute,
            path: ADMIN_EXCURSION_LIST,
            component: lazy(() => import('./Excursions/List'))
        },
        {
            layout: AuthRoute,
            path: ADMIN_EXCURSION_CREATE,
            component: lazy(() => import('./Excursions/Create'))
        },
        {
            layout: AuthRoute,
            path: ADMIN_EXCURSION_EDIT,
            component: lazy(() => import('./Excursions/Edit'))
        },
        {
            layout: AuthRoute,
            path: ADMIN_EXCURSION_SHOW,
            component: lazy(() => import('./Excursions/Show'))
        },
        {
            layout: AuthRoute,
            path: ADMIN_ROUTE_URI,
            component: lazy(() => import('./Route'))
        },
    ]), []);

    return (
        <Layout>
            <Switch>
                {routes.map((route, i) => (
                    <route.layout exact
                                  key={i}
                                  path={route.path}
                                  component={route.component}/>
                ))}
            </Switch>
        </Layout>
    );
}
