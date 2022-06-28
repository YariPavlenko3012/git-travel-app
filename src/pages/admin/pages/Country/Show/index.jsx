/**
 * external libs
 */
import React, {useEffect, useState} from 'react';
import {Link, useParams} from 'react-router-dom'
import {Button} from 'antd'
/**
 * components
 */
import CitiesTable from '../../../components/Tables/Cities'
import PreviewFiles from '../../../../../components/PreviewFiles'
/**
 * services
 */
import CountryService from "../../../../../services/admin/country.service";
import CityService from "../../../../../services/admin/city.service";
/**
 * constants
 */
import {
    ADMIN_MAKE_CREATE_CITY_URI,
    ADMIN_MAKE_EDIT_COUNTRY_URI,
    ADMIN_MAKE_SHOW_CITY_URI,
    ADMIN_MAKE_SHOW_CURRENCY_URI
} from "../../../../../constants/admin/uri.constant";
/**
 * style
 */
import styles from '../../../styles/show.module.scss'

export default function CountryList() {
    const [city, setCity] = useState(null);
    const [country, setCountry] = useState(null);
    const {countryId} = useParams();
    
    const getCity = async (params = {}) => {
        const copyParams = JSON.parse(JSON.stringify(params))
        
        if(copyParams.filters) {
            if(copyParams.filters.country) {
                copyParams.country_name = copyParams.filters.country[0];
            }
            
            if(copyParams.filters.name) {
                copyParams.city_name = copyParams.filters.name[0];
            }
        }
        
        const cityList = await CityService.list({
            ...params,
            country_id: countryId
        });
        
        setCity({
            data: cityList,
            meta: {
                current_page: 1,
                per_page: 1000000000,
                total: cityList.length,
            }
        })
    };
    
    const getCountry = async () => {
        setCountry(await CountryService.show(countryId))
    };
    
    useEffect(() => {
        getCity();
        getCountry();
    }, []);
    
    if(!country) {
        return <div>Loader...</div>
    }
    
    return (
      <div style={{padding: 20}}>
          <h3 style={{marginBottom: 20, display: "flex", justifyContent: "space-between"}}>
              {country.name}
              <Link to={ADMIN_MAKE_EDIT_COUNTRY_URI(countryId)}>
                  <Button type="primary" className={styles.show__btn}>
                      Edit Country
                  </Button>
              </Link>
          </h3>
          <div className={styles.show}>
              <div className={styles.show__wrapper}>
                  <p className={styles.show__item}>
                      <span className={styles.show__item_key}>
                          ID:
                      </span> {country.id}
                  </p>
                  <p className={styles.show__item}>
                      <span className={styles.show__item_key}>
                          Country name:
                      </span>
                      <span style={{color: country?.name ? "black" : "red"}}>
                          {country.name || "No name"}
                      </span>
                  </p>
                  <p className={styles.show__item}>
                      <span className={styles.show__item_key}>
                          Country code:
                      </span> {country.country_code_in_iso_3166_1_format}
                  </p>
                  <p className={styles.show__item}>
                      <span className={styles.show__item_key}>
                          Capital:
                      </span>
                      {country.capital &&
                          <Link to={ADMIN_MAKE_SHOW_CITY_URI(country.capital.id)} style={{color: country.capital.name ? "black" : "red" }}>
                              {country.capital.name || "No name"}
                          </Link>
                      }
                      {!country.capital &&
                        <span style={{color: "red"}}>
                            N/A
                        </span>
                      }
                  </p>
                  <p className={styles.show__item}>
                      <span className={styles.show__item_key}>
                          Currency:
                      </span>
                      <Link to={ADMIN_MAKE_SHOW_CURRENCY_URI(country.currency.id)}>
                          {country.currency.currency_code}
                      </Link>
                  </p>
                  <p className={styles.show__item}>
                      <span className={styles.show__item_key}>
                          Official language:
                      </span>
                      <Link to={ADMIN_MAKE_SHOW_CURRENCY_URI(country.official_language.id)}>
                          {country.official_language.name}
                      </Link>
                  </p>
                  <p className={styles.show__item}>
                      <span className={styles.show__item_key}>
                          Population:
                      </span>
                      {country.population}
                  </p>
                  <p className={styles.show__item}>
                      <span className={styles.show__item_key}>
                          Country area:
                      </span>
                      {country.country_area}
                  </p>
                  <p className={styles.show__item}>
                      <span className={styles.show__item_key}>
                          Safety index:
                      </span>
                      {country.safety_index}
                  </p>
                  <p className={styles.show__item}>
                     <span className={styles.show__item_key}>
                          Happiness rating:
                     </span>
                      {country.happiness_rating}
                  </p>
                  <p className={styles.show__item}>
                      <span className={styles.show__item_key}>
                          Has seas:
                      </span>
                      {country.has_seas ? "Yes" : "No"}
                  </p>
                  <p className={styles.show__item}>
                     <span className={styles.show__item_key}>
                          Has mountains:
                     </span>
                      {country.has_mountains ? "Yes" : "No"}
                  </p>
                  <p className={styles.show__item}>
                      <span className={styles.show__item_key}>
                          Highest point:
                      </span>
                      {country.highest_point}
                  </p>
                  <p className={styles.show__item}>
                      <span className={styles.show__item_key}>
                          Emergency number:
                      </span> {country.ambulance_number}
                  </p>
              </div>
              <PreviewFiles previewFiles={country.images}/>
          </div>
          {city && (
            <>
                <h3 style={{marginBottom: 20, display: "flex", justifyContent: "space-between"}}>
                    City of {country.name}
                    <Link to={ADMIN_MAKE_CREATE_CITY_URI(countryId)}>
                        <Button type="primary" className={styles.show__btn}>
                            Create City
                        </Button>
                    </Link>
                </h3>
                <CitiesTable cityList={city} getCity={getCity}/>
            </>
          )}
      </div>
    )
}
