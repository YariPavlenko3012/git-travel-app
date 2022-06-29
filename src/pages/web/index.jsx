/**
 * external libs
 */
import React, {Fragment, Suspense} from 'react';
import {Layout} from 'antd';
/**
 * components
 */
import WebRouter from './pages/router'


export default function () {
    {console.log('WEB')}
    
    return (
        <Fragment>
            <Suspense fallback={null}>
                <Layout style={{minHeight: "100vh"}}>
                    <Layout>
                        <WebRouter/>
                    </Layout>
                </Layout>
            </Suspense>
        </Fragment>
    );
}





