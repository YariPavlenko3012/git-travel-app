/**
 * external libs
 */
import React, {useEffect} from 'react';
import {Tabs} from "antd";
/**
 * components
 */
import CitiesTable from "../../../components/Tables/Cities";
/**
 * enums
 */
import CityWorkStatusEnum from "../../../../../enums/CityWorkStatus";

export default function CityList() {
    return (
        <div style={{padding: '10px 0'}}>
            <h3 style={{marginBottom: 20}}>City</h3>
            <Tabs type="card">
                <Tabs.TabPane tab="Pending" key="1">
                    <CitiesTable searchParams={{country_id: 1, work_status: CityWorkStatusEnum.pending}}/>
                </Tabs.TabPane>
                <Tabs.TabPane tab="In Progress" key="2">
                    <CitiesTable searchParams={{country_id: 1, work_status: CityWorkStatusEnum.inProgress}}/>
                </Tabs.TabPane>
                <Tabs.TabPane tab="Done" key="3">
                    <CitiesTable searchParams={{country_id: 1, work_status: CityWorkStatusEnum.done, per_page: 100}}/>
                </Tabs.TabPane>
            </Tabs>
        </div>
    )
}
