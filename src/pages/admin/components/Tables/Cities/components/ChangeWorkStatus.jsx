/**
 * external libs
 */
import {Select} from "antd";
import React, {useContext} from "react";
/**
 * services
 */
import CityService from "../../../../../../services/admin/city.service";
/**
 * context
 */
import {DictionaryContext} from "../../../../../context/dictionary.context";

export default function ChangeWorkStatus({cityId, getCity, workStatus = null}) {
    const {dictionary} = useContext(DictionaryContext)

    const changeStatus = async (status) => {
        await CityService.updateWorkStatus(cityId, status)
        await getCity()
    }

    return (
        <Select
            size="large"
            value={workStatus}
            style={{width: 150}}
            options={dictionary.work_statuses.city}
            onChange={changeStatus}
        />
    )
}
