/**
 * external libs
 */
import React, {Fragment, Suspense} from 'react';
/**
 * components
 */
import WebRouter from './pages/router'
/**
 * styles
 *
 */
import 'react-slidedown/lib/slidedown.css'

export default function () {

    return (
      <Fragment>
          <Suspense fallback={null}>
              <WebRouter/>
          </Suspense>
      </Fragment>
    );
}





