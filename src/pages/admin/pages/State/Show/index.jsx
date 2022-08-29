/**
 * external libs
 */
import React, {useEffect, useState} from 'react';
import {Link, useParams} from 'react-router-dom'
import {Button, Tabs} from 'antd'
/**
 * components
 */
import CitiesTable from '../../../components/Tables/Cities'
import SightTable from "../../../components/Tables/Sights";
/**
 * services
 */
import CityService from "../../../../../services/admin/city.service";
import StateService from "../../../../../services/admin/state.service";
import SightService from "../../../../../services/admin/sight.service";
/**
 * constants
 */
import {
    ADMIN_MAKE_CREATE_CITY_URI,
    ADMIN_MAKE_EDIT_STATE_URI,
    ADMIN_MAKE_SHOW_COUNTRY_URI,
} from "../../../../../constants/admin/uri.constant";
/**
 * style
 */
import styles from '../../../styles/show.module.scss'

export default function StateShow() {
    const [sight, setSight] = useState(null);
    const [city, setCity] = useState(null);
    const [state, setState] = useState(null);
    const {stateId} = useParams();

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

        setCity(await CityService.list({
            ...copyParams,
            state_id: stateId
        }))
    };

    const getSight = async (params = {}) => {
        setSight(await SightService.list({
            ...params,
            state_id: stateId
        }))
    };

    const getState = async () => {
        setState(await StateService.show(stateId))
    };

    useEffect(() => {
        getCity();
        getSight();
        getState();
    }, []);

    if(!state) {
        return <div>Loader...</div>
    }

    return (
      <div>
          <h3 style={{marginBottom: 20, display: "flex", justifyContent: "space-between"}}>
              {state.name}
              <Link to={ADMIN_MAKE_EDIT_STATE_URI(stateId)}>
                  <Button type="primary" className={styles.show__btn}>
                      Edit State
                  </Button>
              </Link>
          </h3>
          <div className={styles.show}>
              <div className={styles.show__wrapper}>
                  <p className={styles.show__item}>
                      <span className={styles.show__item_key}>
                          ID:
                      </span> {state.id}
                  </p>
                  <p className={styles.show__item}>
                      <span className={styles.show__item_key}>
                          Country:
                      </span>
                      <Link to={ADMIN_MAKE_SHOW_COUNTRY_URI(state.country.id)}>
                          {state.country.name}
                      </Link>
                  </p>
              </div>
          </div>
          <Tabs type="card">
              <Tabs.TabPane tab="City" key="1">
                  {city && (
                      <>
                          <h3 style={{marginBottom: 20, display: "flex", justifyContent: "space-between"}}>
                              City of {state.name}
                              <Link to={ADMIN_MAKE_CREATE_CITY_URI(stateId)}>
                                  <Button type="primary" className={styles.show__btn}>
                                      Create City
                                  </Button>
                              </Link>
                          </h3>
                          <CitiesTable cityList={city} getCity={getCity}/>
                      </>
                  )}
              </Tabs.TabPane>
              <Tabs.TabPane tab="Sight" key="2">
                  {sight && (
                      <>
                          <h3 style={{marginBottom: 20, display: "flex", justifyContent: "space-between"}}>
                              Sights of {state.name}
                          </h3>
                          <SightTable sightList={sight} getCity={getSight}/>
                      </>
                  )}
              </Tabs.TabPane>
          </Tabs>
      </div>
    )
}
