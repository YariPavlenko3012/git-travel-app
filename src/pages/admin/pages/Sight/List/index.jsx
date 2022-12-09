/**
 * external libs
 */
import React from 'react';
import {Tabs} from "antd";
/**
 * components
 */
import SightTab from './components/Tab';
/**
 * services
 */
import SightService from "../../../../../services/admin/sight.service";
/**
 * enums
 */
import SightWorkStatusEnum from "../../../../../enums/SightWorkStatus";

export default function SightList() {
    const getSight = async (params = {}) => {
        const copyParams = JSON.parse(JSON.stringify(params));

        if(copyParams.filters) {
            if(copyParams.filters?.name) {
                copyParams.sight_name = copyParams.filters.name[0];
            }
        }

        return await SightService.list({country_id: 1, ...copyParams})
    };

    const getPendingSight = async (params = {}) => {
        return await getSight({...params, country_id: 1, eq: {work_status: SightWorkStatusEnum.pending}})
    }

    const getDoneSight = async (params = {}) => {
        return await getSight({...params, country_id: 1, eq: {work_status: SightWorkStatusEnum.done}})
    }

    return (
      <div>
          <div style={{padding: '10px 0'}}>
              <h3 style={{marginBottom: 20}}>Sight</h3>
              <Tabs type="card">
                  <Tabs.TabPane tab="Pending" key="1">
                      <SightTab getSights={getPendingSight}/>
                  </Tabs.TabPane>
                  <Tabs.TabPane tab="Done" key="2">
                      <SightTab getSights={getDoneSight}/>
                  </Tabs.TabPane>
              </Tabs>
          </div>
      </div>
    )
}
