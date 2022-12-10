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
/**
 * styles
 */
import 'react-slidedown/lib/slidedown.css'

export default function () {

    return (
        <PriceContextProvider>
            <SettingsContextProvider>
                <Suspense fallback={null}>
                    <WebRouter/>
                </Suspense>
            </SettingsContextProvider>
        </PriceContextProvider>
    );
}





