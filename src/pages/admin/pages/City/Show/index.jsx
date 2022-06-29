/**
 * external libs
 */
import React, {useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import {Button} from "antd";
/**
 * components
 */
import SightTable from '../../../components/Tables/Sights';
import PreviewFiles from "../../../../../components/PreviewFiles";
/**
 * services
 */
import CityService from "../../../../../services/admin/city.service";
import SightService from "../../../../../services/admin/sight.service";
/**
 * style
 */
import styles from '../../../styles/show.module.scss'
/**
 * constants
 */
import {
    ADMIN_MAKE_CREATE_SIGHT_URI,
    ADMIN_MAKE_EDIT_CITY_URI,
    ADMIN_MAKE_SHOW_COUNTRY_URI
} from "../../../../../constants/admin/uri.constant";

export default function CityList() {
    const [sight, setSight] = useState(null);
    const [city, setCity] = useState(null);
    const {cityId} = useParams();
    
    const getSight = async (params = {}) => {
        const sightList = await SightService.list({
            ...params,
            city_id: cityId
        });
        setSight({
            data: sightList,
            meta: {
                current_page: 1,
                per_page: 1000000000,
                total: sightList.length,
            }
        })
    };
    const getCity = async () => {
        setCity(await CityService.show(cityId))
    };
    
    useEffect(() => {
        getSight();
        getCity();
    }, []);
    
    if(!city) {
        return <div>Loader...</div>
    }
    
    return (
      <div style={{padding: 20}}>
          <h3 style={{marginBottom: 20, display: "flex", justifyContent: "space-between"}}>
              {city.name}
              <Link to={ADMIN_MAKE_EDIT_CITY_URI(cityId)}>
                  <Button type="primary" className={styles.show__btn}>
                      Edit City
                  </Button>
              </Link>
          </h3>
          <div className={styles.show}>
              <div className={styles.show__wrapper}>
                  <p className={styles.show__item}>
                      <span className={styles.show__item_key}>
                          ID:
                      </span>
                      {city.id}
                  </p>
                  <p className={styles.show__item}>
                      <span className={styles.show__item_key}>
                          Name:
                      </span>
                      {city.name}
                  </p>
                  <p className={styles.show__item}>
                      <span className={styles.show__item_key}>
                          Country:
                      </span>
                      <Link to={ADMIN_MAKE_SHOW_COUNTRY_URI(city.country.id)}>{city.country.name}</Link>
                  </p>
                  <p className={styles.show__item}>
                      <span className={styles.show__item_key}>
                          Population:
                      </span>
                      {city.population}
                  </p>
                  <p className={styles.show__item}>
                      <span className={styles.show__item_key}>
                          Cab name:
                      </span>
                      {city.cabs.map(({name}) => name).join(",")}
                  </p>
                  <p className={styles.show__item}>
                      <span className={styles.show__item_key}>
                          Cab phone number:
                      </span>
                      {city.cabs.map(({phone_number}) => phone_number).join(",")}
                  
                  </p>
              </div>
              <PreviewFiles previewFiles={city.images}/>
          </div>
          {sight &&
              <>
                  <h3 style={{marginBottom: 20, display: "flex", justifyContent: "space-between"}}>
                      Sight of {city.name}
                      <Link to={ADMIN_MAKE_CREATE_SIGHT_URI(cityId)}>
                          <Button type="primary" className={styles.show__btn}>
                              Create sight
                          </Button>
                      </Link>
                  </h3>
                  <SightTable sightList={sight} getSight={getSight}/>
              </>
          }
      </div>
    )
}
