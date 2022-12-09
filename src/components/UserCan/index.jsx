/**
 * external libs
 */
import React, {useContext} from "react";
import {AuthContext} from "../../pages/context/auth.context";

export default function UserCan({ children, checkRole }){
    const {user} = useContext(AuthContext)

    if(checkRole !== user.role){
        return null
    }

    return children;
}
