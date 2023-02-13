/**
 * external libs
 */
import React, {useContext} from 'react';
import {Tabs} from "antd";
/**
 * components
 */
import SightsTable from "../../../components/Tables/Sights";
/**
 * context
 */
import {DictionaryContext} from "../../../../context/dictionary.context";

export default function SightList() {
    const {dictionary} = useContext(DictionaryContext)

    return (
      <div>
          <div style={{padding: '10px 0'}}>
              <h3 style={{marginBottom: 20}}>Sight</h3>
              <Tabs type="card">
                  {dictionary.work_statuses.sight.map(({value, label}) => (
                      <Tabs.TabPane tab={label} key={value}>
                          <SightsTable searchParams={{eq: {work_status: [value]}}}/>
                      </Tabs.TabPane>
                  ))}
              </Tabs>
          </div>
      </div>
    )
}
