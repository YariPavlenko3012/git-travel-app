/**
 * external libs
 */
import React, {useContext, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {ADMIN_COUNTRY_LIST_URI} from "../../../../constants/admin/uri.constant";
import {AuthContext} from "../../../context/auth.context";
import {AUTH_PAGE_LOGIN_URI} from "../../../../constants/uri.constant";

export default function HomeScreen({ history }) {
    const {user} = useContext(AuthContext);
    
    useEffect(() => {
        if(!user){
            return history.push(AUTH_PAGE_LOGIN_URI)
        }
    
        return  history.push(ADMIN_COUNTRY_LIST_URI)
    }, [])
    
    return null;
}
