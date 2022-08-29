/**
 * external libs
 */
import React from 'react'
import {Link, useParams} from 'react-router-dom'
/**
 * components
 */
import CityCreateForm from '../components/Form/CityCreate'
/**
 * constants
 */
import {
    ADMIN_MAKE_SHOW_STATE_URI
} from "../../../../../constants/admin/uri.constant";

export default function CityCreate() {
    const {stateId} = useParams();

    return (
      <div>
          <div style={{fontSize: 24, fontWeight: 800, marginBottom: 10}}>
              <Link to={ADMIN_MAKE_SHOW_STATE_URI(stateId)}> {"<-"} Go to view state</Link>
          </div>
          <div style={{paddingBottom: 30}}>
              <CityCreateForm stateId={stateId}/>
          </div>
      </div>
    )
}
