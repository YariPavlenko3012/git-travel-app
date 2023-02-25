/**
 * external libs
 */
import {Select} from "antd";
import React, {useContext, useEffect, useState} from "react";
/**
 * services
 */
import CityService from "../../../../../../services/admin/city.service";
/**
 * context
 */
import {DictionaryContext} from "../../../../../context/dictionary.context";

export default function ChangeWorkStatus({cityId, getCity, workStatus: initialWorkStatus = null}) {
    const [workStatus, setWorkStatus] = useState(initialWorkStatus)
    const {dictionary} = useContext(DictionaryContext)

    const changeStatus = async (status) => {
        setWorkStatus(status)
        await CityService.updateWorkStatus(cityId, status)
        if(getCity){
            await getCity()
        }
    }

    useEffect(() => {
        setWorkStatus(initialWorkStatus)
    }, [initialWorkStatus])

    return (
        <Select
            size="large"
            value={workStatus}
            style={{width: "100%"}}
            options={dictionary.work_statuses.city}
            onChange={changeStatus}
        />
    )
}
