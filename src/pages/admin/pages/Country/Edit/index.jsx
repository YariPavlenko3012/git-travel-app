/**
 * external libs
 */
import React, {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import {Link} from "react-router-dom";
/**
 * components
 */
import CountryUpdateForm from '../components/Form/CountryUpdate'
import LanguageUpdateForm from '../components/Form/LanguageUpdate'
/**
 * services
 */
import CountryService from "../../../../../services/admin/country.service";
/**
 * constant
 */
import {ADMIN_MAKE_SHOW_COUNTRY_URI} from "../../../../../constants/admin/uri.constant";


export default function CountryCreate() {
    const [country, setCountry] = useState(null)
    const [isReady, setIsReady] = useState(false);
    const {countryId} = useParams();

    const getCountry = async () => {
        setIsReady(false);
        setCountry(await CountryService.show(countryId));
        setIsReady(true);
    };

    useEffect(() => {
        getCountry()
    }, []);

    if(!isReady) {
        return <div>Loader...</div>
    }

    return (
      <div>
          <div style={{fontSize: 24, fontWeight: 800, marginBottom: 10}}>
              <Link to={ADMIN_MAKE_SHOW_COUNTRY_URI(countryId)}> {"<-"} Go to view country</Link>
          </div>
          <div style={{paddingBottom: 30}}>
              <CountryUpdateForm getCountry={getCountry} countryId={countryId} country={country}/>
          </div>
          <div style={{paddingBottom: 30}}>
              <LanguageUpdateForm getCountry={getCountry} countryId={countryId} country={country}/>
          </div>
      </div>
    )
}
