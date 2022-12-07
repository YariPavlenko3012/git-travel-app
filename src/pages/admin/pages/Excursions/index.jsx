/**
 * external libs
 */
import React from "react";
import {Tabs} from "antd";
/**
 * components
 */
import CreateExcursion from './Create'
import ShowExcursion from './Show'

export default function Excursions(){
    return (
        <Tabs type="card">
            <Tabs.TabPane tab="Show" key="1">
                <ShowExcursion />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Create" key="2">
                <CreateExcursion />
            </Tabs.TabPane>
        </Tabs>
    )
}
