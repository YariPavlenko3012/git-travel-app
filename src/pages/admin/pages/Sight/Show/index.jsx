/**
 * external libs
 */
import React, {useMemo, useState, useEffect} from 'react';
import {Link, useParams} from 'react-router-dom'
/**
 * components
 */
import Table from '../../../../../components/Table'
import SearchInputForTable from '../../../../../components/Table/utils/search'
/**
 * services
 */
import SightService from "../../../../../services/admin/sight.service";
import {
    ADMIN_MAKE_CREATE_SIGHT_URI,
    ADMIN_MAKE_EDIT_CITY_URI, ADMIN_MAKE_EDIT_SIGHT_URI, ADMIN_MAKE_SHOW_CITY_URI,
    ADMIN_MAKE_SHOW_COUNTRY_URI
} from "../../../../../constants/admin/uri.constant";
import {Button} from "antd";
import styles from "../../../styles/show.module.scss";
import PreviewFiles from "../../../../../components/PreviewFiles";

export default function SightList() {
    const [sight, setSight] = useState(null);
    const {sightId} = useParams();

    const getSight = async () => {
        setSight(await SightService.show(sightId))
    };

    useEffect(() => {
        getSight();
    }, []);

    if(!sight){
        return <div>Loader...</div>
    }

    return (
      <div>
          <h3 style={{marginBottom: 20, display: "flex", justifyContent: "space-between"}}>
              {sight.name}
              <Link to={ADMIN_MAKE_EDIT_SIGHT_URI(sightId)}>
                  <Button type="primary" className={styles.show__btn}>
                      Edit sight
                  </Button>
              </Link>
          </h3>
          <div className={styles.show}>
              <div className={styles.show__wrapper}>
                  <p className={styles.show__item}>
                      <span className={styles.show__item_key}>
                          ID:
                      </span>
                      {sight.id}
                  </p>
                  <p className={styles.show__item}>
                      <span className={styles.show__item_key}>
                          Name:
                      </span>
                      <span style={{color: sight.name ? "black" : "red"}}>{sight.name || "No name"}</span>
                  </p>
                  <p className={styles.show__item}>
                      <span className={styles.show__item_key}>
                          Description:
                      </span>
                      <span style={{color: sight.description ? "black" : "red"}}>{sight.description || "No description"}</span>
                  </p>
                  <p className={styles.show__item}>
                      <span className={styles.show__item_key}>
                          Latitude:
                      </span>
                      {sight.latitude}
                  </p>
                  <p className={styles.show__item}>
                      <span className={styles.show__item_key}>
                          Longitude:
                      </span>
                      {sight.longitude}
                  </p>
                  <p className={styles.show__item}>
                      <span className={styles.show__item_key}>
                          City:
                      </span>
                      <Link to={ADMIN_MAKE_SHOW_CITY_URI(sight.city.id)} style={{color: sight.city.name ? "#0d6efd" : "red"}}>{sight.city.name || "No name"}</Link>
                  </p>
              </div>
              <PreviewFiles previewFiles={sight.images}/>
          </div>
      </div>
    )
}
