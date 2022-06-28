/**
 * external libs
 */
import React, {createContext, useCallback} from 'react';

export const AlertContext = createContext({});

export function AlertContextProvider({children}) {
    const setAlertSuccess = useCallback((message, duration = 5) => {
        alert(message)
    }, []);

    const setAlertError = useCallback((message, duration = 5) => {
        alert(message)
    }, []);

    const setAlertInfo = useCallback((message, duration = 5) => {
        alert(message)
    }, []);

    const setAlertWarning = useCallback((message, duration = 5) => {
        alert(message)
    }, []);

    return <AlertContext.Provider
        value={{setAlertSuccess, setAlertError, setAlertInfo, setAlertWarning}}>{children}</AlertContext.Provider>;
}
