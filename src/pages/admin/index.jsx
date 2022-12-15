/**
 * external libs
 */
import React, {Suspense} from 'react';
/**
 * components
 */
import WebRouter from './pages/router'
/**
 * context
 */
import {PriceContextProvider} from "../context/price.context";
import {SettingsContextProvider} from "../context/settings.context";
import {DictionaryContextProvider} from "../context/dictionary.context";
/**
 * styles
 */
import 'react-slidedown/lib/slidedown.css'

export default function () {

    return (
        <PriceContextProvider>
            <SettingsContextProvider>
                <DictionaryContextProvider>
                    <Suspense fallback={null}>
                        <WebRouter/>
                    </Suspense>
                </DictionaryContextProvider>
            </SettingsContextProvider>
        </PriceContextProvider>
    );
}





