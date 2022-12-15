/**
 * external libs
 */
import React, {createContext, useEffect, useState} from 'react';
/**
 * services
 */
import DictionaryService from "../../services/dictionary.service";

export const DictionaryContext = createContext({});

export function DictionaryContextProvider({children}) {
    const [dictionary, setDictionary] = useState(null)

    const getDictionary = async () => {
        setDictionary(await DictionaryService.enums())
    }

    useEffect(() => {
        getDictionary()
    }, [])

    if(!dictionary){
        return null
    }

    return <DictionaryContext.Provider value={{dictionary}}>{children}</DictionaryContext.Provider>;
}
