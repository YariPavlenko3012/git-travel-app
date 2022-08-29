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
/**
 * styles
 */
import 'react-slidedown/lib/slidedown.css'

export default function () {

    return (
      <PriceContextProvider>
          <Suspense fallback={null}>
              <WebRouter/>
          </Suspense>
      </PriceContextProvider>
    );
}





