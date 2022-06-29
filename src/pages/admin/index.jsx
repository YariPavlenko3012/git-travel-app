/**
 * external libs
 */
import React, {Fragment, Suspense} from 'react';
/**
 * components
 */
import WebRouter from './pages/router'
import Header from '../admin/components/Header'
/**
 * styles
 *
 */
import 'react-slidedown/lib/slidedown.css'

export default function () {
    
    return (
      <Fragment>
          {console.log('ADMIN')}
          <Suspense fallback={null}>
              <Header />
              <WebRouter/>
          </Suspense>
      </Fragment>
    );
}





