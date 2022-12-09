/**
 * external libs
 */
import React, {createContext, useCallback} from 'react';
import {notification} from 'antd'

export const AlertContext = createContext({});

export function AlertContextProvider({children}) {
    const [api, contextHolder] = notification.useNotification();

    const openNotification = (message) => {
        api.info({
            message,
            placement: "topRight",
        });
    }

    const setAlertSuccess = useCallback((message, duration = 5) => {
        openNotification(message)
    }, []);

    const setAlertError = useCallback((message, duration = 5) => {
        openNotification(message)
    }, []);

    const setAlertInfo = useCallback((message, duration = 5) => {
        openNotification(message)
    }, []);

    const setAlertWarning = useCallback((message, duration = 5) => {
        openNotification(message)
    }, []);

    return (
        <AlertContext.Provider value={{setAlertSuccess, setAlertError, setAlertInfo, setAlertWarning}}>
            {contextHolder}
            {children}
        </AlertContext.Provider>
    );
}
