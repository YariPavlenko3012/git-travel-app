/**
 * external libs
 */
import React, {useEffect, useContext} from "react";
/**
 * services
 */
import AuthService from "../../../../../services/auth.service";
/**
 * constants
 */
import {AUTH_PAGE_LOGIN_URI} from "../../../../../constants/uri.constant";
/**
 * context
 */
import {AuthContext} from "../../../../context/auth.context";

export default function Logout({ history }){
    const {setUser} = useContext(AuthContext);

    useEffect(() => {
        AuthService.logout()
        setUser(null)
        return history.push(AUTH_PAGE_LOGIN_URI)
    }, [])

    return null
}
