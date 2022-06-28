/**
 * external libs
 */
import React from 'react'
import {Link, useParams} from 'react-router-dom'
/**
 * components
 */
import SightCreateForm from '../components/Form/SightCreate'
/**
 * constants
 */
import {ADMIN_MAKE_SHOW_CITY_URI} from "../../../../../constants/admin/uri.constant";

export default function SightCreate() {
    const {cityId} = useParams();
    
    return (
      <div>
          <div style={{fontSize: 24, fontWeight: 800, marginBottom: 10}}>
              <Link to={ADMIN_MAKE_SHOW_CITY_URI(cityId)}> {"<-"} Go to view city</Link>
          </div>
          <div style={{paddingBottom: 30}}>
              <SightCreateForm cityId={cityId}/>
          </div>
      </div>
    )
}
