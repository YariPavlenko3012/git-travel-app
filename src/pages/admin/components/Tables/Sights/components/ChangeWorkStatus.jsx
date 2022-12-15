/**
 * external libs
 */
import {Select} from "antd";
import React, {useContext} from "react";
/**
 * context
 */
import {DictionaryContext} from "../../../../../context/dictionary.context";
/**
 * services
 */
import SightService from "../../../../../../services/admin/sight.service";

export default function ChangeWorkStatus({ sightId, getSight, workStatus = null }){
    const {dictionary} = useContext(DictionaryContext)

    const changeStatus = async (status) => {
        await SightService.updateWorkStatus(sightId, status)
        await getSight()
    }

    return (
        <Select
            size="large"
            value={workStatus}
            style={{width: 150}}
            options={dictionary.work_statuses.sight}
            onChange={changeStatus}
        />
    )
}
