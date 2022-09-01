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
import PreviewFilesOriental from "../../../../../components/PreviewFilesOriental";
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
    ADMIN_MAKE_SHOW_STATE_URI,
    ADMIN_MAKE_SHOW_COUNTRY_URI,
} from "../../../../../constants/admin/uri.constant";
/**
 * enum
 */
import FileOrientationEnums from "../../../../../enums/FileOrientation";


export default function CityShow() {
    const [sight, setSight] = useState(null);
    const [city, setCity] = useState(null);
    const {cityId} = useParams();

    const getSight = async (params = {}) => {
        setSight(await SightService.list({
            ...params,
            city_id: cityId
        }))
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
      <div>
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
                      <Link to={ADMIN_MAKE_SHOW_COUNTRY_URI(city?.state?.country?.id)}>{city?.state?.country?.name}</Link>
                  </p>
                  <p className={styles.show__item}>
                      <span className={styles.show__item_key}>
                          State:
                      </span>
                      <Link to={ADMIN_MAKE_SHOW_STATE_URI(city?.state?.id)}>{city?.state?.name}</Link>
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
              <div style={{display: "flex", gap: 10, marginBottom: 10}}>
                  <PreviewFilesOriental oriental={FileOrientationEnums.landscape} image={city.landscape_image?.path} height={100}/>
                  <PreviewFilesOriental oriental={FileOrientationEnums.portrait} image={city.portrait_image?.path} height={100}/>
              </div>
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
