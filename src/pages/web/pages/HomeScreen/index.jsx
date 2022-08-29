/**
 * external libs
 */
import React, {useContext, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {ADMIN_COUNTRY_LIST_URI, ADMIN_MAKE_SHOW_COUNTRY_URI} from "../../../../constants/admin/uri.constant";
import {AuthContext} from "../../../context/auth.context";
import {AUTH_PAGE_LOGIN_URI} from "../../../../constants/uri.constant";

export default function HomeScreen({ history }) {
    const {user} = useContext(AuthContext);

    useEffect(() => {
        if(!user){
            return history.push(AUTH_PAGE_LOGIN_URI)
        }

        return  history.push(ADMIN_MAKE_SHOW_COUNTRY_URI(1))
    }, [])

    return null;
}
