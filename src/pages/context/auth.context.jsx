/**
 * external libs
 */
import React, {createContext, useState, useCallback, useEffect} from 'react';
/**
 *  components
 */
import AuthService from '../../services/auth.service';

export const AuthContext = createContext({});

export function AuthContextProvider({children}) {
    const [user, setUser] = useState(null);
    const [isReady, setIsReady] = useState(false);

    AuthService.setUser = setUser;

    const getUser = useCallback(async () => {
        try {
            const user = await AuthService.me();
            setUser(user);

            return user
        }
        finally {
            setIsReady(true);
        }
    }, []);

    useEffect(() => {
        getUser()
    }, []);


    return isReady ? <AuthContext.Provider value={{user, setUser, getUser}}>{children}</AuthContext.Provider> : null;
}
