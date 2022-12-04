/**
 * external libs
 */
import { io } from 'socket.io-client';
import React, {createContext, useState, useCallback, useEffect} from 'react';
/**
 *  components
 */
import AuthService from '../../services/auth.service';

export const SocketContext = createContext({});

export function SocketContextProvider({children}) {
    const [isReady, setIsReady] = useState(false);
    const socket = io('http://localhost:3002', {
        extraHeaders: {
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImlhdCI6MTY2ODk3MDAyMX0.oUHTFqYm_n30i_2Db4sFXa12p25KbwVOzxzmICBV0OE'
        }
    });

    useEffect(() => {
        setIsReady(true)
    }, []);


    return isReady ? <SocketContext.Provider value={{socket}}>{children}</SocketContext.Provider> : null;
}
