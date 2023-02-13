/**
 * external libs
 */
import React from 'react';
import {Tabs} from "antd";
/**
 * components
 */
import SightsTable from "../../../../components/Tables/Sights";

export default function CheckCoordinateList() {
    return (
      <div>
          <div style={{padding: '10px 0'}}>
              <h3 style={{marginBottom: 20}}>Check coordinate</h3>

              <SightsTable searchParams={{eq: {check_coordinates: [0]}}}/>
          </div>
      </div>
    )
}
