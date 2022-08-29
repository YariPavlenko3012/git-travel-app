/**
 * external libs
 */
import React, {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import {Link} from "react-router-dom";
/**
 * components
 */
import StateUpdateForm from '../components/Form/StateUpdate'
import LanguageUpdateForm from '../components/Form/LanguageUpdate'
/**
 * services
 */
import StateService from "../../../../../services/admin/state.service";
/**
 * constant
 */
import {ADMIN_MAKE_SHOW_STATE_URI} from "../../../../../constants/admin/uri.constant";


export default function StateUpdate() {
    const [state, setState] = useState(null)
    const [isReady, setIsReady] = useState(false);
    const {stateId} = useParams();

    const getState = async () => {
        setIsReady(false);
        setState(await StateService.show(stateId));
        setIsReady(true);
    };

    useEffect(() => {
        getState()
    }, []);

    if(!isReady) {
        return <div>Loader...</div>
    }

    return (
      <div>
          <div style={{fontSize: 24, fontWeight: 800, marginBottom: 10}}>
              <Link to={ADMIN_MAKE_SHOW_STATE_URI(stateId)}> {"<-"} Go to view state</Link>
          </div>
          <div style={{paddingBottom: 30}}>
              <StateUpdateForm getState={getState} stateId={stateId} state={state}/>
          </div>
          <div style={{paddingBottom: 30}}>
              <LanguageUpdateForm getState={getState} stateId={stateId} state={state}/>
          </div>
      </div>
    )
}
