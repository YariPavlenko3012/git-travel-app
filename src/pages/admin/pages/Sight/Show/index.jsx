/**
 * external libs
 */
import React, {useMemo, useState, useEffect} from 'react';
import {Link, useParams} from 'react-router-dom'
import {Button} from "antd";
/**
 * components
 */
import PreviewFiles from "../../../../../components/PreviewFiles";
/**
 * services
 */
import SightService from "../../../../../services/admin/sight.service";
/**
 * constants
 */
import {
    ADMIN_MAKE_EDIT_SIGHT_URI,
    ADMIN_MAKE_SHOW_CITY_URI,
    ADMIN_MAKE_SHOW_COUNTRY_URI,
    ADMIN_MAKE_SHOW_STATE_URI,
} from "../../../../../constants/admin/uri.constant";
/**
 * styles
 */
import styles from "../../../styles/show.module.scss";
/**
 * utils
 */
import PlaceTypeTranslate from "../../../../../utils/PlaceTypeTranslate";

export default function SightShow() {
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
                          Country:
                      </span>
                      <Link to={ADMIN_MAKE_SHOW_COUNTRY_URI(sight.city?.state?.country?.id)}>{sight.city?.state?.country?.name}</Link>
                  </p>
                  <p className={styles.show__item}>
                      <span className={styles.show__item_key}>
                          State:
                      </span>
                      <Link to={ADMIN_MAKE_SHOW_STATE_URI(sight.city?.state?.id)}>{sight.city?.state?.name}</Link>
                  </p>
                  <p className={styles.show__item}>
                      <span className={styles.show__item_key}>
                          City:
                      </span>
                      <Link to={ADMIN_MAKE_SHOW_CITY_URI(sight.city?.id)}>{sight.city?.name}</Link>
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
                          Place type:
                      </span>
                      {sight.place_type.map( type => PlaceTypeTranslate.getTranslateForType(sight.place_type)).join(",")}
                  </p>
                  <p className={styles.show__item}>
                      <span className={styles.show__item_key}>
                          Website:
                      </span>
                      <span>{sight.website || "N/A"}</span>
                  </p>
                  <p className={styles.show__item}>
                      <span className={styles.show__item_key}>
                          Phone number:
                      </span>
                      <span>{sight.international_phone_number || "N/A"}</span>
                  </p>
                  <p className={styles.show__item}>
                      <span className={styles.show__item_key}>
                          Number of views:
                      </span>
                      <span>{sight.number_of_views}</span>
                  </p>
                  <p className={styles.show__item}>
                      <span className={styles.show__item_key}>
                          Address:
                      </span>
                      <span>{sight.formatted_address || "N/A"}</span>
                  </p>
                  <p className={styles.show__item} style={{width: "100%"}}>
                      <span className={styles.show__item_key}>
                          Description:
                      </span>
                      <span>{sight.description || "N/A"}</span>
                  </p>
              </div>
              <PreviewFiles previewFiles={sight.images}/>
          </div>
      </div>
    )
}
