/**
 * external libs
 */
import React from 'react'
import {Link} from "react-router-dom";
/**
 * components
 */
import CountryCreateForm from '../components/Form/CountryCreate'
/**
 * constants
 */
import {ADMIN_COUNTRY_LIST_URI} from "../../../../../constants/admin/uri.constant";

export default function CountryCreate() {
    return (
      <div>
          <div style={{fontSize: 24, fontWeight: 800, marginBottom: 10}}>
              <Link to={ADMIN_COUNTRY_LIST_URI}> {"<-"} Go to country list</Link>
          </div>
          <div style={{paddingBottom: 30}}>
              <CountryCreateForm/>
          </div>
      </div>
    )
}
