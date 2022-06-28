/**
 * external libs
 */
import React from 'react';
import {NavLink} from "react-router-dom";
import {Nav} from "react-bootstrap";
/**
 * constant
 */
import {
    ADMIN_CITY_LIST_URI,
    ADMIN_COUNTRY_LIST_URI,
    ADMIN_CURRENCY_LIST_URI,
    ADMIN_LANGUAGE_LIST_URI,
    ADMIN_SIGHT_LIST_URI
} from "../../../../constants/admin/uri.constant";
/**
 * style
 */
import styles from './index.module.scss'

export default function Header() {
    
    return (
      <div className={styles.header}>
          <Nav>
              <Nav.Item>
                  <NavLink className={styles.header__item} to={ADMIN_COUNTRY_LIST_URI}>
                      Country
                  </NavLink>
              </Nav.Item>
              <Nav.Item>
                  <NavLink className={styles.header__item} to={ADMIN_CITY_LIST_URI}>
                      City
                  </NavLink>
              </Nav.Item>
              <Nav.Item>
                  <NavLink className={styles.header__item} to={ADMIN_SIGHT_LIST_URI}>
                      Sight
                  </NavLink>
              </Nav.Item>
              <Nav.Item>
                  <NavLink className={styles.header__item} to={ADMIN_LANGUAGE_LIST_URI}>
                      Language
                  </NavLink>
              </Nav.Item>
              <Nav.Item>
                  <NavLink className={styles.header__item} to={ADMIN_CURRENCY_LIST_URI}>
                      Currency
                  </NavLink>
              </Nav.Item>
          </Nav>
      </div>
    )
}
