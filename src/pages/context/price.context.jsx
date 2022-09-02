/**
 * external libs
 */
import React, {createContext} from 'react';

export const PriceContext = createContext({});

export function PriceContextProvider({children}) {
    const prices = {
        sight: 15,
        city: 15,
        country: 20,
    }

    return <PriceContext.Provider value={{prices}}>{children}</PriceContext.Provider>;
}
