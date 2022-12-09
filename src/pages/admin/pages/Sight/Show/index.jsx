/**
 * external libs
 */
import React, {useContext, useState, useEffect} from 'react';
import {Link, useParams} from 'react-router-dom'
import {Button, Popconfirm, Tooltip} from "antd";
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
    ADMIN_MAKE_SHOW_STATE_URI, ADMIN_SIGHT_LIST_URI,
} from "../../../../../constants/admin/uri.constant";
/**
 * styles
 */
import styles from "../../../styles/show.module.scss";
/**
 * utils
 */
import PlaceTypeTranslate from "../../../../../utils/PlaceTypeTranslate";
import RolesEnum from "../../../../../enums/RolesEnum";
import {DeleteOutlined} from "@ant-design/icons";
import UserCan from "../../../../../components/UserCan";
import {AlertContext} from "../../../../context/alert.context";
import ChangeWorkStatus from "../../../components/Tables/Sights/components/ChangeWorkStatus";

export default function SightShow({ history }) {
    const {setAlertSuccess} = useContext(AlertContext)
    const [sight, setSight] = useState(null);
    const {sightId} = useParams();

    const getSight = async () => {
        setSight(await SightService.show(sightId))
    };

    const deleteSight = async (sightId) => {
        await SightService.delete(sightId)
        setAlertSuccess("Sight successfully deleted")
        return history.push(ADMIN_SIGHT_LIST_URI)
    }

    useEffect(() => {
        getSight();
    }, []);

    if(!sight){
        return <div>Loader...</div>
    }

    return (
      <div>
          <h3 style={{marginBottom: 20, display: "flex", justifyContent: "space-between"}}>
              <div style={{display: "flex"}}>
                  <span style={{paddingRight: 10}}>{sight.name}</span>
                  <ChangeWorkStatus getSight={getSight} workStatus={sight.work_status} sightId={sight.id}/>
              </div>
              <div style={{display: "flex", alignItems: "flex-end", gap: 10}}>
                  <Link to={ADMIN_MAKE_EDIT_SIGHT_URI(sightId)}>
                      <Button type="primary" className={styles.show__btn}>
                          Edit
                      </Button>
                  </Link>
                  <UserCan checkRole={RolesEnum.super_admin}>
                      <Popconfirm
                          title="Are you sure to delete this sight?"
                          onConfirm={() => deleteSight(sightId)}
                          okText="Yes"
                          cancelText="No"
                      >
                          <Tooltip title="Delete sight">
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
