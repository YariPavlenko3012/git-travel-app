/**
 * external libs
 */
import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom'
import {Button, Tabs} from 'antd'
/**
 * components
 */
import StateTable from "../../../components/Tables/States";
/**
 * services
 */
import StateService from "../../../../../services/admin/state.service";

export default function CountryList() {
    const [state, setState] = useState(null);

    const getState = async (params = {}) => {
        setState(await StateService.list(params))
    };

    useEffect(() => {
        getState({ country_id: 1});
    }, []);

    if(!state) {
        return <div>Loader...</div>
    }

    return (
      <div>
          <h3 style={{marginBottom: 20, display: "flex", justifyContent: "space-between"}}>
              State
          </h3>
          <StateTable stateList={state} getState={getState}/>
      </div>
    )
}
