/**
 * external libs
 */
import React from 'react';
import {Tabs} from "antd";
/**
 * components
 */
import SightsTable from "../../../components/Tables/Sights";
/**
 * enums
 */
import SightWorkStatusEnum from "../../../../../enums/SightWorkStatus";

export default function SightList() {
    return (
      <div>
          <div style={{padding: '10px 0'}}>
              <h3 style={{marginBottom: 20}}>Sight</h3>
              <Tabs type="card">
                  <Tabs.TabPane tab="Pending" key="1">
                      <SightsTable searchParams={{country_id: 1, eq: {work_status: SightWorkStatusEnum.pending}}}/>
                  </Tabs.TabPane>
                  <Tabs.TabPane tab="Done" key="2">
                      <SightsTable searchParams={{country_id: 1, eq: {work_status: SightWorkStatusEnum.done}}}/>
                  </Tabs.TabPane>
              </Tabs>
          </div>
      </div>
    )
}
