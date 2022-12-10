/**
 * external libs
 */
import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom'
import {Button, Tabs} from 'antd'
/**
 * components
 */
import CountryTable from "../../../components/Tables/Countries";
/**
 * constant
 */
import {ADMIN_CREATE_COUNTRY_URI, ADMIN_MAKE_SHOW_COUNTRY_URI} from "../../../../../constants/admin/uri.constant";
/**
 * styles
 */
import styles from "../../../styles/show.module.scss";

export default function CountryList({history}) {
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
                    <CountryTable searchParams={{has_capital: 1}}/>
                </Tabs.TabPane>
                <Tabs.TabPane tab="Without capital" key="2">
                    <CountryTable searchParams={{has_capital: 0}}/>
                </Tabs.TabPane>
            </Tabs>
        </div>
    )
}
