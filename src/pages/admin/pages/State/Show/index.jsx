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
import StateService from "../../../../../services/admin/state.service";
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
    const [state, setState] = useState(null);
    const {stateId} = useParams();

    const getState = async () => {
        setState(await StateService.show(stateId))
    };

    useEffect(() => {
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
                  <h3 style={{marginBottom: 20, display: "flex", justifyContent: "space-between"}}>
                      City of {state.name}
                      <Link to={ADMIN_MAKE_CREATE_CITY_URI(stateId)}>
                          <Button type="primary" className={styles.show__btn}>
                              Create City
                          </Button>
                      </Link>
                  </h3>
                  <CitiesTable searchParams={{state_id: stateId}}/>
              </Tabs.TabPane>
              <Tabs.TabPane tab="Sight" key="2">
                  <h3 style={{marginBottom: 20, display: "flex", justifyContent: "space-between"}}>
                      Sights of {state.name}
                  </h3>
                  <SightTable searchParams={{state_id: stateId}}/>
              </Tabs.TabPane>
          </Tabs>
      </div>
    )
}
