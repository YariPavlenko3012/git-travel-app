/**
 * external libs
 */
import React from 'react'
import {Tabs} from 'antd'
/**
 * external libs
 */
import Registration from './Registration'
import Login from './Login'

export default function Auth() {
    return (
        <Tabs defaultActiveKey="login">
            <Tabs.TabPane tab="Login" key="login">
                <Login/>
            </Tabs.TabPane>
        </Tabs>
    )
}
