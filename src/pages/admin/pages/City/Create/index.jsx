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
import {ADMIN_MAKE_SHOW_COUNTRY_URI} from "../../../../../constants/admin/uri.constant";

export default function CityCreate() {
    const {countryId} = useParams();
    
    return (
      <div>
          <div style={{fontSize: 24, fontWeight: 800, marginBottom: 10}}>
              <Link to={ADMIN_MAKE_SHOW_COUNTRY_URI(countryId)}> {"<-"} Go to view country</Link>
          </div>
          <div style={{paddingBottom: 30}}>
              <CityCreateForm countryId={countryId}/>
          </div>
      </div>
    )
}
