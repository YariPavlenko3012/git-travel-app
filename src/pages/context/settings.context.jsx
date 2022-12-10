/**
 * external libs
 */
import React, {createContext, useEffect, useState} from 'react';
/**
 * services
 */
import StorageService from "../../services/storage.service";
/**
 * services
 */
import TablesKeyEnum from "../../enums/TablesKey";

export const SettingsContext = createContext({});

export function SettingsContextProvider({children}) {
    const [settings, setSettings] = useState(null)

    const generateTableSettings = (currentSettings) => {
        const tableSettings = {table: currentSettings.table || {}}

        TablesKeyEnum.list.forEach(( tableKey) => {
            if(!tableSettings.table[tableKey]){
                tableSettings.table[tableKey] = {}
            }
        })

        return tableSettings
    }

    const getSettings = () => {
        let currentSettings = StorageService.settings || {}

        currentSettings = {
            ...generateTableSettings(currentSettings),
        }

        setSettings(currentSettings)
    }

    useEffect(() => {
        getSettings()
    }, [])

    if(!settings){
        return null
    }

    return <SettingsContext.Provider value={{settings}}>{children}</SettingsContext.Provider>;
}
