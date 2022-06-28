/**
 * external libs
 */
import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom'
import {Button} from 'antd'
/**
 * components
 */
import TableCountries from '../../../components/Tables/Countries'
/**
 * services
 */
import CountryService from "../../../../../services/admin/country.service";
/**
 * constant
 */
import {ADMIN_CREATE_COUNTRY_URI} from "../../../../../constants/admin/uri.constant";
/**
 * styles
 */
import styles from "../../../styles/show.module.scss";

export default function CountryList() {
    const [country, setCountry] = useState(null);
    
    const getCountry = async (params = {}) => {
        const copyParams = JSON.parse(JSON.stringify(params));
        
        if(copyParams.filters) {
            if(copyParams.filters.name) {
                copyParams.country_name = copyParams.filters.name[0];
            }
            
            if(copyParams.filters.capital) {
                copyParams.city_name = copyParams.filters.capital[0];
            }
        }
        
        const countryList = await CountryService.list(copyParams);
        setCountry({
            data: countryList,
            meta: {
                current_page: 1,
                per_page: 1000000000,
                total: countryList.length,
            }
        })
    };
    
    useEffect(() => {
        getCountry();
    }, []);
    
    if(!country) {
        return <div>Loader...</div>
    }
    
    return (
      <div style={{padding: 20}}>
          <h3 style={{marginBottom: 20, display: "flex", justifyContent: "space-between"}}>
              Country
              <Link to={ADMIN_CREATE_COUNTRY_URI}>
                  <Button type="primary" className={styles.show__btn}>
                      Create country
                  </Button>
              </Link>
          </h3>
          <TableCountries countryList={country} getCountry={getCountry}/>
      </div>
    )
}
