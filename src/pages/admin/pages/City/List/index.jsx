/**
 * external libs
 */
import React, {useEffect} from 'react';
import {Tabs} from "antd";
/**
 * components
 */
import CityTab from "./components/Tab"
/**
 * services
 */
import CityService from "../../../../../services/admin/city.service";
/**
 * enums
 */
import CityWorkStatusEnum from "../../../../../enums/CityWorkStatus";

export default function CityList() {
    const getCity = async (params = {}) => {
        const copyParams = JSON.parse(JSON.stringify(params));

        if (copyParams.filters) {
            if (copyParams.filters.country) {
                copyParams.country_name = copyParams.filters.country[0];
            }

            if (copyParams.filters.name) {
                copyParams.city_name = copyParams.filters.name[0];
            }
        }

        return await CityService.list({country_id: 1, ...copyParams})
    };

    const getPendingCity = async (params = {}) => {
        return await getCity({...params, work_status: CityWorkStatusEnum.pending})
    }

    const getInProgressCity = async (params = {}) => {
        return await getCity({...params, work_status: CityWorkStatusEnum.inProgress})
    }

    const getDoneCity = async (params = {}) => {
        return await getCity({...params, work_status: CityWorkStatusEnum.done, per_page: 100})
    }


    return (
        <div style={{padding: '10px 0'}}>
            <h3 style={{marginBottom: 20}}>City</h3>
            <Tabs type="card">
                <Tabs.TabPane tab="Pending" key="1">
                    <CityTab getCity={getPendingCity}/>
                </Tabs.TabPane>
                <Tabs.TabPane tab="In Progress" key="2">
                    <CityTab getCity={getInProgressCity}/>
                </Tabs.TabPane>
                <Tabs.TabPane tab="Done" key="3">
                    <CityTab getCity={getDoneCity}/>
                </Tabs.TabPane>
            </Tabs>
        </div>
    )
}
