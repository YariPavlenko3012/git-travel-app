/**
 * external libs
 */
import React, {useContext} from 'react';
import {Tabs} from "antd";
/**
 * components
 */
import CitiesTable from "../../../components/Tables/Cities";
/**
 * enums
 */
import {DictionaryContext} from "../../../../context/dictionary.context";

export default function CityList() {
    const {dictionary} = useContext(DictionaryContext)

    return (
        <div style={{padding: '10px 0'}}>
            <h3 style={{marginBottom: 20}}>City</h3>
            <Tabs type="card">
                {dictionary.work_statuses.city.map(({label, value}) => (
                    <Tabs.TabPane tab={label} key={value}>
                        <CitiesTable searchParams={{work_status: value}}/>
                    </Tabs.TabPane>
                ))}
            </Tabs>
        </div>
    )
}
