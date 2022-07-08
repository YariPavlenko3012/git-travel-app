/**
 * external libs
 */
import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom'
import {Button, Tabs} from 'antd'
/**
 * components
 */
import CountryTab from "./components/Tab";
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

        return await CountryService.list(copyParams)
    };

    const getCountryWithCapital = async (params) => {
        return await getCountry({...params, has_capital: 1})
    }

    const getCountryWithoutCapital = async (params) => {
        return await getCountry({...params, has_capital: 0})
    }

    return (
      <div>
          <h3 style={{marginBottom: 20, display: "flex", justifyContent: "space-between"}}>
              Country
              <Link to={ADMIN_CREATE_COUNTRY_URI}>
                  <Button type="primary" className={styles.show__btn}>
                      Create country
                  </Button>
              </Link>
          </h3>
          <Tabs type="card">
              <Tabs.TabPane tab="Completed" key="1">
                  <CountryTab getCountry={getCountryWithCapital}/>
              </Tabs.TabPane>
              <Tabs.TabPane tab="Without capital" key="2">
                  <CountryTab getCountry={getCountryWithoutCapital}/>
              </Tabs.TabPane>
          </Tabs>
      </div>
    )
}
