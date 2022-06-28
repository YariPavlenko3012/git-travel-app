/**
 * external libs
 */
import React, {useEffect, useState} from 'react'
import {Link, useParams} from 'react-router-dom'
/**
 * services
 */
import CityService from "../../../../../services/admin/city.service";
/**
 * components
 */
import CabsCreateForm from '../components/Form/CabsCreate'
import CabsUpdateForm from '../components/Form/CabsUpdate'
import LanguageCreateForm from '../components/Form/LanguageCreate'
import LanguageUpdateForm from '../components/Form/LanguageUpdate'
import CityUpdateForm from '../components/Form/CityUpdate'
/**
 * constants
 */
import {ADMIN_MAKE_SHOW_CITY_URI, ADMIN_MAKE_SHOW_COUNTRY_URI} from "../../../../../constants/admin/uri.constant";


export default function CityCreate() {
    const [city, setCity] = useState(null)
    const [isReady, setIsReady] = useState(false);
    const {cityId} = useParams();
    
    const getCity = async () => {
        setIsReady(false);
        setCity(await CityService.show(cityId));
        setIsReady(true);
    };
    
    useEffect(() => {
        getCity();
    }, []);
    
    if(!isReady) {
        return <div>Loader...</div>
    }
    
    return (
      <div>
          <div style={{fontSize: 24, fontWeight: 800, marginBottom: 10}}>
              <Link to={ADMIN_MAKE_SHOW_CITY_URI(cityId)}> {"<-"} Go to view city</Link>
          </div>
          <div style={{paddingBottom: 30}}>
              <CityUpdateForm getCity={getCity} cityId={cityId} city={city}/>
          </div>
          {!!city.cabs.length && (
            <div style={{paddingBottom: 30}}>
                <CabsUpdateForm getCity={getCity} city={city} cityId={cityId}/>
            </div>
          )}
          {!city.cabs.length && (
            <div style={{paddingBottom: 30}}>
                <CabsCreateForm getCity={getCity} cityId={cityId}/>
            </div>
          )}
          {!!city.languages.length && (
            <div style={{paddingBottom: 30}}>
                <LanguageUpdateForm getCity={getCity} cityId={cityId} city={city}/>
            </div>
          )}
          {!city.languages.length && (
            <div style={{paddingBottom: 30}}>
                <LanguageCreateForm getCity={getCity} cityId={cityId}/>
            </div>
          )}
      </div>
    )
}
