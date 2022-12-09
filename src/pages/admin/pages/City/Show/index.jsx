/**
 * external libs
 */
import React, {useEffect, useState, useContext} from 'react';
import {Link, useParams} from "react-router-dom";
import {Button, Popconfirm, Tooltip} from "antd";
import {DeleteOutlined} from "@ant-design/icons";
/**
 * components
 */
import SightTable from '../../../components/Tables/Sights';
import ChangeWorkStatus from "../../../components/Tables/Cities/components/ChangeWorkStatus";
import PreviewFilesOriental from "../../../../../components/PreviewFilesOriental";
import UserCan from "../../../../../components/UserCan";
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
import RolesEnum from "../../../../../enums/RolesEnum";
/**
 * context
 */
import {AlertContext} from "../../../../context/alert.context";


export default function CityShow() {
    const {setAlertSuccess} = useContext(AlertContext)
    const [sight, setSight] = useState(null);
    const [city, setCity] = useState(null);
    const {cityId} = useParams();

    const deleteCity = async (cityId) => {
        await CityService.delete(cityId)
        await getCity();
        setAlertSuccess("City successfully deleted")
    }
    const getSight = async (params = {}) => {
        const {filters} = params;
        if(filters?.name?.[0]){
            params.sight_name = filters.name[0]
        }

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
              <div style={{display: "flex"}}>
                  <span style={{paddingRight: 10}}>{city.name}</span>
                  <ChangeWorkStatus getCity={getCity} workStatus={city.work_status} cityId={city.id}/>
              </div>
              <div style={{display: "flex", alignItems: "flex-end", gap: 10}}>
                  <Link to={ADMIN_MAKE_EDIT_CITY_URI(cityId)}>
                      <Button type="primary" className={styles.show__btn}>
                          Edit City
                      </Button>
                  </Link>
                  <UserCan checkRole={RolesEnum.super_admin}>
                      <Popconfirm
                          title="Are you sure to delete this city?"
                          onConfirm={() => deleteCity(cityId)}
                          okText="Yes"
                          cancelText="No"
                      >
                          <Tooltip title="Delete city">
                              <Button type="danger" icon={<DeleteOutlined />} size={20} />
                          </Tooltip>
                      </Popconfirm>
                  </UserCan>
              </div>
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
              <React.Fragment>
                  <h3 style={{marginBottom: 20, display: "flex", justifyContent: "space-between"}}>
                      Sight of {city.name}
                      <Link to={ADMIN_MAKE_CREATE_SIGHT_URI(cityId)}>
                          <Button type="primary" className={styles.show__btn}>
                              Create sight
                          </Button>
                      </Link>
                  </h3>
                  <SightTable sightList={sight} getSight={getSight}/>
              </React.Fragment>
          }
      </div>
    )
}


