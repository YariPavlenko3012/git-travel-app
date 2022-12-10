/**
 * external libs
 */
import React, {useEffect} from "react";
import {Tabs} from "antd";
/**
 * components
 */
import CreateExcursion from './Create'
import ShowExcursion from './Show'
import ExcursionService from "../../../../services/admin/excursion.service";

export default function Excursions(){
    useEffect(() => {
        ExcursionService.list()
    }, [])

    return (
        <Tabs type="card" >
            <Tabs.TabPane tab="Create" key="2">
                <CreateExcursion />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Show" key="1">
                <ShowExcursion />
            </Tabs.TabPane>
        </Tabs>
    )
}
