/**
 * external libs
 */
import React from 'react'
import {Link, useParams} from "react-router-dom";
/**
 * components
 */
import StateCreateForm from '../components/Form/StateCreate'
/**
 * constants
 */
import {ADMIN_STATE_LIST_URI} from "../../../../../constants/admin/uri.constant";

export default function StateCreate() {
    const {countryId} = useParams();

    return (
      <div>
          <div style={{fontSize: 24, fontWeight: 800, marginBottom: 10}}>
              <Link to={ADMIN_STATE_LIST_URI}> {"<-"} Go to state list</Link>
          </div>
          <div style={{paddingBottom: 30}}>
              <StateCreateForm countryId={countryId}/>
          </div>
      </div>
    )
}
